export class Micro {
  id: number;
  patente: string;
  asientos: number;
  modeloNombre: string;
  modeloMarca: string;

  constructor(id:number, patente:string, asientos:number, modeloNombre:string, modeloMarca:string) {
    this.id = id;
    this.patente = patente;
    this.asientos = asientos;
    this.modeloNombre = modeloNombre;
    this.modeloMarca = modeloMarca;
  }
}
