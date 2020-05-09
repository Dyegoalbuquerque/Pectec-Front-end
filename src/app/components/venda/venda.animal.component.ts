
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Venda, Estoque } from 'src/app/models';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VendaService, EstoqueService } from 'src/app/services';
import { plainToClass } from "class-transformer";
import { VendaItem } from 'src/app/models/vendaItem';


@Component({
  templateUrl: './venda.animal.component.html',
  styleUrls: ['./venda.animal.component.css']
})
export class VendaAnimalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VendaAnimalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Venda, private vendaService: VendaService,
    private estoqueService: EstoqueService, private notifications: NotificationsService) { }

  venda: Venda;
  estoques: Estoque[];
  loteSelecionado: number;
  quantidade: number;
  valor: number;
  limiteDeQuantidade: string = '';

  ngOnInit() {
    this.venda = this.data;
    this.obterAnimais(this.venda);
  }

  obterAnimais(venda: Venda) {
   
  }

  salvar(): void {
    if (this.validar(this.venda)) {

      let item = new VendaItem();
      item.origemId = this.loteSelecionado;
      item.quantidade = this.quantidade;

      this.venda.itens = [item];

      this.vendaService.salvarVendaRacao(this.venda).subscribe(data => {
        this.venda = data;
        this.mostrarMensagem("Salvo com sucesso", "Venda", NotificationType.Success);
        this.fechar();
      },
        err => {
          this.mostrarMensagem("Ocorreu um problema", "Venda", NotificationType.Error);
        });
    } else {
      this.mostrarMensagem("Preencha os campos obrigatórios", "Venda", NotificationType.Warn);
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }

  mudarLote(origemId: number) {
    let estoque = this.estoques.filter(x => x.id == origemId)[0];
    this.limiteDeQuantidade = `${estoque.quantidadeEntradaReal} ${estoque.unidadeMedida}`;
  }

  validar(item: Venda): boolean {
    return item.data != '' && this.quantidade && this.valor &&
      this.loteSelecionado > 0;
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
