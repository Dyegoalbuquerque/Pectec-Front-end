
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstoqueService, ConfiguracaoService } from 'src/app/services';
import { UnidadeMedida } from 'src/app/models/unidadeMedida';
import { Estoque } from 'src/app/models/estoque';
import { Categoria, Subcategoria } from 'src/app/models';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'estoque-form-dialog',
  templateUrl: 'estoque.form.component.html',
  styleUrls: ['./estoque.form.component.css']
})
export class EstoqueFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EstoqueFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Estoque, private _snackBar: MatSnackBar,
    private estoqueService: EstoqueService,
    private categoriaService: ConfiguracaoService) { }

  estoque: Estoque;
  categoriaSelecionada: Categoria;
  categorias: Categoria[];
  subcategorias: Subcategoria[];
  unidadeMedidas: UnidadeMedida[];

  ngOnInit() {
    this.categoriaSelecionada = new Categoria();
    this.estoque = this.data;
    this.estoque.comprado = true;
    this.obterCategorias();
    this.obterUnidadeMedidas();
  }

  async salvar() {

    if (this.estoque.eValido()) {
      try {

        this.estoque = await this.estoqueService.salvarEstoque(this.estoque);

        this.mostrarMensagem("Salvo com sucesso", "Estoque");
        this.fechar();
      } catch (e) {
        console.error(e);
        this.mostrarMensagem("Ocorreu um problema", "Estoque");
      }
    } else {
      this.mostrarMensagem("Preencha os campos obrigatórios", "Estoque");
    }
  }

  async obterCategorias() {
    try {
      this.categorias = await this.categoriaService.obterCategorias();
    } catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "Estoque");
    }
  }

  async obterSubcategorias(codigo: string) {
    try {
      this.subcategorias = await this.categoriaService.obterSubcategorias(codigo);
    } catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "Estoque");
    }
  }

  async obterUnidadeMedidas() {
    try {
      this.unidadeMedidas = await this.categoriaService.obterUnidadeMedidas();
    } catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "Estoque");
    }
  }

  async mudarCategoriaDoEstoque(codigo: string) {
    await this.obterSubcategorias(codigo);
  }

  fechar(): void {
    this.dialogRef.close();
  }

  mostrarMensagem(mensagem: string, action: string) {
    this._snackBar.open(mensagem, action, {
      duration: 2000,
    });
  }
}