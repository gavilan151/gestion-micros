import {Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'curso-angular';
  @Output()
  expandioBoton = new EventEmitter<boolean>();

  isExpanded = false;

  onExpandedPress(expanded: boolean) {
    this.isExpanded = expanded;
  }

  expandido = true;

  onClick() {
    this.expandido = !this.expandido;
    this.expandioBoton.emit(this.expandido);
  }
}
