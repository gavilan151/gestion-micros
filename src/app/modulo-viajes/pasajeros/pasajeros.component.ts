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
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-pasajeros',
  templateUrl: './pasajeros.component.html',
  styleUrls: ['./pasajeros.component.css']
})
export class PasajerosComponent implements OnInit, AfterViewInit  {
  personaList: persona[] = [];

  constructor(
    private personaService: PersonaService,
    private router: Router,
    public dialog: MatDialog,
    private matSnackBar: MatSnackBar,
  ) {
    this.dataSource = new MatTableDataSource(this.personaList);
    this.obtenerPersonas();
   }

   displayedColumns: string[] = ['nombre', 'apellido', 'edad'];
   clickedRows = new Set<persona>();
   dataSource!: MatTableDataSource<any>;

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort

   ngOnInit() {
    this.obtenerPersonas();
  }
  obtenerPersonas() {
    this.personaService.findAll().subscribe(res => {
      if (res.body)
        this.personaList = res.body.map(json => new persona(json.id, json.age, json.name, json.lastName)); //como estan en la tabla de la base de datos
        this.dataSource.data = this.personaList ;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }, error => {
      console.log("Ocurrio un error, Imposible!");
    });
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
