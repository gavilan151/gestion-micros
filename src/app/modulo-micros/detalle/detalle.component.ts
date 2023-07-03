
import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from "@angular/material/snack-bar";

import { Micro } from 'src/app/models/micro';
import { MicroService,MicroData } from 'src/app/services/micro.service';
import { Modelo } from 'src/app/models/modelo';
import { ModeloService } from './../../services/modelo.service';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})

export class DetalleComponent implements OnInit {
  microSeleccionado: Micro | null = null;
  tiles: any[] = [];
  modeloList: Modelo[] = [];

  form: FormGroup = this.fb.group({
    //id: ['', [Validators.required, Validators.maxLength(10)]],
    patente: ['', Validators.required],
    cantidadAsientos: [ '', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(20), Validators.max(58),],    ],
    modelo: [0, Validators.required],

  });

  constructor(
    private microService: MicroService,
    private modeloService: ModeloService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.findMicro(Number.parseInt(id));
      }
    });
    this.cargaModelo()
    console.log("ver");
  }

  cargaModelo(){
    this.modeloService.findAll().subscribe(res => {
      if (res.body) {
      this.modeloList = res.body.map(json => {
        const modelo = new Modelo(json.id, json.nombre, json.marca);
        return modelo;
      });
    }
    },
      error => {
        console.log(error);
        this.matSnackBar.open(error, "cerrar")
      })
  }

  findMicro(id: number) {
    this.microService.findOne(id).subscribe(res => {
      if (res.body) {
        this.microSeleccionado = new Micro(res.body.id, res.body.patente,  res.body.cantidadAsientos, res.body.modeloId);
          
          this.form.patchValue({
          id: this.microSeleccionado.id,
          patente: this.microSeleccionado.patente,
          cantidadAsientos: this.microSeleccionado.cantidadAsientos,
          modeloId: this.microSeleccionado.modeloId,
        })
      }
    }, error => {
      console.log(error);
      this.matSnackBar.open(error, "Cerrar", {duration: 3000});
      this.router.navigate(['micro', 'listado']);
    })
  }

  guardarCambios() {

    const body: MicroData = {
      id: this.form.value.id,
      cantidadAsientos: Number(this.form.value.cantidadAsientos),
      patente: this.form.value.patente,
      modeloId: this.form.value.modelo
    }

    if (this.microSeleccionado && this.microSeleccionado.id) {
      // LLamar al metodo actualizar
      body.id = this.microSeleccionado.id;
      this.microService.actualizar(body).subscribe(res => {
        this.matSnackBar.open("Se guardaron los cambios correctamente", "Cerrar", { duration: 3000 });
      }, error => {
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      });

    } else {
      // Llamar al metodo crear
      this.microService.agregar(body).subscribe(res => {
        this.matSnackBar.open("Se efectuo el alta correctamente", "Cerrar", { duration: 3000 });

      }, error => {
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      });

    }
    this.router.navigate(['micro', 'listado']);
  }


  volverAtras() {
    this.router.navigate(['micro', 'listado']);
  }
}


