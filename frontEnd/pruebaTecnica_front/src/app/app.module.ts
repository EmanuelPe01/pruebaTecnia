import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarTelasComponent } from './Components/listar-telas/listar-telas.component';
import { GestionColoresTelaComponent } from './Components/gestionColores/gestionColores';
import { NuevoColorTelaComponent } from './Components/gestionColores/nuevoColor';
import { GestionTiposTelaComponent } from './Components/gestionTipoTelas/gestionTipo';
import { NuevoTipoTelaComponent } from './Components/gestionTipoTelas/nuevoTipo';
import { NuevaTelaComponent } from './Components/gestionTelas/nuevatela';
import { VentaTelaComponent } from './Components/gestionTelas/ventaTela';
import { EditarTelaComponent } from './Components/gestionTelas/editarTela';
import { HistorialComprasComponent } from './Components/historial-compras/historial-compras.component';

@NgModule({
  declarations: [
    AppComponent,
    ListarTelasComponent,
    GestionColoresTelaComponent,
    NuevoColorTelaComponent,
    GestionTiposTelaComponent,
    NuevoTipoTelaComponent,
    NuevaTelaComponent,
    VentaTelaComponent,
    EditarTelaComponent,
    HistorialComprasComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
