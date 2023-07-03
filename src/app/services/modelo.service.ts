import { Injectable } from '@angular/core';
import { Modelo } from '../models/modelo';
import { Observable, of, catchError, throwError, mergeMap, first } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  constructor(private http: HttpClient) { }

  resourceUrl = environment.backendUrl + 'modelos'

  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl, {observe: "response"}).pipe(
      catchError(error => {
        console.log(error.message);
        return throwError(() => "Ocurrio un error");
      })
    )
  }

  findOne(id: number): Observable<Modelo> {
    return this.http.get<Modelo>(this.resourceUrl + '/' + id).pipe(
      catchError(err => {
        console.log(err.message);
        return throwError(() => 'Ocurrio un problema');
      })
    );
  }
}


