import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth.guard';
import { UplComponent } from './components/manejo/upl/upl.component';
import { CustoComponent } from './components/custo/custo/custo.component';
import { EstoqueComponent } from './components/estoque/estoque/estoque.component';
import { ConsumoComponent } from './components/consumo/consumo.component';
import { VendaComponent } from './components/venda/venda/venda.component';
import { LoginComponent } from './components/login/login.component';
import { UCComponent } from './components/manejo/uc/uc.component';

const routes: Routes = [  
  {path: 'consumos', component: ConsumoComponent, canActivate: [AuthGuard] },
  {path: 'upl', component: UplComponent, canActivate: [AuthGuard] },
  {path: 'uc', component: UCComponent, canActivate: [AuthGuard] },
  {path: 'custos', component: CustoComponent, canActivate: [AuthGuard] },
  {path: 'estoque', component: EstoqueComponent, canActivate: [AuthGuard] },
  {path: 'venda', component: VendaComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent },
  {path: '', redirectTo: '/upl', pathMatch: 'full' }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
