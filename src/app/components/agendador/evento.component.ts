
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { EstoqueService, EventoService, ConfiguracaoService } from 'src/app/services';
import { Estoque, Evento, Categoria, UnidadeMedida } from 'src/app/models';
import { plainToClass } from "class-transformer";

@Component({
  selector: 'evento-dialog',
  templateUrl: 'evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EventoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Evento, private notifications: NotificationsService,
    private estoqueService: EstoqueService, private agendadorService: EventoService,
    private categoriaService: ConfiguracaoService) { }

  evento: Evento;
  unidadeMedidas: UnidadeMedida[];
  origens: Estoque[];
  destinos: Categoria[];
  limiteDeQuantidade: string = '';

  ngOnInit() {
    this.evento = this.data;
    this.evento.tipo = "C";
    this.obterUnidadeMedidas();
    this.obterOrigens(this.evento);
    this.carregarCategorias();
  }

  mudarCategoriaEvento(evento: Evento) {
    this.obterOrigens(evento);
  }

  mudarOrigemEvento(origemId: number) {
    let origem = this.origens.filter(x => x.id == origemId)[0];
    this.limiteDeQuantidade = `${origem.quantidadeEntradaReal} ${origem.unidadeMedida}`;
  }

  obterUnidadeMedidas() {
    this.categoriaService.obterUnidadeMedidas().subscribe(data => {
      this.unidadeMedidas = plainToClass(UnidadeMedida, data);
    });
  }

  obterOrigens(evento: Evento) {

    if (evento.id) {
      this.origens = [evento.origem];

    } else if (evento.categoriaId) {

      let categoria = this.destinos.filter(e => e.id == evento.categoriaId)[0];

      this.estoqueService.obterOrigens(categoria.id).subscribe(data => {
        this.origens = plainToClass(Estoque, data);
      });
    }
  }

  carregarCategorias() {
    this.destinos = new Array<Categoria>();

    this.destinos.push(new Categoria(1, "I", "Insumo"));
    this.destinos.push(new Categoria(2, "R", "Ração"));
    this.destinos.push(new Categoria(3, "A", "Animal"));
  }

  salvar(): void {
    if (this.validar(this.evento)) {
      if (this.evento.id > 0) {

        this.agendadorService.atualizarEvento(this.evento).subscribe(data => {
          this.evento = data;
          this.mostrarMensagem("Salvo com sucesso", "Evento", NotificationType.Success);
          this.fechar();
        },
          err => {
            this.mostrarMensagem("Ocorreu um problema", "Evento", NotificationType.Error);
          });

      } else {
        this.agendadorService.salvarEvento(this.evento).subscribe(data => {
          this.evento = data;
          this.mostrarMensagem("Salvo com sucesso", "Evento", NotificationType.Success);
          this.fechar();
        },
          err => {
            this.mostrarMensagem("Ocorreu um problema", "Evento", NotificationType.Error);
          });
      }
    } else {
      this.mostrarMensagem("Preencha os campos obrigatórios", "Evento", NotificationType.Warn);
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }

  validar(item: Evento): boolean {
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