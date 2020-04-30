
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstoqueService, CategoriaService } from 'src/app/services';
import { UnidadeMedida } from 'src/app/models/unidadeMedida';
import { Estoque } from 'src/app/models/estoque';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Categoria, Subcategoria } from 'src/app/models';

@Component({
  selector: 'estoque-form-dialog',
  templateUrl: 'estoque.form.component.html',
  styleUrls: ['./estoque.form.component.css']
})
export class EstoqueFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EstoqueFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Estoque, private _snackBar: MatSnackBar,
    private notifications: NotificationsService, private estoqueService: EstoqueService,
    private categoriaService: CategoriaService) { }

  estoque: Estoque;
  categoriaSelecionada: Categoria;
  categorias: Categoria[];
  subcategorias: Subcategoria[];
  unidadeMedidas: UnidadeMedida[];

  ngOnInit() {
    this.categoriaSelecionada = new Categoria();
    this.estoque = this.data;
    this.obterCategorias();
    this.obterUnidadeMedidas();
  } 

  salvar(): void {
    if (this.validar(this.estoque)) {

      this.estoqueService.salvarEstoque(this.estoque).subscribe(data => {
        this.estoque = data;
        this.mostrarMensagemSucesso("Salvo com sucesso", "Estoque", NotificationType.Success);
        this.fechar();
      },
        err => {
          this.mostrarMensagem("Ocorreu um problema", "Estoque");
        });
    } else {
      this.mostrarMensagem("Preencha os campos obrigatórios", "Estoque");
    }
  }

  obterCategorias() {
    this.categoriaService.obterCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  obterSubcategorias(codigo: string) {
    this.categoriaService.obterSubcategorias(codigo).subscribe(data => {
      this.subcategorias = data;
    });
  }

  obterUnidadeMedidas() {
    this.categoriaService.obterUnidadeMedidas().subscribe(data => {
      this.unidadeMedidas = data;
    });
  }

  mudarCategoriaDoEstoque(codigo: string) {
    this.obterSubcategorias(codigo);
  }

  validar(item: Estoque): boolean {

    return item.quantidadeEmbalagem > 0 && item.descricao && item.quantidade > 0 &&
      item.subcategoriaId > 0 && item.unidadeMedida && item.valorEmbalagem > 0 &&
      item.dataEntrada != '';
  }

  fechar(): void {
    this.dialogRef.close();
  }

  mostrarMensagemSucesso(mensagem: string, action: string, tipo: NotificationType) {

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

  mostrarMensagem(mensagem: string, action: string) {
    this._snackBar.open(mensagem, action, {
      duration: 2000,
    });
  }
}