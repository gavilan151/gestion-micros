import { MatLegacyListModule } from '@angular/material/legacy-list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import {MatMenuModule} from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TopbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatLegacyListModule,
    MatSidenavModule,
    MatMenuModule,
    RouterModule
  ],
  exports: [TopbarComponent, SidebarComponent]
})
export class SharedModule { }
