import {Injectable, Injector} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ComplexFormValue} from "../models/complex-form-value.model";
import {catchError, delay, mapTo, Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ComplexFormService {
  private httpClient!: HttpClient

  constructor(private injector: Injector) { }

  private get http(): HttpClient {
    if (!this.httpClient) {
      this.httpClient = this.injector.get(HttpClient);
    }
    return this.httpClient;
  }

  saveUserInfo(formValue: ComplexFormValue): Observable<boolean> {
    return this.http.post(`${environment.apiUrl}/users`, formValue).pipe(
      mapTo(true),
      delay(1000),
      catchError(() => of(false).pipe(
        delay(1000)
      ))
    )
  }
}
