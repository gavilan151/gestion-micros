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

  microList: Micro[] = [  ];




  findAll(): Observable<HttpResponse<any[]>> {
    return this.http.get<any[]>(this.resourceUrl, { observe: "response" }).pipe(
      catchError(err => {
        console.log("Ocurrio un error");
        return throwError(() => "Paso algo");
      }),
    );
  }




  findOne(id: number): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.resourceUrl + '/' + id, { observe: "response" }).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe la persona");
      }),
    );
  }



  agregar(datos: Micro) {
    this.microList.unshift(datos);
  }

  eliminar(id: number) {
    console.log(id)
    this.microList.splice(id, 1);
    console.log(this.microList);
  }
}

export interface MicroData {
  id: number,
  cantidadAsientos: number,
  patente: string,
  modeloId: number

}

