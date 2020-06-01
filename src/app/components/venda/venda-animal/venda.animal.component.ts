
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Venda, VendaItem } from 'src/app/models';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { VendaService, ManejoService } from 'src/app/services';


@Component({
  templateUrl: './venda.animal.component.html',
  styleUrls: ['./venda.animal.component.css']
})
export class VendaAnimalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VendaAnimalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Venda, private vendaService: VendaService,
    private manejoService: ManejoService, private notifications: NotificationsService) { }

  venda: Venda;
  vendaItem: VendaItem;
  lotes: any[];
  limiteDeQuantidade: string = '';

  async ngOnInit() {
    this.venda = this.data;
    this.vendaItem = new VendaItem('A');
    await this.obterLotes("L");
  }

  async obterLotes(tipo: string) {
    try {
      this.lotes = await this.manejoService.obterLotesVenda(tipo);
    } catch (error) {
      console.error(error);
      this.mostrarMensagem("Ocorreu um problema", "Venda", NotificationType.Error);
    }
  }

  async salvar() {

    try {
      this.venda.itens = [this.vendaItem];

      if (this.venda.eValido()) {
        this.venda = await this.vendaService.salvarVendaAnimal(this.venda);
        this.mostrarMensagem("Salvo com sucesso", "Venda", NotificationType.Success);
        this.fechar();
      } else {
        this.mostrarMensagem("Preencha os campos obrigatórios", "Venda", NotificationType.Warn);
      }
    } catch (error) {
      console.error(error);
      this.mostrarMensagem("Ocorreu um problema", "Venda", NotificationType.Error);
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }

  mudarLote(origemId: number) {
    let lote = this.lotes.filter(x => x.id == origemId)[0];
    this.limiteDeQuantidade = `${lote.dias} dias - ${lote.quantidade} animais`;
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
