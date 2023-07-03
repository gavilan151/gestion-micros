import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import { Viaje } from '../models/viaje';

@Injectable({
  providedIn: 'root'
})

export class ViajeService {

  resourceUrl = environment.backendUrl + 'viajes'

  constructor(private http: HttpClient) { }

  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl, {observe: 'response'}).pipe(
      catchError(err => {
        console.log(err.message);
        return throwError(() => 'Ocurrio un error');
      })
    );
  }

  findOne(id: number): Observable<HttpResponse<Viaje>> {
    return this.http.get<Viaje>(this.resourceUrl + '/' + id, { observe: "response" }).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe el micro");
      }),
    );
  }

  eliminar(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(this.resourceUrl + '/' + id, { observe: "response" }).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe la persona");
      }),
    );
  }

}

export interface ViajeData {
  id?: number,
  lugarSalida: string,
  lugarDestino: string,
  fechaLlegada: Date,
  fechaSalida: Date,
  personaId: number[],
  idColectivo: number
}
