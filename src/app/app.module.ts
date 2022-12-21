import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppBarComponent } from './shared/app-bar/app-bar.component';
import { ReservasModule } from './reservas/reservas.module';
import { AppRouterModule } from './app-router.module';

@NgModule({
  declarations: [
    AppComponent,
    AppBarComponent
  ],
  imports: [
    BrowserModule,
    ReservasModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
