import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from './material-module';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import { UplComponent, UCComponent, UTComponent, AnimalComponent, CicloResumoComponent,
         FichaComponent, ProgramaFormComponent, CicloReproducaoComponent, CicloCrecheComponent, CicloSimularFormComponent, CicloTerminacaoComponent } from './components/manejo';
import { CustoComponent, LancamentoComponent, ReciboComponent } from './components/custo';
import { EstoqueComponent, RacaoComponent, EstoqueFormComponent,
         EstoqueHistoricoComponent } from './components/estoque';
import { ConsumoComponent, ConsumoFormComponent } from './components/consumo';
import { VendaComponent, VendaAnimalComponent } from './components/venda';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ChartsModule } from 'angular-bootstrap-md';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng5SliderModule } from 'ng5-slider';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { IgxTreeGridModule, IgxInputGroupModule, IgxRadioModule, IgxDialogModule, IgxButtonModule, 
         IgxRippleModule, IgxSwitchModule, IgxSliderModule } from "igniteui-angular";
import { NgxSpinnerModule } from "ngx-spinner";
import { 
	IgxGridModule,
	IgxFocusModule
 } from "igniteui-angular";

@NgModule({
  declarations: [
    AppComponent, LoginComponent, UplComponent, UCComponent, UTComponent, CicloResumoComponent, ReciboComponent,
    CustoComponent, FichaComponent, LancamentoComponent, CicloSimularFormComponent, LoginComponent,
    AnimalComponent, CicloReproducaoComponent, EstoqueComponent, EstoqueHistoricoComponent,
    RacaoComponent, EstoqueFormComponent, ProgramaFormComponent, ConsumoComponent,
    ConsumoFormComponent, VendaComponent, VendaAnimalComponent, CicloTerminacaoComponent, CicloCrecheComponent
  ],
  entryComponents: [CicloResumoComponent, FichaComponent, LancamentoComponent, CicloSimularFormComponent, 
    AnimalComponent, CicloReproducaoComponent, EstoqueHistoricoComponent, ReciboComponent,
                    RacaoComponent, EstoqueFormComponent, ProgramaFormComponent, 
                    ConsumoFormComponent, VendaAnimalComponent, CicloTerminacaoComponent, CicloCrecheComponent],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule,
    ReactiveFormsModule, MaterialModule, HttpClientModule,
    BrowserAnimationsModule,IgxTreeGridModule , IgxInputGroupModule, IgxGridModule,IgxFocusModule,
    IgxDialogModule, IgxButtonModule, IgxRippleModule, IgxSwitchModule, IgxSliderModule, 
    IgxRadioModule, NgSelectModule, MDBBootstrapModule.forRoot(), ChartsModule, 
    Ng5SliderModule, SimpleNotificationsModule.forRoot(), NgxSpinnerModule
  ],
  providers: [], 
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
