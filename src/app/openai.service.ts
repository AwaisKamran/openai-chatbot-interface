import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { OpenAIResponse } from './utility/constants';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  api_url: string = "https://openai-chatbot-interface-9ab52001491e.herokuapp.com/" //'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  QueryPrompt(prompt: string): Observable<OpenAIResponse>{
    return this.http.post<any>(`${this.api_url}query`, { prompt}).pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
