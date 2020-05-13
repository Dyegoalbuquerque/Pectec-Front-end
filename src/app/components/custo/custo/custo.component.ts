
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Lancamento } from 'src/app/models';
import { CustoService } from '../../../services';
import { LancamentoComponent, ReciboComponent, CustoComportamento } from '..';
import { IgxTreeGridComponent } from "igniteui-angular";
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { plainToClass } from "class-transformer";


@Component({
  templateUrl: './custo.component.html',
  styleUrls: ['./custo.component.css']
})
export class CustoComponent implements OnInit {

  constructor(private custoService: CustoService, public dialog: MatDialog,
              private _snackBar: MatSnackBar, private iconRegistry: MatIconRegistry, 
              private sanitizer: DomSanitizer, private custoComportamento: CustoComportamento) {
    this.definirIcones();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("gridCronograma", { read: IgxTreeGridComponent, static: true }) gridCronograma: IgxTreeGridComponent;

  cronogramas: Lancamento[];
  totalSaida = 0;
  totalEntrada = 0;
  totalSaldo = 0;
  anos = [];
  ano = 2019;

  colunasLancamentos: string[] = ['n', 'mes', 'vencimento', 'categoria', 'descricao', 'status', 'valor', 'tipo', 'remover', 'recibo'];
  dataSourceLancamento: MatTableDataSource<Lancamento>;

  ngOnInit() {
    this.dataSourceLancamento = new MatTableDataSource<Lancamento>([]);
    this.obterLancamentos();
    this.obterCronogramas();
    this.montarAnos();
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

  obterLancamentos() {
    this.custoService.obterLancamentoPorAno(this.ano).subscribe(data => {
      this.totalSaida = 0;
      this.totalEntrada = 0;
      this.totalSaldo = 0;
      this.dataSourceLancamento = new MatTableDataSource<Lancamento>(data);
      this.dataSourceLancamento.paginator = this.paginator;
      this.dataSourceLancamento.data = plainToClass(Lancamento, this.dataSourceLancamento.data.sort(Lancamento.ordenarPorVencimentoDecrecente));
      this.totalSaida = this.custoComportamento.calcularTotalSaida(this.dataSourceLancamento.data);
      this.totalEntrada = this.custoComportamento.calcularTotalEntrada(this.dataSourceLancamento.data);
      this.totalSaldo = this.custoComportamento.calcularTotalSaldo(this.dataSourceLancamento.data);
    });
  }

  obterCronogramas() {
    this.custoService.obterCronogramasPorAno(this.ano).subscribe(data => {
      this.cronogramas = this.custoComportamento.construirCronograma(data);
    });
  }

  removerLancamento(id: number) {

    this.custoService.removerLancamento(id).subscribe(data => {
      this.obterLancamentos();
      this.obterCronogramas();

      this.mostrarMensagem("Removido com sucesso", "Lançamento");
    });
  }

  confirmarPagamentoLancamento(id: number) {
    let lancamento = new Lancamento();
    lancamento.id = id;

    this.custoService.confirmarPagamentoLancamento(lancamento).subscribe(data => {
      this.obterLancamentos();

      this.mostrarMensagem("Confirmado pagamento com sucesso", "Lançamento");
    });
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





