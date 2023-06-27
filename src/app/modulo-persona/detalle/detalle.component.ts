import { PersonaService,PersonaData, } from 'src/app/services/persona.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { persona } from 'src/app/models/persona';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  personaSeleccionada: persona | null = null;
  tiles: any[] = [];

  form: FormGroup = this.fb.group({
    id: ['', []],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    edad: ['', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.min(0),
      Validators.max(110),
    ],
    ],
  });


  constructor(
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private matSnackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('El id es: ' + id);
      if (id) {
        this.findPerson(Number.parseInt(id));
      }
    });
  }


  findPerson(id: number) {
    this.personaService.findOne(id).subscribe(res => {
      if (res.body) {
        this.personaSeleccionada = new persona(res.body.id, res.body.age, res.body.name, res.body.lastName);

        this.form.patchValue({
          id: this.personaSeleccionada.id,
          nombre: this.personaSeleccionada.nombre,
          apellido: this.personaSeleccionada.apellido,
          edad: this.personaSeleccionada.edad,
        })
      }
    }, error => {
      console.log(error);
      this.matSnackBar.open(error, "Cerrar", {duration: 3000});
      this.router.navigate(['persona', 'listado']);
    })
  }



  guardarCambios() {

    const body: PersonaData = {
      id: this.form.value.id,
      name: this.form.value.nombre,
      lastName: this.form.value.apellido,
      age: this.form.value.edad
    }

    if (this.personaSeleccionada && this.personaSeleccionada.id) {

      // LLamar al metodo actualizar
      body.id = this.personaSeleccionada.id;

      this.personaService.actualizar(body).subscribe(res => {
        this.matSnackBar.open("Se guardaron los cambios correctamente", "Cerrar", {duration: 3000} );

      }, error => {
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      });

    } else {
      // Llamar al metodo crear
      this.personaService.agregar(body).subscribe(res => {
        this.matSnackBar.open("Se efectuo el alta correctamente", "Cerrar", {duration: 3000});

      }, error => {
        console.log(error);
        this.matSnackBar.open(error, "Cerrar");
      });
      };
      this.router.navigate(['persona', 'listado']);
    }



  volverAtras() {
    this.router.navigate(['persona', 'listado']);
  }
}
