import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Micro } from 'src/app/models/micro';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MicroService,MicroData } from 'src/app/services/micro.service';
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})

export class DetalleComponent implements OnInit {
  microSeleccionado: Micro | null = null;
  tiles: any[] = [];

  form: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.maxLength(10)]],
    patente: ['', Validators.required],
    asientos: [ '', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(20), Validators.max(58),],    ],
    modeloNombre: ['', Validators.required],
    modeloMarca: ['', Validators.required],
  });

  constructor(
    private microService: MicroService,
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
  }


  findMicro(id: number) {
    this.microService.findOne(id).subscribe(res => {
      if (res.body) {
        this.microSeleccionado = new Micro(res.body.id, res.body.cantidad_asientos, res.body.id_modelo, res.body.patente, res.body.modelo_id_id);

          this.form.patchValue({
          id: this.microSeleccionado.id,
          nombre: this.microSeleccionado.patente,
          apellido: this.microSeleccionado.asientos,
          edad: this.microSeleccionado.modeloNombre,
          modeloMarca: this.microSeleccionado.modeloMarca,
        })
      }
    }, error => {
      console.log(error);
      this.matSnackBar.open(error, "Cerrar", {duration: 3000});
      this.router.navigate(['persona', 'listado']);
    })
  }

  guardarCambios() {
    if (this.microSeleccionado && this.microSeleccionado.id) {
      // LLamar al metodo actualizar
      console.log('Actualizando una persona');

    } else {
      // Llamar al metodo crear
      console.log('Creando una persona');
      const cPersona: Micro = {
        id: this.form.value.id,
        patente: this.form.value.patente,
        asientos: this.form.value.asientos,
        modeloNombre: this.form.value.modeloNombre,
        modeloMarca: this.form.value.modeloMarca,

      };
      this.microService.agregar(cPersona);
    }

    this.router.navigate(['micro', 'listado']);
  }

  volverAtras() {
    this.router.navigate(['micro', 'listado']);
  }
}


