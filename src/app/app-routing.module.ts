import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ManejoComponent } from './components/manejo/manejo.component';
import { CustoComponent } from './components/custo/custo/custo.component';
import { EstoqueComponent } from './components/estoque/estoque.component';
import { AgendadorComponent } from './components/agendador/agendador.component';
import { VendaComponent } from './components/venda/venda.component';

const routes: Routes = [  
  {path: 'eventos', component: AgendadorComponent},
  {path: 'upl', component: ManejoComponent},
  {path: 'custos', component: CustoComponent},
  {path: 'estoque', component: EstoqueComponent},
  {path: 'venda', component: VendaComponent},
  {path: '', redirectTo: '/eventos', pathMatch: 'full' }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
