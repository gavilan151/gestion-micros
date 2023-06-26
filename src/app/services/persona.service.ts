import { Injectable } from '@angular/core';
import { persona } from '../models/persona';
import { Observable, of, catchError, throwError, mergeMap, first } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  constructor(
    private http: HttpClient
  ) {}

  personaList: persona[] = [
    new persona(1, 30, 'Claudia', 'Flosi'),
    new persona(2, 10, 'Juan', 'Anuk'),
    new persona(3, 30, 'Pepe', 'Zanches'),
    new persona(4, 50, 'Ana', 'hes'),
    new persona(5, 70, 'Mariano Leopoldo', 'Lorcasa Rodriguez'),
    new persona(6, 88, 'Juan', 'Zanches'),
    new persona(7, 12, 'Gabriel Damian', 'Miguel'),
    new persona(8, 21, 'Claudia', 'Miguel'),
    new persona(9, 19, 'Pablo', 'Etar'),
    new persona(10,13, 'Alejandra Monica', 'Rodriguez'),
    new persona(11, 30, 'Claudia', 'Flosi'),
    new persona(12, 10, 'Juan', 'Anuk'),
    new persona(13, 30, 'Pepe', 'Zanches'),
    new persona(14, 50, 'Ana', 'hes'),
    new persona(15, 70, 'Mariano Leopoldo', 'Lorcasa Rodriguez'),
    new persona(16, 88, 'Juan', 'Zanches'),
    new persona(17, 12, 'Gabriel Damian', 'Miguel'),
    new persona(18, 21, 'Claudia', 'Miguel'),
    new persona(19, 19, 'Pablo', 'Etar'),
    new persona(20,13, 'Alejandra Monica', 'Rodriguez'),

  ];



  findAll(): Observable<persona[]> {
    return of(this.personaList).pipe(
      catchError((err) => {
        console.log('Ocurrio un Error');
        return throwError(() => 'Error xxxx');
      })
    );
  }

  findOne(id: number): Observable<persona> {
    return of(this.personaList).pipe(
      mergeMap((p) => p),
      first(persona => persona.id === id)
    );
  }

  agregar(datosPersona: persona){
    this.personaList.unshift(datosPersona);
  }

  eliminar(id: number) {
    console.log(id)
    this.personaList.splice(id,1);
    console.log( this.personaList);

  }


}
