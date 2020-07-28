
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Venda } from 'src/app/models';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VendaService } from '../../../services';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { VendaAnimalComponent} from '..';
import { Paginacao } from 'src/app/paginacao';

@Component({
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css'],
  providers: [VendaService]
})

export class VendaComponent implements OnInit {

  constructor(private vendaService: VendaService, public dialog: MatDialog,
    private notifications: NotificationsService, private spinner: NgxSpinnerService) {

    this.colunasVenda = ['data', 'ano', 'tipo', 'descricao', 'resumo'];
    this.dataSourceVenda = new MatTableDataSource<Venda>([]);
    this.dataSourceVenda.paginator = this.paginator;
    this.totalVendido = 0;
    this.paginacao = new Paginacao(1, 50);
    this.paginaOptions = [50, 100];
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  colunasVenda: string[];
  dataSourceVenda: MatTableDataSource<Venda>;
  totalVendido: number;
  paginacao: Paginacao;
  paginaOptions: number[];
  paginaEvent: PageEvent;

  ngOnInit() {
    this.obterVendas(2020);
  }

  async obterVendas(ano: number) {

    try {
      let data = await this.vendaService.obterVendas(ano, this.paginacao);
      this.totalVendido = 0;
      this.dataSourceVenda = new MatTableDataSource<Venda>(data.resultado.sort(Venda.ordenarPorDataDecrecente));
      this.paginacao.total = data.total;
      this.somarTotais(this.dataSourceVenda.data);
    } catch (error) {
      console.error(error);
      this.mostrarMensagem("Ocorreu um problema", "Venda", NotificationType.Error);
    }
  }

  mudarPagina(e: any) {
    this.paginacao.pagina = e.pageIndex == 0 ? 1 : e.pageIndex;
    this.paginacao.limite = e.pageSize;
    this.obterVendas(2020);
  }

  somarTotais(lista: any[]) {
    lista.forEach(x => {
      this.totalVendido += x.valorTotal;
    });
  }

  abrirVendaLeitaoDialog(item: Venda): void {
    const dialogRef = this.dialog.open(VendaAnimalComponent, {
      width: '480px',
      height: '500px',
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

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceVenda.filter = filterValue.trim().toLowerCase();
  }
}


