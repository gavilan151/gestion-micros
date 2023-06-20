import {Component, EventEmitter, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  @Output()
  expandioBoton = new EventEmitter<boolean>();

  expandido = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  onClick() {
    this.expandido = !this.expandido;
    this.expandioBoton.emit(this.expandido);
  }

  irALista(){
    this.router.navigate(["persona","listado"])
  }

}
