import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManejoService, AgendadorService } from 'src/app/services';
import { Evento, Estoque, Subcategoria } from 'src/app/models';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EventoComponent } from '../agendador';
import { plainToClass } from "class-transformer";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'agendador-component',
  templateUrl: './agendador.component.html',
  styleUrls: ['./agendador.component.css']
})
export class AgendadorComponent implements OnInit {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private notifications: NotificationsService, private spinner: NgxSpinnerService,
    private manejoService: ManejoService, public dialog: MatDialog, private agendadorService: AgendadorService) {
  }

  panelOpenState = false;
  eventos: Evento[];
  colunasEventos: string[] = ['data',  'tipo', 'descricao', 'quantidade', 'unidadeMedida', 'custo', 'editar'];
  dataSourceEventos: MatTableDataSource<Evento>;


  ngOnInit() {
    this.obterEventos();
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceEventos.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEventos.paginator) {
      this.dataSourceEventos.paginator.firstPage();
    }
  }

  obterEventos() {
    this.agendadorService.obterEventos().subscribe(data => {
      this.dataSourceEventos = new MatTableDataSource<Evento>(data);
      this.dataSourceEventos.paginator = this.paginator;
      this.dataSourceEventos.data = plainToClass(Evento, this.dataSourceEventos.data.sort(Evento.ordenar));
    });
  }

  abrirEventoDialog(item: Evento) {
    const dialogRef = this.dialog.open(EventoComponent, {
      width: '700px',
      height: '450px',
      data: item == undefined ? new Evento(new Estoque(new Subcategoria())) : item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obterEventos();
    });
  }

  mostrarMensagem(mensagem: string, action: string, tipo: NotificationType) {

    let animationTypes = ['fromRight', 'fromLeft', 'scale', 'rotate'];

    let config = {
      type: tipo,
      title: action,
      content: mensagem,
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      animate: 'scale'
    };

    this.notifications.create(config.title, config.content, config.type, config);
  }

  mostrarSpinner() {
    this.spinner.show(undefined, { fullScreen: true });
  }

  esconderSpinner() {
    this.spinner.hide();
  }
}