import { DetalleComponent } from './../detalle/detalle.component';
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
    private router: Router,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.personaList);
   }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DetalleComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'edad', "bm"];
  clickedRows = new Set<persona>();
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.obtenerPersonas();
  }

  obtenerPersonas() {
    this.personaService.findAll().subscribe(res => {
      this.personaList = res;
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      console.log("Ocurrio un error");
    });

  }

  seleccionarPersona(xpersona: persona) {
    this.router.navigate(["detalle", xpersona.id])
  }

  editar(xpersona: string) {
   // this.openDialog('1ms', '1ms'); //abre en una ventana
    this.router.navigate(["persona","detalle", xpersona])
  }

  nuevo() {
    this.router.navigate(["persona","alta"])
  }

  eliminar(xid: number) {
    console.log(xid)
    this.personaService.eliminar(xid)
      this.obtenerPersonas();
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

