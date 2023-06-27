import { Injectable } from '@angular/core';
import { persona } from '../models/persona';
import { Observable, of, catchError, throwError, mergeMap, first } from 'rxjs';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  constructor(  private http: HttpClient ) {}

  resourceUrl = environment.backendUrl + "personas"

  personaList: persona[] = [
    new persona(1, 30, 'Claudia', 'Flosi'),
    new persona(2, 10, 'Juan', 'Anuk'),
    new persona(3, 30, 'Pepe', 'Zanches'),
  ];



  findAll(): Observable<HttpResponse<any[]>> {

    return this.http.get<any[]>(this.resourceUrl, {observe: "response"}).pipe(
      catchError(err => {
            console.log("Ocurrio un error");
            return throwError(() => "Paso algo");
          }),
      );
    // return of(this.personaList).pipe(
    //   catchError((err) => {
    //     console.log('Ocurrio un Error');
    //     return throwError(() => 'Error xxxx');
    //   })
    // );
  }

  findOne(id: number): Observable<HttpResponse<any>> {
    return this.http.get<any>( this.resourceUrl + '/' + id, {observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe la persona");
      }),
  );

    // return of(this.personaList).pipe(
    //   mergeMap((p) => p),
    //   first(persona => persona.id === id)
    // );
  }


  agregar(persona: PersonaData): Observable<any> {
    return this.http.post<any>(this.resourceUrl, persona).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No se pudo crear la persona");
      }),
    );
  }


  actualizar(persona: PersonaData): Observable<any> {
    return this.http.put<any>(this.resourceUrl + '/' + persona.id, persona).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe la persona");
      }),
    );
  }


  eliminar(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>( this.resourceUrl + '/' + id, {observe: "response"}).pipe(
      catchError(err => {
        console.log("Ocurrio un error: ");
        console.log(err);
        return throwError(() => "No existe la persona");
      }),
    );
  }

}

export interface PersonaData {
  id: number,
  name: string,
  lastName: string,
  age: number
}
// export interface PersonDTO {
//   id: number,
//   name: string,
//   lastName: string,
//   age: number
// }
