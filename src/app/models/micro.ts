import {Modelo} from "./modelo";

export class Micro {
  id: number;
  patente: string;
  cantidadAsientos: number;
  modeloId: number;
  modelo!: Modelo;

  constructor(id:number, patente:string, cantidadAsientos:number, modeloId:number) {
    this.id = id;
    this.patente = patente;
    this.cantidadAsientos = cantidadAsientos;
    this.modeloId = modeloId;

  }
}
