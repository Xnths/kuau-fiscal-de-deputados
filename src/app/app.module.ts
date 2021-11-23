import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DeputadoCardComponent } from './deputado-card/deputado-card.component';
import {HttpClientModule} from "@angular/common/http";
import { BarraPesquisaComponent } from './barra-pesquisa/barra-pesquisa.component';
import { FormsModule } from '@angular/forms';
import { DeputadoPerfilComponent } from './deputado-perfil/deputado-perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    DeputadoCardComponent,
    BarraPesquisaComponent,
    DeputadoPerfilComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
