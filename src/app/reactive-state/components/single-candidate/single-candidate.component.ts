import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable, switchMap, take, tap} from "rxjs";
import {Candidate} from "../../models/candidate.model";
import {CandidatesService} from "../../services/candidates.service";
import {MatCard, MatCardActions} from "@angular/material/card";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatButton} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-single-candidate',
  standalone: true,
  imports: [
    MatCard,
    AsyncPipe,
    MatCardActions,
    MatProgressSpinner,
    MatButton,
    NgIf
  ],
  templateUrl: './single-candidate.component.html',
  styleUrl: './single-candidate.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCandidateComponent implements OnInit {
  loading$!: Observable<boolean>
  candidate$!: Observable<Candidate>

  constructor(
    private candidatesService: CandidatesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit () {
    this.initObservables()
  }

  private initObservables() {
    this.loading$ = this.candidatesService.loading$
    this.candidate$ = this.route.params.pipe(
      switchMap(params => this.candidatesService.getCandidateById(+params['id']))
    )
  }

  onHire() {
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.candidatesService.hireCandidate(candidate.id)
        this.onGoBack()
      })
    )
  }

  onRefuse() {
    this.candidate$.pipe(
      take(1),
      tap(candidate => {
        this.candidatesService.refuseCandidate(candidate.id)
        this.onGoBack()
      })
    )
  }

  onGoBack() {
    this.router.navigateByUrl('/reactive-state/candidates')
  }
}
