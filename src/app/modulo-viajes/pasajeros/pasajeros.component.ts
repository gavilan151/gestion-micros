import { Component ,Inject} from '@angular/core';
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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ListadoComponent } from '../listado/listado.component';

export interface PersonaData {
  id: number,
  nombre: string,
  apellido: string,
  edad: number
}

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
    public dialogRef: MatDialogRef<PasajerosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.dataSource = new MatTableDataSource(this.personaList);
    this.obtenerPersonas();

    console.log(data);
   }

   displayedColumns: string[] = ['nombre', 'apellido', 'edad'];
   clickedRows = new Set<persona>();
   dataSource!: MatTableDataSource<any>;

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort

   ngOnInit() {
    this.personaList = this.data;
    //this.dataSource.data = this.data
    this.obtenerPersonas();
  }
  obtenerPersonas() {
    // this.personaService.findAll().subscribe(res => {
    //   if (res.body)
    //     this.personaList = res.body.map(json => new persona(json.id, json.age, json.name, json.lastName)); //como estan en la tabla de la base de datos
        this.dataSource.data = this.personaList ;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    
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
