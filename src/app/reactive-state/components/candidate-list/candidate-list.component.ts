import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {combineLatest, map, Observable, startWith} from "rxjs";
import {CandidatesService} from "../../services/candidates.service";
import {Candidate} from "../../models/candidate.model";
import {MatCard, MatCardTitle, MatCardTitleGroup} from "@angular/material/card";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatListItemAvatar, MatNavList} from "@angular/material/list";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatLine} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "../../../shared/material.module";
import {FormBuilder, FormControl, ReactiveFormsModule} from "@angular/forms";
import {CandidateSearchType} from "../../enums/candidate-search-type";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardTitleGroup,
    MatProgressSpinner,
    MatNavList,
    AsyncPipe,
    NgForOf,
    NgIf,
    MatListItemAvatar,
    MatLine,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {
  loading$!: Observable<boolean>
  candidates$!: Observable<Candidate[]>

  searchCtrl!: FormControl
  searchTypeCtrl!: FormControl
  searchTypeOptions!: {
    value: CandidateSearchType,
    label: string
  }[]

  constructor(
    private candidatesService: CandidatesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm()
    this.initObservables()
    this.candidatesService.getCandidateFromServer()
  }

  private initObservables () {
    this.loading$ = this.candidatesService.loading$

    const search$: Observable<string> = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
    )

    const searchType$: Observable<CandidateSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    )

    this.candidates$ = combineLatest([
      search$,
      searchType$,
      this.candidatesService.candidates$
    ]).pipe(
      map(([search, searchType, candidates]) => {
        return candidates.filter(candidate => candidate[searchType].toLowerCase().includes(search as string))
      })
    )
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control('')
    this.searchTypeCtrl = this.formBuilder.control(CandidateSearchType.LASTNAME)
    this.searchTypeOptions = [
      { value: CandidateSearchType.LASTNAME, label: 'Nom' },
      { value: CandidateSearchType.FIRSTNAME, label: 'Prénom' },
      { value: CandidateSearchType.COMPANY, label: 'Entreprise' },
    ]
  }
}
