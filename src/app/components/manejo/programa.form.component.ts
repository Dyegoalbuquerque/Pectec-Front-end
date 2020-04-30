import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManejoService, EstoqueService, CategoriaService } from 'src/app/services';
import { ProgramaItem, UnidadeMedida, Situacao, Subcategoria } from 'src/app/models';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { plainToClass } from "class-transformer";

@Component({
  selector: 'programa-component',
  templateUrl: './programa.form.component.html',
  styleUrls: ['./programa.form.component.css']
})

export class ProgramaFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProgramaFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private manejoService: ManejoService, private categoriaService: CategoriaService, 
              private notifications: NotificationsService) {
  }

  unidadeMedidas: UnidadeMedida[];
  programaItem: ProgramaItem;
  objetivos: Subcategoria[];
  situacao: Situacao;
  intervaloDia: any;
  objetivoPrograma: any;

  objetivosPrograma = [{nome: "Consumo", valor: "C" }, {nome: "Procedimento", valor: "P"}];
  intervalosDias = [{nome: "Um dia", valor: "UD" }, {nome: "Intervalo de dias", valor: "MUD"}];

  ngOnInit() {
    this.programaItem = this.data.programaItem;
    this.intervaloDia = { valor: this.programaItem.eIntervalo() ? "MUD" : "UD" };
    this.objetivoPrograma = { valor: this.programaItem.eDoTipoConsumo() ? "C" : "P"};
    this.situacao = this.data.situacao;
    this.obterUnidadeMedidas();
    this.obterObjetivos();
    this.obterProcedimentos();
  }

  obterObjetivos() {
    this.categoriaService.obterTodasSubcategorias().subscribe(data => {
      this.objetivos = data;
    });
  }

  obterProcedimentos() {
  }

  obterUnidadeMedidas() {
    this.categoriaService.obterUnidadeMedidas().subscribe(data => {
      this.unidadeMedidas = plainToClass(UnidadeMedida, data.sort(Situacao.ordenar));
    });
  }

  validar(item: ProgramaItem): boolean {
    return item.programaId && item.objetivoId && (item.inicio || (item.inicio && item.fim)) && 
           ((this.objetivoPrograma.valor == 'C' && item.quantidade && item.unidadeMedida != '') || 
            (this.objetivoPrograma.valor == 'P'));
  }
 
  salvar(): void {
    if (this.validar(this.programaItem)) {

      if (this.programaItem.id > 0) {
        this.manejoService.atualizarProgramaItem(this.programaItem).subscribe(data => {
          this.programaItem = data;
          this.mostrarMensagem("Salvo com sucesso", "Programa", NotificationType.Success);
          this.fechar();
        }, err => {
          this.fechar();
          this.mostrarMensagem("Ocorreu um problema", "Programa", NotificationType.Error);
        });
      } else {
        this.manejoService.salvarProgramaItem(this.programaItem).subscribe(data => {
          this.programaItem = data;
          this.mostrarMensagem("Salvo com sucesso", "Programa", NotificationType.Success);
          this.fechar();
        }, err => {
          this.fechar();
          this.mostrarMensagem("Ocorreu um problema", "Programa", NotificationType.Error);
        });
      }

    } else {
      this.mostrarMensagem("Preencha os campos obrigatórios", "Programa", NotificationType.Alert);
    }
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