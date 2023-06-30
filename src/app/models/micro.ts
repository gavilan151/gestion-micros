import {Modelo} from "./modelo";

export class Micro {
  id: number;
  patente: string;
  asientos: number;
  modeloId: number;
  modelo!: Modelo;

  constructor(id:number, patente:string, asientos:number, modeloId:number) {
    this.id = id;
    this.patente = patente;
    this.asientos = asientos;
    this.modeloId = modeloId;

  }
}
