
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManejoService } from '../../../services';
import { AnimalComportamento } from '..';
import { CicloReproducao } from 'src/app/models/cicloReproducao';
import { Tag, Animal } from 'src/app/models';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { CicloCrescimento } from 'src/app/models/cicloCrescimento';
import { RelatorioUCPdf } from '../../relatorioUCPdf';


@Component({
  templateUrl: './uc.component.html',
  styleUrls: ['./uc.component.css']
})
export class UCComponent implements OnInit {

  constructor(private manejoService: ManejoService, public dialog: MatDialog,
    private notifications: NotificationsService, private spinner: NgxSpinnerService) {
    this.animalComportamento = new AnimalComportamento([]);
    this.ciclos = [];
    this.tagSelecionada = new Tag('');
  }

  animalComportamento: AnimalComportamento;
  ciclos: CicloCrescimento[];
  filhotes: Animal[];
  ciclosRepdorucao: CicloReproducao[];
  tagSelecionada: Tag;

  panelOpenState = false;

  ngOnInit() {
    this.obterCiclosCrescimento();
  }

  async obterCiclosCrescimento() {
    try {
      this.ciclos = await this.manejoService.obterCiclosCrescimento();
    } catch (e) {
      console.error(e);
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


