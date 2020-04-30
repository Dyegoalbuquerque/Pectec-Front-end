
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Lancamento } from 'src/app/models';
import { CustoService } from '../../services';
import { LancamentoComponent, ReciboComponent } from '../custo';
import { IgxTreeGridComponent } from "igniteui-angular";
import { DataHelper } from 'src/app/dataHelper';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  templateUrl: './custo.component.html',
  styleUrls: ['./custo.component.css']
})
export class CustoComponent implements OnInit {

  constructor(private custoService: CustoService, public dialog: MatDialog,
    private _snackBar: MatSnackBar, private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.definirIcones();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("treegrid", { read: IgxTreeGridComponent, static: true }) treegrid: IgxTreeGridComponent;

  cronogramas: Lancamento[];
  totalLancamentos = 0;

  colunasLancamentos: string[] = ['n', 'mes', 'vencimento', 'categoria', 'descricao', 'status', 'valor', 'tipo', 'remover', 'recibo'];
  dataSourceLancamento: MatTableDataSource<Lancamento>;

  anos = [];
  ano;

  ngOnInit() {
    this.ano = 2019;
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
    let lista = [{ nome: 'done-24px', caminho: 'assets/img/done-24px.svg', },
    { nome: 'trending_down-24px', caminho: 'assets/img/trending_down-24px.svg' },
    { nome: 'trending_up-24px', caminho: 'assets/img/trending_up-24px.svg' }];
    for (let i = 0; i < lista.length; i++) {
      this.iconRegistry.addSvgIcon(lista[i].nome, this.sanitizer.bypassSecurityTrustResourceUrl(lista[i].caminho));
    }
  }

  obterLancamentos() {
    this.custoService.obterLancamentoPorAno(this.ano).subscribe(data => {
      this.dataSourceLancamento = new MatTableDataSource<Lancamento>(data);
      this.dataSourceLancamento.paginator = this.paginator;
      this.dataSourceLancamento.data = this.dataSourceLancamento.data.sort(Lancamento.ordenarPorVencimentoDecrecente)
    });
  }

  obterCronogramas() {
    this.custoService.obterCronogramasPorAno(this.ano).subscribe(data => {

      let itens = [];
      this.totalLancamentos = 0;

      data = data.map(o => ({ ...o, cronogramaId: o.mes }));

      for (let i = 0; i < 12; i++) {

        let lancamentos = data.filter(x => x.mes == DataHelper.obterNomeMes(i));

        if (lancamentos.length > 0) {
          let total = 0;
          lancamentos.forEach(x => {
            total += x.valor;
            if (x.status == 'PG') {
              this.totalLancamentos += x.valor;
            }
          });

          let dataParamentro = new Date(lancamentos[0].vencimento);
          dataParamentro = new Date(new Date(lancamentos[0].vencimento).getFullYear(), dataParamentro.getMonth(), 1)

          let cabecalho = { id: DataHelper.obterNomeMes(i), descricao: "", valor: total, vencimento: dataParamentro, tipo: "" };

          itens.push(cabecalho);
          itens = itens.concat(lancamentos);
        }
      }
      this.cronogramas = itens.sort(Lancamento.ordenarPorVencimentoCrescente);
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

  openLancamentoDialog(): void {
    const dialogRef = this.dialog.open(LancamentoComponent, {
      width: '470px',
      height: '550px',
      data: new Lancamento()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obterLancamentos();
      this.obterCronogramas();
    });
  }

  openReciboDialog(id: number): void {
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

  obterValorTotal() {
    return this.dataSourceLancamento.data.map(t => t.valor).reduce((acc, valor) => acc + valor, 0);
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceLancamento.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceLancamento.paginator) {
      this.dataSourceLancamento.paginator.firstPage();
    }
  }
}





