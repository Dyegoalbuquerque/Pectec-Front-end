import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManejoService, ConfiguracaoService } from 'src/app/services';
import { ProgramaItem, UnidadeMedida, Situacao, Subcategoria } from 'src/app/models';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'programa-component',
  templateUrl: './programa.form.component.html',
  styleUrls: ['./programa.form.component.css']
})

export class ProgramaFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProgramaFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private manejoService: ManejoService, private categoriaService: ConfiguracaoService,
    private notifications: NotificationsService) {

    this.programaItem = this.data.programaItem;
    this.intervaloDia = { valor: this.programaItem.eIntervalo() ? "MUD" : "UD" };
    this.objetivoPrograma = { valor: this.programaItem.eDoTipoConsumo() ? "C" : "P" };
    this.situacao = this.data.situacao;
    this.objetivosPrograma = [{ nome: "Consumo", valor: "C" }, { nome: "Procedimento", valor: "P" }];
    this.intervalosDias = [{ nome: "Um dia", valor: "UD" }, { nome: "Intervalo de dias", valor: "MUD" }];
  }

  unidadeMedidas: UnidadeMedida[];
  programaItem: ProgramaItem;
  objetivos: Subcategoria[];
  situacao: Situacao;
  intervaloDia: any;
  objetivoPrograma: any;
  objetivosPrograma: any;
  intervalosDias: any;

  ngOnInit() {
    this.obterUnidadeMedidas();
    this.obterObjetivos();
    this.obterProcedimentos();
  }

  async obterObjetivos() {
    try {
      this.objetivos = await this.categoriaService.obterSubcategorias();
    } catch (e) {
      console.error(e);
    }
  }

  async obterProcedimentos() { }

  async obterUnidadeMedidas() {
    try {
      this.unidadeMedidas = await this.categoriaService.obterUnidadeMedidas();
    } catch (e) {
      console.error(e);
    }
  }

  async salvar() {

    try {
      if (this.validar(this.programaItem)) {

        if (this.programaItem.id > 0) {
          this.programaItem = await this.manejoService.atualizarProgramaItem(this.programaItem);
          this.mostrarMensagem("Salvo com sucesso", "Programa", NotificationType.Success);
          this.fechar();

        } else {
          this.programaItem = await this.manejoService.salvarProgramaItem(this.programaItem)
          this.mostrarMensagem("Salvo com sucesso", "Programa", NotificationType.Success);
          this.fechar();
        }
      } else {
        this.mostrarMensagem("Preencha os campos obrigatórios", "Programa", NotificationType.Alert);
      }

    } catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "Programa", NotificationType.Error);
    }
  }
  
  validar(item: ProgramaItem): boolean {
    return item.programaId && item.objetivoId && (item.inicio || (item.inicio && item.fim)) &&
      ((this.objetivoPrograma.valor == 'C' && item.quantidade && item.unidadeMedida != '') ||
        (this.objetivoPrograma.valor == 'P'));
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
      clickToClose: true
    };

    this.notifications.create(config.title, config.content, config.type, config);
  }
}