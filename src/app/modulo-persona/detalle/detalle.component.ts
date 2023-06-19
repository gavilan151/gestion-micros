import { PersonaService } from 'src/app/services/persona.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { persona } from 'src/app/models/persona';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  personaSeleccionada: persona | null = null;

  constructor(
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id')
      console.log('El id es: ' + id);
      if(id){
        this.findPerson(Number.parseInt(id));
      }

    });
  }

  findPerson(id: number) {
    this.personaService.findOne(id).subscribe((res) => {
      this.personaSeleccionada = res;
    });
  }

  volverAtras(){
    this.router.navigate(["persona","listado"])
  }
}
