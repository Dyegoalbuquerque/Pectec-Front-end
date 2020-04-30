
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Venda, UnidadeMedida, Estoque, Categoria } from 'src/app/models';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { VendaService } from 'src/app/services/venda.service';


@Component({
  templateUrl: './venda.form.component.html',
  styleUrls: ['./venda.form.component.css']
})
export class VendaFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VendaFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Venda, private vendaService: VendaService,
              private notifications: NotificationsService) { }

  venda: Venda;
  unidadeMedidas: UnidadeMedida[];
  origens: Estoque[];
  destinos: Categoria[];
  limiteDeQuantidade: string = '';

  ngOnInit() {

    this.venda = this.data;
    this.obterUnidadeMedidas();
    this.obterOrigens(this.venda);
  }

  obterUnidadeMedidas() {
    // this.vendaService.obterUnidadeMedidas().subscribe(data => {
    //   this.unidadeMedidas = plainToClass(UnidadeMedida, data);
    // });
  }

  obterOrigens(evento: Venda) {

    // if (evento.id) {
    //   this.origens = [evento.origem];

    // } else if (evento.categoriaId) {

    //   let categoria = this.destinos.filter(e => e.id == evento.categoriaId)[0];

    //   this.estoqueService.obterOrigens(categoria.id).subscribe(data => {
    //     this.origens = plainToClass(Estoque, data);
    //   });
    // }
  }


  // salvar(): void {
  //   if (this.validar(this.venda)) {

  //     this.vendaService.salvarVenda(this.venda).subscribe(data => {
  //       this.venda = data;
  //       this.mostrarMensagem("Salvo com sucesso", "Venda", NotificationType.Success);
  //       this.fechar();
  //     },
  //       err => {
  //         this.mostrarMensagem("Ocorreu um problema", "Venda", NotificationType.Error);
  //       });
  //   }

  // }

  // fechar(): void {
  //   this.dialogRef.close();
  // }

  // validar(item: Venda): boolean {
  //   return item.quantidade > 0 && item.data != '' && item.categoriaId > 0 &&
  //     item.origemId > 0;
  // }

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


