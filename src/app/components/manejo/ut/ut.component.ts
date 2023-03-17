
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManejoService } from '../../../services';
import { AnimalComportamento } from '..';
import { CicloReproducao } from 'src/app/models/cicloReproducao';
import { Tag, Animal } from 'src/app/models';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import {CicloTerminacaoComponent} from '../ciclo-terminacao/cicloTerminacao.component';
import { CicloTerminacao } from 'src/app/models/cicloTerminacao';
import { RelatorioUCPdf } from '../../relatorioUCPdf';


@Component({
  templateUrl: './ut.component.html',
  styleUrls: ['./ut.component.css']
})
export class UTComponent implements OnInit {

  constructor(private manejoService: ManejoService, public dialog: MatDialog,
    private notifications: NotificationsService, private spinner: NgxSpinnerService) {
    this.animalComportamento = new AnimalComportamento([]);
    this.ciclos = [];
    this.tagSelecionada = new Tag('');
  }

  animalComportamento: AnimalComportamento;
  ciclos: CicloTerminacao[];
  filhotes: Animal[];
  ciclosRepdorucao: CicloReproducao[];
  tagSelecionada: Tag;

  panelOpenState = false;

  ngOnInit() {
    this.obterCiclosTerminacao();
  }

  async obterCiclosTerminacao() {
    try {
      this.ciclos = await this.manejoService.obterCiclosTerminacao();
    } catch (e) {
      console.error(e);
    }
  }

  async abrirCicloDialog(id: number) {

    let parametrosDialog = { width: '480px', height: '550px', data: new Animal() };

    if (id) {
      parametrosDialog.data = await this.manejoService.obterAnimalPorId(id);
      const dialogRef = this.dialog.open(CicloTerminacaoComponent, parametrosDialog);

      dialogRef.afterClosed().subscribe(result => {
        this.obterCiclosTerminacao();
      });
    } else {
      const dialogRef = this.dialog.open(CicloTerminacaoComponent, parametrosDialog);

      dialogRef.afterClosed().subscribe(result => {
        this.obterCiclosTerminacao();
      });
    }
  }

  async gerarRelatorioUC() {
    try {
      let dataInicio = "2020-01-01T03:00:00.000Z";
      let dataFinal = new Date().toString();

      let relatorioUC = await this.manejoService.obterRelatorioUC(dataInicio, dataFinal);
      let relatorioPdf = new RelatorioUCPdf();

      relatorioPdf.gerarRelatorioUC(relatorioUC);

    } catch (e) {
      console.error(e);
    }
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

  mostrarSpinner() {
    this.spinner.show(undefined, { fullScreen: true });
  }

  esconderSpinner() {
    this.spinner.hide();
  }
}


