import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function confirmEqualValidator (main: string, confirm: string): ValidatorFn {
  return (ctrl: AbstractControl): null | ValidationErrors => {
    if (ctrl.get(main) && ctrl.get(confirm)) {
      const mainValue = ctrl.get(main)?.value
      const confirmValue = ctrl.get(confirm)?.value

      return mainValue === confirmValue ? null : {
        main: mainValue,
        confirm: confirmValue
      }
    }

    return {
      confirmEqual: 'Invalid confirm values'
    }
  }
}
