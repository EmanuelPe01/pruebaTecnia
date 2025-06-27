import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarTelasComponent } from './Components/listar-telas/listar-telas.component';
import { HistorialComprasComponent } from './Components/historial-compras/historial-compras.component';

const routes: Routes = [
  {path: '', component: ListarTelasComponent},
  {path: 'historialVentas', component: HistorialComprasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
