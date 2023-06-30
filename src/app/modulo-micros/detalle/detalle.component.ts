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
    //id: ['', [Validators.required, Validators.maxLength(10)]],
    patente: ['', Validators.required],
    cantidadAsientos: [ '', [ Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(20), Validators.max(58),],    ],
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
      this.router.navigate(['persona', 'listado']);
    })
  }

  guardarCambios() {

    const body: MicroData = {
      id: this.form.value.id,
      cantidadAsientos: this.form.value.cantidadAsientos,
      patente: this.form.value.patente,
      modeloId: this.form.value.modeloId
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


