
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { EstoqueService, ConfiguracaoService } from 'src/app/services';
import { Estoque, Consumo, Categoria } from 'src/app/models';
import { plainToClass } from "class-transformer";

@Component({
  selector: 'consumo-form-dialog',
  templateUrl: 'consumo.form.component.html',
  styleUrls: ['./consumo.form.component.css']
})
export class ConsumoFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConsumoFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Consumo, private notifications: NotificationsService,
              private estoqueService: EstoqueService, private categoriaService: ConfiguracaoService) { }

  consumo: Consumo;
  origens: Estoque[];
  destinos: Categoria[];
  limiteDeQuantidade: string = '';

  ngOnInit() {
    this.consumo = this.data;
    this.obterOrigens(this.consumo);
    this.carregarCategorias();
  }

  mudarCategoriaConsumo(consumo: Consumo) {
    this.obterOrigens(consumo);
  }

  mudarOrigemConsumo(origemId: number) {
    let origem = this.origens.filter(x => x.id == origemId)[0];
    this.limiteDeQuantidade = `${origem.quantidadeEntradaReal} ${origem.unidadeMedida}`;
  }

  obterOrigens(consumo: Consumo) {

    if (consumo.id) {
      this.origens = [consumo.origem];

    } else if (consumo.categoriaId) {

      let categoria = this.destinos.filter(e => e.id == consumo.categoriaId)[0];

      this.estoqueService.obterOrigens(categoria.id).subscribe(data => {
        this.origens = plainToClass(Estoque, data);
      });
    }
  }

  carregarCategorias() {
    this.destinos = new Array<Categoria>();

    this.destinos.push(new Categoria(1, "I", "Insumo"));
    this.destinos.push(new Categoria(2, "R", "Ração"));
    this.destinos.push(new Categoria(3, "M", "Medicamento"));
  }

  salvar(): void {
    if (this.validar(this.consumo)) {
      if (this.consumo.id > 0) {

        this.estoqueService.atualizarConsumo(this.consumo).subscribe(data => {
          this.consumo = data;
          this.mostrarMensagem("Salvo com sucesso", "Consumo", NotificationType.Success);
          this.fechar();
        },
          err => {
            this.mostrarMensagem("Ocorreu um problema", "Consumo", NotificationType.Error);
          });

      } else {
        this.estoqueService.salvarConsumo(this.consumo).subscribe(data => {
          this.consumo = data;
          this.mostrarMensagem("Salvo com sucesso", "Consumo", NotificationType.Success);
          this.fechar();
        },
          err => {
            this.mostrarMensagem("Ocorreu um problema", "Consumo", NotificationType.Error);
          });
      }
    } else {
      this.mostrarMensagem("Preencha os campos obrigatórios", "Consumo", NotificationType.Warn);
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }

  validar(item: Consumo): boolean {
    return item.quantidade > 0 && item.data != '' && item.categoriaId > 0 &&
           item.origemId > 0 && (item.tipo != '');
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