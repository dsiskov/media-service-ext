// api.service.ts

import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

export class ApiError extends Error {
  constructor(
    public status: number,
    public override message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`
    } else {
      errorMessage = `Server Error: ${error.status} - ${
        error.error.message || ''
      }`
    }

    console.error(errorMessage)
    throw new ApiError(error.status, errorMessage)
  }

  get<T>(resource: string): Observable<T> {
    const url = `api/${resource}`
    console.log('calling ', url)
    return this.http.get<T>(url).pipe(catchError(this.handleError))
  }

  post<Dto, T>(resource: string, data: Dto): Observable<T> {
    const url = `api/${resource}`
    return this.http.post<T>(url, data).pipe(catchError(this.handleError))
  }

  // delete(resource: string): Observable<boolean> {
  //   const url = `api/${resource}`
  //   return this.http.delete(url).pipe(catchError(this.handleError))
  // }
}
