import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarTelasComponent } from './Components/listar-telas/listar-telas.component';

const routes: Routes = [
  {path: '', component: ListarTelasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
