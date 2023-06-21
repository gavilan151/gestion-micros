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
  form: FormGroup;

  constructor(
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
    });

  }

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
    });
  }

 cargar(){
  this.form = this.fb.group({
    id: ['aa', Validators.required],
    nombre: ['aa', Validators.required],
    apellido: ['aa', Validators.required],
    edad: ['a', Validators.required],
  });
 }

  agregar() {
    console.log(this.form);

    const cPersona: persona = {
      id: this.form.value.id,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      edad: this.form.value.edad,
    };
    this.personaService.agregar(cPersona);
    this.router.navigate(["persona","listado"])
  }
  volverAtras() {
    this.router.navigate(['persona', 'listado']);
  }
}
