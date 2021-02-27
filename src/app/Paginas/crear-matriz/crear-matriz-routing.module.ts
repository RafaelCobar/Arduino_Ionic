import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearMatrizPage } from './crear-matriz.page';

const routes: Routes = [
  {
    path: '',
    component: CrearMatrizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearMatrizPageRoutingModule {}
