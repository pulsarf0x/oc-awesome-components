import {Injectable, Injector} from '@angular/core';
import {BehaviorSubject, delay, map, Observable, switchMap, take, tap} from "rxjs";
import {Candidate} from "../models/candidate.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class CandidatesService {
  private _loading$ = new BehaviorSubject<boolean>(false)
  private _candidates$ = new BehaviorSubject<Candidate[]>([])
  private lastCandidatesLoad = 0


  constructor(private http: HttpClient) { }

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable()
  }

  get candidates$(): Observable<Candidate[]> {
    return this._candidates$.asObservable()
  }

  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading)
  }

  getCandidateFromServer () {
    if (Date.now() - this.lastCandidatesLoad <= 10 * 1000) {
      return
    }

    this.setLoadingStatus(true)
    this.http.get<Candidate[]>(`${environment.apiUrl}/candidates`).pipe(
      delay(1000),
      tap(candidates => {
        this.lastCandidatesLoad = Date.now()

        this._candidates$.next(candidates)
          this.setLoadingStatus(false)
      })
    ).subscribe()
  }

  getCandidateById (id: number) {
    if (!this.lastCandidatesLoad) {
      this.getCandidateFromServer()
    }
    return this.candidates$.pipe(
      map(candidates => candidates.filter(candidate => candidate.id === id)[0])
    )
  }

  hireCandidate(id: number): void {
    this.candidates$.pipe(
      take(1),
      map(candidates => candidates.map(candidate => candidate.id === id ? { ...candidate, company: 'Snapface Ltd'} : candidate)),
      tap(updatedCandidates => this._candidates$.next(updatedCandidates)),
      switchMap(updatedCandidates => this.http.patch(`${environment.apiUrl}/candidates/${id}`, updatedCandidates.find(candidate => candidate.id === id)))
    ).subscribe()
  }

  refuseCandidate(id: number): void {
    this.setLoadingStatus(true)

    this.http.delete(`${environment.apiUrl}/candidates/${id}`).pipe(
      delay(1000),
      switchMap(() => this.candidates$),
      take(1),
      map(candidates => candidates.filter(candidate => candidate.id !== id)),
      tap(candidates => {
        this._candidates$.next(candidates)
        this.setLoadingStatus(false)
      })
    ).subscribe()
  }
}
