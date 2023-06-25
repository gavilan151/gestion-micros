import { PersonaService } from 'src/app/services/persona.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { persona } from 'src/app/models/persona';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  personaSeleccionada: persona | null = null;
  tiles: any[] = [];

  form: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.maxLength(10)]],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    edad: [
      '',
      [
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
    private fb: FormBuilder
  ) {}

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
    this.personaService.findOne(id).subscribe((res) => {
      this.personaSeleccionada = res;
      //agrega los datos para poder ser previsualizados en los campos del formulario
      this.form.patchValue({
        id: this.personaSeleccionada.id,
        nombre: this.personaSeleccionada.nombre,
        apellido: this.personaSeleccionada.apellido,
        edad: this.personaSeleccionada.edad,
      });
    });
  }

  guardarCambios() {
    if (this.personaSeleccionada && this.personaSeleccionada.id) {
      // LLamar al metodo actualizar
      console.log('Actualizando una persona');

    } else {
      // Llamar al metodo crear
      console.log('Creando una persona');
      const cPersona: persona = {
        id: this.form.value.id,
        nombre: this.form.value.nombre,
        apellido: this.form.value.apellido,
        edad: this.form.value.edad,
      };
      this.personaService.agregar(cPersona);
    }

    this.router.navigate(['persona', 'listado']);
  }

  volverAtras() {
    this.router.navigate(['persona', 'listado']);
  }
}
