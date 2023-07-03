//Angular
import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';

//Propios
import { MicroService } from 'src/app/services/micro.service';
import { ViajeService } from 'src/app/services/viaje.service';
import { Viaje } from 'src/app/models/viaje';
import { Micro } from 'src/app/models/micro';


//Material
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetalleComponent } from '../detalle/detalle.component';
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit, AfterViewInit {
  viajeList: Viaje[] = [];
  microSeleccionado: Viaje | null = null;

  constructor(
    private viajeService: ViajeService,
    private microService: MicroService,
    private router: Router,
    public dialog: MatDialog,
    private matSnackBar: MatSnackBar,
  ) {
    this.obtenerViaje()
  }

  displayedColumns: string[] = ['origen', 'destino', 'fechaLlegada', 'fechaSalida', 'colectivo', 'bm'];
  clickedRows = new Set<Viaje>();
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.viajeList);
    this.obtenerViaje()
  }

  obtenerViaje() {
    this.viajeService.findAll().subscribe(res => {
      if (res.body)
        this.viajeList = res.body.map(res => {
          const viaje = new Viaje(res.id, res.lugarDestino, res.lugarSalida, res.fechaLlegada, res.fechaSalida, res.idColectivo);
          this.cargarColectivo(viaje);
          this.dataSource.data = this.viajeList ;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          return viaje;
        });
    })
  }

  cargarColectivo(viaje: Viaje) {
    this.microService.findOneSinObserve(viaje.idColectivo).subscribe(res => {   //le paso findOneSinObserve en vez de findOne para tener solo los datos sin la cavecera
      viaje.colectivo = res;
    })
  }

  editar(xviaje: string) {
    // this.openDialog('1ms', '1ms'); //abre en una ventana
     this.router.navigate(["viaje","detalle", xviaje])
   }

   nuevo() {
    this.router.navigate(["viaje","alta"])
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

  eliminar(id: number) {
    this.viajeService.eliminar(id).subscribe(res => {
      this.matSnackBar.open("El registro fue borrado correctamente", "Cerrar", {duration: 3000});
      this.obtenerViaje();
    }, error => {
      console.log(error);
      this.matSnackBar.open(error, "Cerrar");
    });
  }
}
