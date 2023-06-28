import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DetalleComponent } from '../detalle/detalle.component';
import { Micro } from 'src/app/models/micro';
import { MicroService } from 'src/app/services/micro.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit, AfterViewInit {

  microList: Micro[] = [];

  microSeleccionado: Micro | null = null;

  constructor(
    private microService: MicroService,
    private router: Router,
    public dialog: MatDialog,
    private matSnackBar: MatSnackBar,
  ) { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DetalleComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  displayedColumns: string[] = ['patente', 'asientos', 'modeloNombre', 'modeloMarca', "bm"];
  clickedRows = new Set<Micro>();
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.obtenerMicro();
    this.dataSource = new MatTableDataSource(this.microList);
  }

  obtenerMicro() {
    this.microService.findAll().subscribe(res => {
      if (res.body)
        this.microList = res.body.map(json => new Micro(json.id, json.cantidad_asientos, json.id_modelo, json.patente,json.modelo_id_id)); //como estan en la tabla de la base de datos
        this.dataSource.data = this.microList ;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }, error => {
      console.log("Ocurrio un error, Imposible!");
    });
  }

  seleccionarMicro(xmicro: Micro) {
    this.router.navigate(["detalle", xmicro.id])
  }

  editar(xmicro: string) {
   // this.openDialog('1ms', '1ms'); //abre en una ventana
    this.router.navigate(["micro","detalle", xmicro])
  }

  nuevo() {
    this.router.navigate(["micro","alta"])
  }

  eliminar(xid: number) {
    console.log(xid)
    this.microService.eliminar(xid)

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
