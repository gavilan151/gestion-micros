import { Injectable } from '@angular/core';
import { Micro } from '../models/micro';
import { Observable, of, catchError, throwError, mergeMap, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MicroService {

  constructor() { }
  microList: Micro[] = [
    new Micro(1, "AD-400-AA", 50,"0500RS", 'Mercedes-Benz1'),
    new Micro(2, "AF-340-AD", 45,"0500RS2", 'Mercedes-Benz2'),
    new Micro(3, "DD-942-AA", 50,"K-400 Metalsur", "Scania1"),
    new Micro(4, "AD-335-AA", 58,"0500RS3", 'Mercedes-Benz3'),
    new Micro(5, "FD-975-AA", 45, "K-400 Metalsur1", "Scania2"),



  ];



  findAll(): Observable<Micro[]> {
    return of(this.microList).pipe(
      catchError((err) => {
        console.log('Ocurrio un Error');
        return throwError(() => 'Error xxxx');
      })
    );
  }

  findOne(id: number): Observable<Micro> {
    return of(this.microList).pipe(
      mergeMap((p) => p),
      first(micro => micro.id === id)
    );
  }

  agregar(datos: Micro){
    this.microList.unshift(datos);
  }

  eliminar(id: number) {
    console.log(id)
    this.microList.splice(id,1);
    console.log( this.microList);
  }


}


