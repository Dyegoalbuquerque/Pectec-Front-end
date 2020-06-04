
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { EstoqueService } from 'src/app/services';
import { Estoque, Consumo, Categoria } from 'src/app/models';

@Component({
  selector: 'consumo-form-dialog',
  templateUrl: 'consumo.form.component.html',
  styleUrls: ['./consumo.form.component.css']
})
export class ConsumoFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConsumoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Consumo, private notifications: NotificationsService,
    private estoqueService: EstoqueService) { }

  consumo: Consumo;
  origens: Estoque[];
  destinos: Categoria[];
  limiteDeQuantidade: string = '';

  ngOnInit() {
    this.consumo = this.data;
    this.obterOrigens(this.consumo);
    this.carregarCategorias();
  }

  async obterOrigens(consumo: Consumo) {

    if (consumo.id) {
      this.origens = [consumo.origem];

    } else if (consumo.categoriaId) {

      try {
        let categoria = this.destinos.filter(e => e.id == consumo.categoriaId)[0];
        this.origens = await this.estoqueService.obterOrigens(categoria.id);
      } catch (e) {
        console.error(e);
      }
    }
  }

  async salvar() {
    if (this.consumo.eValido()) {
      if (this.consumo.id > 0) {
        try {
          this.consumo = await this.estoqueService.atualizarConsumo(this.consumo);
          this.mostrarMensagem("Salvo com sucesso", "Consumo", NotificationType.Success);
          this.fechar();
        } catch (e) {
          console.error(e);
          this.mostrarMensagem("Ocorreu um problema", "Consumo", NotificationType.Error);
        }

      } else {

        try {
          this.consumo = await this.estoqueService.salvarConsumo(this.consumo);
          this.mostrarMensagem("Salvo com sucesso", "Consumo", NotificationType.Success);
          this.fechar();
        } catch (e) {
          console.error(e);
          this.mostrarMensagem("Ocorreu um problema", "Consumo", NotificationType.Error);
        }
      }
    } else {
      this.mostrarMensagem("Preencha os campos obrigatórios", "Consumo", NotificationType.Warn);
    }
  }

  mudarCategoriaConsumo(consumo: Consumo) {
    this.obterOrigens(consumo);
  }

  mudarOrigemConsumo(origemId: number) {
    let origem = this.origens.filter(x => x.id == origemId)[0];
    this.limiteDeQuantidade = origem.mostrarDescricaoQuantidadeReal();
  }

  carregarCategorias() {
    this.destinos = new Array<Categoria>();

    this.destinos.push(new Categoria(1, "I", "Insumo"));
    this.destinos.push(new Categoria(2, "R", "Ração"));
    this.destinos.push(new Categoria(3, "M", "Medicamento"));
  }

  fechar(): void {
    this.dialogRef.close();
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