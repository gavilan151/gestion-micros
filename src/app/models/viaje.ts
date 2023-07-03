import { Micro } from "./micro";

export class Viaje {
  id: number;
  lugarSalida: string;
  lugarDestino: string;
  fechaLlegada: Date;
  fechaSalida: Date;
  personaId: number[] | undefined;
  idColectivo: number;
  colectivo!: Micro;

  constructor(id: number, lugarSalida: string, lugarDestino: string, fechaLlegada: Date, fechaSalida: Date, idColectivo: number) {
    this.id = id;
    this.lugarSalida = lugarSalida;
    this.lugarDestino = lugarDestino;
    this.fechaLlegada = new Date(fechaLlegada);
    this.fechaSalida = new Date(fechaSalida);
    this.idColectivo = idColectivo;
  }
}
