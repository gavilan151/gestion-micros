import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from "@angular/material/snack-bar";
import { DateAdapter } from '@angular/material/core';

import { ViajeService,ViajeData } from 'src/app/services/viaje.service';
import { Viaje } from 'src/app/models/viaje';
import { Micro } from 'src/app/models/micro';
import { MicroService } from 'src/app/services/micro.service';
import { Modelo } from 'src/app/models/modelo';
import { PersonaService } from 'src/app/services/persona.service';
import { persona } from 'src/app/models/persona';
import { ModeloService } from 'src/app/services/modelo.service';



@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent {

  viajeSeleccionado: Viaje | null = null;
  tiles: any[] = [];
  microList: Micro[] = [];
  personaList: persona[] = [];

  form: FormGroup = this.fb.group({
    origen: ['', Validators.required],
    destino: ['', Validators.required],
    fechaSalida: [new Date(), Validators.required],
    fechaLlegada: [new Date(), Validators.required],
    colectivo: [0, Validators.required],
    pasajeros: [[], Validators.required]
  });

  constructor(
    private viajeService: ViajeService,
    private microService: MicroService,
    private personaService: PersonaService,
    private modeloService: ModeloService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>,
  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.findViaje(Number.parseInt(id));
      }
    });
    this.cargarMicro()
    console.log("ver");
  }

  findViaje(id: number) {
    this.viajeService.findOne(id).subscribe(res => {
      if (res.body) {
        this.viajeSeleccionado = new Viaje(res.body.id, res.body.lugarSalida, res.body.lugarDestino,
          res.body.fechaLlegada, res.body.fechaSalida, res.body.idColectivo);
          this.cargarColectivo(this.viajeSeleccionado)
          this.findMicro(this.viajeSeleccionado)
        this.form.patchValue({
          id: this.viajeSeleccionado.id,
          origen: this.viajeSeleccionado.lugarSalida,
          destino: this.viajeSeleccionado.lugarDestino,
          fechaSalida: this.viajeSeleccionado.fechaSalida,
          fechaLlegada: this.viajeSeleccionado.fechaLlegada,
          idColectivo: this.viajeSeleccionado.idColectivo,
          colectivo: this.viajeSeleccionado.colectivo,

        })
        console.log("this.viajeSeleccionado.colectivo");
        console.log(this.viajeSeleccionado.colectivo);
        console.log(this.viajeSeleccionado);
        console.log(this.viajeSeleccionado.colectivo);
      }
    }, error => {
      console.log(error);
      this.matSnackBar.open(error, "Cerrar", { duration: 3000 });
      this.router.navigate(['viaje', 'listado']);
    })
  }

  findMicro(viaje: Viaje){
    this.microService.findOneSinObserve(viaje.idColectivo).subscribe(res => {
      viaje.colectivo = new Micro(res.id, res.patente, res.cantidadAsientos, res.modeloId);
      this.cargaMicroModelo( viaje.colectivo)
    },
    error => {
      console.log(error);
      this.matSnackBar.open(error, "cerrar")
    })
    console.log(viaje.colectivo);
    return viaje.colectivo;
  }
  cargarColectivo(viaje: Viaje) {
    this.microService.findOneSinObserve(viaje.idColectivo).subscribe(res => {   //le paso findOneSinObserve en vez de findOne para tener solo los datos sin la cavecera
      viaje.colectivo = res;
    })
  }

  cargarMicro() {
    this.microService.findAll().subscribe(res => {
      if (res.body) {
        this.microList = res.body.map(json => {
          const micro = new Micro(json.id, json.patente, json.cantidadAsientos, json.modeloId);
          this.cargaMicroModelo(micro);
          return micro;
        });
      }
    },
      error => {
        console.log(error);
        this.matSnackBar.open(error, "cerrar")
      })

    this.personaService.findAll().subscribe(res => {
      if (res.body)
        this.personaList = res.body.map(json => new persona(json.id, json.age, json.name, json.lastName));
    })
  }

  cargaMicroModelo(colectivo: Micro) {
    this.modeloService.findOne(colectivo.modeloId).subscribe(res => {
      colectivo.modelo = new Modelo(res.id, res.nombre, res.marca);
    })
  }

  guardarCambios() {
    const body: ViajeData = {
      lugarSalida: this.form.value.origen,
      lugarDestino: this.form.value.destino,
      fechaSalida: this.form.value.fechaSalida,
      fechaLlegada: this.form.value.fechaLlegada,
      personaId: this.form.value.pasajeros,
      idColectivo: this.form.value.colectivo,
    }

    if (this.viajeSeleccionado && this.viajeSeleccionado.id) {
      // LLamar al metodo actualizar
      body.id = this.viajeSeleccionado.id;
      this.viajeService.actualizar(body).subscribe(res => {
        this.matSnackBar.open("Se guardaron los cambios correctamente", "Cerrar", { duration: 3000 });
      }, error => {
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      });

    } else {
      // Llamar al metodo crear
      this.viajeService.agregar(body).subscribe(res => {
        this.matSnackBar.open("Se efectuo el alta correctamente", "Cerrar", { duration: 3000 });

      }, error => {
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      });

    }
    this.router.navigate(['viaje', 'listado']);
  }

  volverAtras() {
    this.router.navigate(['viaje', 'listado']);
  }

}
