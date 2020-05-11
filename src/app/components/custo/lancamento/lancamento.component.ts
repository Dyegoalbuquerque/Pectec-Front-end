
import { Component, ViewEncapsulation, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustoService, ConfiguracaoService } from '../../../services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria, Lancamento, Subcategoria } from 'src/app/models';
import { SnackbarHelper } from '../../snackbarHelper';
import { plainToClass } from "class-transformer";

@Component({
  selector: 'lancamento-dialog',
  templateUrl: 'lancamento.component.html',
  styleUrls: ['./lancamento.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LancamentoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LancamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Lancamento, private _snackBar: MatSnackBar,
    private custoService: CustoService, private categoriaService: ConfiguracaoService) { }

  lancamento: Lancamento;
  categorias: Categoria[];
  categoriaSelecionada: Categoria;
  subcategorias: Subcategoria[];
  snackbarHelper: SnackbarHelper;

  tipos = [{
    nome: "Saída",
    valor: "S"
  }, {
    nome: "Entrada",
    valor: "E"
  }];

  statusLista = [{
    nome: "A vencer",
    valor: "V"
  }, {
    nome: "Pago",
    valor: "PG"
  }, {
    nome: "Previsão",
    valor: "P"
  }];

  ngOnInit() {
    this.categoriaSelecionada = new Categoria();
    this.categorias = [];
    this.data.tipo = this.data.tipo == undefined ? "S" : this.data.tipo;
    this.data.status = this.data.status == undefined ? "V" : this.data.tipo;
    this.lancamento = this.data;
    this.snackbarHelper = new SnackbarHelper();
    this.obterCategorias();
  }

  obterCategorias() {
    this.categoriaService.obterCategorias().subscribe(data => {
      this.categorias = plainToClass(Categoria, data);
    });
  }

  obterSubcategorias(codigo: string) {
    this.categoriaService.obterSubcategorias(codigo).subscribe(data => {
      this.subcategorias = plainToClass(Subcategoria, data);
    });
  }

  mudarCategoriaDoLancamento(codigo: string) {
    this.obterSubcategorias(codigo);
  }

  salvar(): void {
    if (this.lancamento.eValido()) {

      this.custoService.salvarLancamento(this.lancamento).subscribe(data => {
        this.lancamento = plainToClass(Lancamento, data);
        this.mostrarMensagem("Salvo com sucesso", "Lançamento");
        this.fechar();
      },
        err => {
          this.mostrarMensagem("Ocorreu um problema", "Lançamento");
        });
    } else {
      this.mostrarMensagem("Preencha os campos obrigatórios", "Lançamento");
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }

  mostrarMensagem(mensagem: string, action: string) {
    this._snackBar.open(mensagem, action, this.snackbarHelper.criarConfigSuccess(2000));
  }
}