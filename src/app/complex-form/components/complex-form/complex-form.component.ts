import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith, tap} from "rxjs";
import {ComplexFormService} from "../../services/complex-form.service";
import {validValidator} from "../../validators/valid.validator";
import {confirmEqualValidator} from "../../validators/confirm-equal.validator";

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrl: './complex-form.component.scss'
})
export class ComplexFormComponent implements OnInit {
  loading = false

  mainForm!: FormGroup
  personalInfoForm!: FormGroup
  contactPreferenceCtrl!: FormControl
  phoneCtrl!: FormControl
  emailCtrl!: FormControl
  confirmEmailCtrl!: FormControl
  emailForm!: FormGroup
  passwordCtrl!: FormControl
  confirmPasswordCtrl!: FormControl
  loginInfoForm!: FormGroup

  showEmailCtrl$!: Observable<boolean>
  showPhoneCtrl$!: Observable<boolean>
  showEmailError$!: Observable<boolean>
  showPasswordError$!: Observable<boolean>

  constructor(
    private formBuilder: FormBuilder,
    private complexFormService: ComplexFormService
  ) {}

  ngOnInit(): void {
    this.initFormControls()
    this.initMainForm()
    this.initFormObservables()
  }

  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      email: this.emailForm,
      contactPreference: this.contactPreferenceCtrl,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm
    })
  }

  private initFormControls(): void {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    })
    this.contactPreferenceCtrl = this.formBuilder.control('email')
    this.phoneCtrl = this.formBuilder.control('')
    this.emailCtrl = this.formBuilder.control('')
    this.confirmEmailCtrl = this.formBuilder.control('')
    this.emailForm = this.formBuilder.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl
    }, {
      validators: [confirmEqualValidator('email', 'confirm')],
      updateOn: 'blur'
    })
    this.passwordCtrl = this.formBuilder.control('', Validators.required)
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required)
    this.loginInfoForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, {
      validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    })
  }

  onSubmitForm() {
    this.loading = true

    this.complexFormService.saveUserInfo(this.mainForm.value).pipe(
      tap(saved => {
        this.loading = false

        if (saved) {
          this.resetForm()
        } else {
          console.log("Échec de l'enregistrement.")
        }
      })
    )

    console.log(this.mainForm.value)
  }

  private resetForm () {
    this.mainForm.reset()
    this.contactPreferenceCtrl.patchValue('email')
  }

  private initFormObservables() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'email'),
      tap(showEmail => this.setEmailValidators(showEmail))
    )
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'phone'),
      tap(showPhone => this.setPhoneValidators(showPhone))
    )

    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map(status => status === 'INVALID' && this.emailCtrl.value && this.confirmEmailCtrl && this.loginInfoForm.hasError('confirmEqual'))
    )
  }

  private setEmailValidators(showEmail: boolean) {
    if (showEmail) {
      this.emailCtrl.addValidators([
        Validators.required,
        Validators.email
      ])
      this.confirmEmailCtrl.addValidators([
        Validators.required,
        Validators.email,
      ])
    } else {
      this.emailCtrl.clearValidators()
      this.confirmEmailCtrl.clearValidators()
    }
    this.emailCtrl.updateValueAndValidity()
    this.confirmEmailCtrl.updateValueAndValidity()
  }

  private setPhoneValidators(showPhone: boolean) {
    if (showPhone) {
      this.phoneCtrl.addValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])
    } else {
      this.phoneCtrl.clearValidators()
    }
    this.phoneCtrl.updateValueAndValidity()
  }

  getFormControlErrorText (ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champs est requis'
    } else if (ctrl.hasError('email')) {
      return 'Cette adresse est invalide.'
    } else if (ctrl.hasError('minlength')) {
      return 'Ce numéro de téléphone ne contient pas assez de chiffres';
    } else if (ctrl.hasError('maxlength')) {
      return 'Ce numéro de téléphone contient trop de chiffres';
    } else if (ctrl.hasError('validValidator')) {
      return 'Ce champs doit contenir "VALID".';
    }  else {
      return 'Ce champs contient une erreur.'
    }
  }
}
