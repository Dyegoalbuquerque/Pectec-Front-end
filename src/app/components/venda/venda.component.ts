
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VendaFormComponent } from './venda.form.component';
import { Venda } from 'src/app/models';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VendaService } from '../../services';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

  constructor(private vendaService: VendaService, public dialog: MatDialog,
    private notifications: NotificationsService, private spinner: NgxSpinnerService) { }


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  colunasVenda: string[] = ['data', 'ano', 'tipo', 'item', 'valor', 'recibo'];
  dataSourceVenda: MatTableDataSource<Venda>;

  ngOnInit() {
    this.dataSourceVenda = new MatTableDataSource<Venda>([]);
    this.obterVendas(2020);
  }

  obterVendas(ano: number) {
    this.vendaService.obterVendas(ano).subscribe(data => {
      this.dataSourceVenda = new MatTableDataSource<Venda>(data);
      this.dataSourceVenda.paginator = this.paginator;
      this.dataSourceVenda.data = this.dataSourceVenda.data.sort(Venda.ordenarPorDataDecrecente);
    });
  }

  abrirVendaDialog(item: Venda): void {
    const dialogRef = this.dialog.open(VendaFormComponent, {
      width: '700px',
      height: '650px',
      data: item == null ? new Venda() : item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obterVendas(2020);
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


