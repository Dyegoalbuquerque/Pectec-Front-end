
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Venda, Estoque } from 'src/app/models';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { VendaService, EstoqueService } from 'src/app/services';
import { VendaItem } from 'src/app/models/vendaItem';


@Component({
  templateUrl: './venda.insumo.component.html',
  styleUrls: ['./venda.insumo.component.css']
})
export class VendaInsumoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VendaInsumoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Venda, private vendaService: VendaService,
    private estoqueService: EstoqueService, private notifications: NotificationsService) { }

  venda: Venda;
  estoques: Estoque[];
  insumoSelecionado: number;
  quantidade: number;
  valor: number;
  limiteDeQuantidade: string = '';
  itens: VendaItem[];

  ngOnInit() {
    this.venda = this.data;
    this.obterEstoque(this.venda);
  }

  async obterEstoque(venda: Venda) {
    try {
      this.estoques = await this.estoqueService.obterEstoqueRealPorCodigoCategoria("I");
    } catch (e) {
      console.error(e);
    }
  }

  async salvar() {

    if (this.validar(this.venda)) {

      let item = new VendaItem();
      item.origemId = this.insumoSelecionado;
      item.quantidade = this.quantidade;
      item.tipo = 'I';
      item.valor = this.valor;

      this.venda.itens = [item];
      this.venda.ano = new Date(this.venda.data).getUTCFullYear();

      this.venda = await this.vendaService.salvarVendaInsumo(this.venda);
      this.mostrarMensagem("Salvo com sucesso", "Venda", NotificationType.Success);
      this.fechar();
    } else {
      this.mostrarMensagem("Preencha os campos obrigatórios", "Venda", NotificationType.Warn);
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }

  mudarInsumo(origemId: number) {
    let estoque = this.estoques.filter(x => x.id == origemId)[0];
    this.limiteDeQuantidade = `${estoque.quantidadeEntradaReal} ${estoque.unidadeMedida}`;
  }

  validar(item: Venda): boolean {
    return item.data != '' && this.quantidade && this.valor &&
      this.insumoSelecionado > 0;
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
