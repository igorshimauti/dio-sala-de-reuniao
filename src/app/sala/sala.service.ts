import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Sala } from './sala.model';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  baseUrl = "http://localhost:8080/api/v1/salas";

  constructor(private snackBar: MatSnackBar, 
    private http: HttpClient) { }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Erro efetuar a operação.", true);
    return EMPTY;
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(sala: Sala): Observable<Sala> {
    return this.http.post<Sala>(this.baseUrl, sala).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  read(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readById(id: string): Observable<Sala> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Sala>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(sala: Sala): Observable<Sala> {
    const url = `${this.baseUrl}/${sala.id}`;
    return this.http.put<Sala>(url, sala).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(sala: Sala): Observable<Sala> {
    const url = `${this.baseUrl}/${sala.id}`;
    return this.http.delete<Sala>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }
}