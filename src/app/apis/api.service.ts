import {catchError, retry} from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

//const localUrl = 'assets/data/smartphone.json';
const apiUrl = 'http://localhost:9010/internal/';
/*const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'jwt-token'
  })
};*/

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getApis(): Observable<any> {
      console.log("CALLING API");
    return this.http.get<any[]>(apiUrl).pipe(
      retry(3), catchError(this.handleError<any[]>('getApis')));
  }

  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}