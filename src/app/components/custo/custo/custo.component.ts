
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Lancamento } from 'src/app/models';
import { CustoService } from '../../../services';
import { LancamentoComponent, ReciboComponent, CustoComportamento } from '..';
import { IgxTreeGridComponent } from "igniteui-angular";
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Paginacao } from 'src/app/paginacao';
import { BalancoLancamento } from 'src/app/models/balancoLancamento';


@Component({
  templateUrl: './custo.component.html',
  styleUrls: ['./custo.component.css']
})
export class CustoComponent implements OnInit {

  constructor(private custoService: CustoService, public dialog: MatDialog,
    private _snackBar: MatSnackBar, private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer, private custoComportamento: CustoComportamento) {
    this.definirIcones();
    this.anos = [];
    this.ano = 2019;
    this.balancoLancamento = new BalancoLancamento();
    this.dataSourceLancamento = new MatTableDataSource<Lancamento>([]);
    this.dataSourceLancamento.paginator = this.paginator;
    this.colunasLancamentos = ['n', 'mes', 'vencimento', 'categoria', 'descricao', 'status', 'valor', 'tipo', 'remover', 'recibo'];
    this.paginacao = new Paginacao(1, 50);
    this.paginaOptions = [50, 100];
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("gridCronograma", { read: IgxTreeGridComponent, static: true }) gridCronograma: IgxTreeGridComponent;

  cronogramas: Lancamento[];
  balancoLancamento: BalancoLancamento;
  anos: any;
  ano: number;
  colunasLancamentos: string[];
  dataSourceLancamento: MatTableDataSource<Lancamento>;
  paginacao: Paginacao;
  paginaOptions: number[];
  paginaEvent: PageEvent;

  ngOnInit() {
    this.obterBalancoLancamentos(this.ano);
    this.obterLancamentos();
    this.obterCronogramas();
    this.montarAnos();
  }

  async obterBalancoLancamentos(ano: number) {
    try {
      this.balancoLancamento = await this.custoService.obterBalancoLancamentos(ano);
    }
    catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "Lançamento");
    }
  }

  async obterLancamentos() {
    try {
      let data = await this.custoService.obterLancamentoPorAno(this.ano, this.paginacao);
      this.dataSourceLancamento = new MatTableDataSource<Lancamento>(data.resultado);
      this.paginacao.total = data.total;
    }
    catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "Lançamento");
    }
  }

  async obterCronogramas() {
    try {
      let data = await this.custoService.obterLancamentoPorAno(this.ano, this.paginacao);
      this.cronogramas = this.custoComportamento.construirCronograma(data.resultado);
    }
    catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "Lançamento");
    }
  }

  async removerLancamento(id: number) {

    try {
      await this.custoService.removerLancamento(id);

      this.obterLancamentos();
      this.obterCronogramas();

      this.mostrarMensagem("Removido com sucesso", "Lançamento");
    } catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "Lançamento");
    }
  }

  async confirmarPagamentoLancamento(id: number) {
    try {
      let lancamento = new Lancamento();
      lancamento.id = id;

      await this.custoService.confirmarPagamentoLancamento(lancamento);

      this.obterLancamentos();

      this.mostrarMensagem("Confirmado pagamento com sucesso", "Lançamento");
    } catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "Lançamento");
    }
  }

  mudarPagina(e: any) {
    this.paginacao.pagina = e.pageIndex == 0 ? 1 : e.pageIndex;
    this.paginacao.limite = e.pageSize;
    this.obterLancamentos();
  }

  mudarAno(ano) { }

  montarAnos() {

    let ano = new Date().getFullYear() + 1;
    let margemDeTempo = 10;

    for (let i = 0; i < margemDeTempo; i++) {
      ano -= 1;
      this.anos.push({ nome: ano, valor: ano });
    }
  }

  definirIcones() {
    let lista =
      [{ nome: 'done-24px', caminho: 'assets/img/done-24px.svg', },
      { nome: 'trending_down-24px', caminho: 'assets/img/trending_down-24px.svg' },
      { nome: 'trending_up-24px', caminho: 'assets/img/trending_up-24px.svg' }];

    for (let i = 0; i < lista.length; i++) {
      this.iconRegistry.addSvgIcon(lista[i].nome, this.sanitizer.bypassSecurityTrustResourceUrl(lista[i].caminho));
    }
  }

  abrirLancamentoDialog(): void {
    const dialogRef = this.dialog.open(LancamentoComponent, {
      width: '550px',
      height: '530px',
      data: new Lancamento()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obterLancamentos();
      this.obterCronogramas();
    });
  }

  abrirReciboDialog(id: number): void {
    this.dialog.open(ReciboComponent, {
      width: '550px',
      height: '720px',
      data: id
    });
  }

  mostrarMensagem(mensagem: string, action: string) {
    this._snackBar.open(mensagem, action, {
      duration: 2000,
    });
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceLancamento.filter = filterValue.trim().toLowerCase();
  }
}





