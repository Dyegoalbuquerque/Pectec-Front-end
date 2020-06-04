
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
    nome: "Pago",
    valor: "PG"
  }, {
    nome: "A vencer",
    valor: "V"
  }, {
    nome: "Previsão",
    valor: "P"
  }];

  ngOnInit() {
    this.categoriaSelecionada = new Categoria();
    this.categorias = [];
    this.data.tipo = this.data.tipo == undefined ? "S" : this.data.tipo;
    this.data.status = this.data.status == undefined ? "PG" : this.data.tipo;
    this.lancamento = this.data;
    this.snackbarHelper = new SnackbarHelper();
    this.obterCategorias();
  }

  async obterCategorias() {
    try {
      this.categorias = await this.categoriaService.obterCategorias();
    } catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "Lançamento");
    }
  }

  async obterSubcategorias(codigo: string) {
    try {
      this.subcategorias = await this.categoriaService.obterSubcategorias(codigo);
    } catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "Lançamento");
    }
  }

  async mudarCategoriaDoLancamento(codigo: string) {
    await this.obterSubcategorias(codigo);
  }

  async salvar() {
    if (this.lancamento.eValido()) {

      try {
        await this.custoService.salvarLancamento(this.lancamento);
        this.mostrarMensagem("Salvo com sucesso", "Lançamento");
        this.fechar();
      } catch (e) {
        console.error(e);
        this.mostrarMensagem("Ocorreu um problema", "Lançamento");
      }
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