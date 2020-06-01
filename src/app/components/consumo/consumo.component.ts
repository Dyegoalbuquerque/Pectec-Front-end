import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { Consumo, Estoque, Subcategoria } from 'src/app/models';
import { EstoqueService } from '../../services';
import { MatPaginator, MatTableDataSource, MatSort, PageEvent } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { NotificationType, NotificationsService } from 'angular2-notifications';
import { plainToClass } from "class-transformer";
import { ConsumoFormComponent } from '.';
import { Paginacao } from 'src/app/paginacao';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'consumo-component',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css']
})

export class ConsumoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog, private estoqueService: EstoqueService, private notifications: NotificationsService) {

    this.paginacao = new Paginacao(1, 50);
    this.dataSourceConsumos = new MatTableDataSource<Consumo>([]);
    this.dataSourceConsumos.paginator = this.paginator;
    this.colunasConsumos = ['data', 'descricao', 'quantidade', 'unidadeMedida', 'custo', 'editar'];
    this.paginaOptions = [50, 100];
  }

  consumos: Consumo[];
  colunasConsumos: string[];
  dataSourceConsumos: MatTableDataSource<Consumo>;
  paginacao: Paginacao;
  paginaOptions: number[];
  paginaEvent: PageEvent;

  ngOnInit() {
    this.obterConsumos();
  }

  async obterConsumos() {
    try {
      let data = await this.estoqueService.obterConsumos(this.paginacao);
      this.dataSourceConsumos = new MatTableDataSource<Consumo>(plainToClass(Consumo, data.resultado));
      this.paginacao.total = data.total;
    } catch (error) {
      console.error(error);
      this.mostrarMensagem("Ocorreu um problema", "Consumo", NotificationType.Error);
    }
  }

  mudarPagina(e: any) {
    this.paginacao.pagina = e.pageIndex == 0 ? 1 : e.pageIndex;
    this.paginacao.limite = e.pageSize;
    this.obterConsumos();
  }

  abrirConsumoDialog(item: Consumo) {
    const dialogRef = this.dialog.open(ConsumoFormComponent, {
      width: '500px',
      height: '500px',
      data: item == undefined ? new Consumo(new Estoque(new Subcategoria())) : item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obterConsumos();
    });
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceConsumos.filter = filterValue.trim().toLowerCase();
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
}