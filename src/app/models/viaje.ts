export class Viaje {
  id: number;
  lugarSalida: string;
  lugarDestino: string;
  colectivo: string;
  fechaSalida: string;
  horaSalida: string;
  fechaLLegada: string;
  horaLLegada: string;
  listaPasajeros: [];

  constructor(id:number, lugarSalida:string, lugarDestino:string, colectivo:string, fechaSalida:string,
    horaSalida:string, fechaLLegada:string, horaLLegada:string, listaPasajeros:[]) {
    this.id = id;
    this.lugarSalida = lugarSalida;
    this.lugarDestino = lugarDestino;
    this.colectivo = colectivo;
    this.fechaSalida = fechaSalida;
    this.horaSalida = horaSalida;
    this.fechaLLegada = fechaLLegada;
    this.horaLLegada = horaLLegada;
    this.listaPasajeros = listaPasajeros;
  }
}
