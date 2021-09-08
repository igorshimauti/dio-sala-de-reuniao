import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalasComponent } from './views/salas/salas.component';
import { CreateSalaComponent } from './sala/create-sala/create-sala.component';
import { UpdateSalaComponent } from './sala/update-sala/update-sala.component';
import { DeleteSalaComponent } from './sala/delete-sala/delete-sala.component';

const routes: Routes = [{
  path: "salas",
  component: SalasComponent
},
{
  path: "salas/nova",
  component: CreateSalaComponent
},
{
  path: "salas/atualizar/:id",
  component: UpdateSalaComponent
},
{
  path: "salas/excluir/:id",
  component: DeleteSalaComponent
},
{
  path: "",
  redirectTo: "salas",
  pathMatch: "full"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
