import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})

export class ListadoComponent implements OnInit, AfterViewInit {
  personaList: persona[] = [];

  personaSeleccionada: persona | null = null;

  constructor(
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'edad', "bm"];
  clickedRows = new Set<persona>();
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.obtenerPersonas();
    this.dataSource = new MatTableDataSource(this.personaList);
  }

  obtenerPersonas() {
    this.personaService.findAll().subscribe(res => {
      this.personaList = res;
    }, error => {
      console.log("Ocurrio un error");
    });

  }

  seleccionarPersona(xpersona: persona) {
    this.router.navigate(["detalle", xpersona.id])
  }

  editar(xpersona: string) {
    this.router.navigate(["detalle", xpersona])
  }

  nuevo() {
    this.router.navigate(["detalle", "0"])
  }

  eliminar(xpersona: string) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}

