import { Injectable } from '@angular/core';
import { Micro } from '../models/micro';
import { Observable, of, catchError, throwError, mergeMap, first } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MicroService {

  constructor(private http: HttpClient) { }

  resourceUrl = environment.backendUrl + "colectivos"
  //resourceUrl = "https://k8s-lia.unrn.edu.ar/api/api/colectivos"
  microList: Micro[] = [  ];


  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl, { observe: "response" }).pipe(
      catchError(err => {
        console.log("Ocurrio un error");
        return throwError(() => "Paso algo");
      }),
    );
  }

  findOne(id: number): Observable<HttpResponse<Micro>> {
    return this.http.get<Micro>(this.resourceUrl + '/' + id, { observe: "response" }).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe el micro");
      }),
    );
  }

  findOneSinObserve(id: number): Observable<Micro> {
    return this.http.get<Micro>(this.resourceUrl + '/' + id).pipe(
      catchError(err => {
        console.log(err.message);
        return throwError(() => 'Ocurrio un problema');
      })
    );
  }

  agregar(micro: MicroData): Observable<any> {
    return this.http.post<any>(this.resourceUrl, micro).pipe(
      catchError(err => {

        console.log(err);
        return throwError(() => "No se pudo crear el micro");
      }),
    );
  }

  actualizar(micro: MicroData): Observable<any> {
    return this.http.put<any>(this.resourceUrl + '/' + micro.id, micro).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe el micro");
      }),
    );
  }

  eliminar(id: number): Observable<HttpResponse<any>> {
      return this.http.delete<any>(this.resourceUrl + '/' + id).pipe(

      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe el dato a eliminar");
      }),
    );
  }
}



export interface MicroData {
  id: number,
  patente: string,
  cantidadAsientos: number,
  modeloId: number,

}

