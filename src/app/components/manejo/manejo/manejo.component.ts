
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManejoService } from '../../../services';
import {
  FichaComponent, AnimalComponent, CicloReproducaoComponent,
  ProgramaFormComponent, AnimalComportamento, CicloSimularFormComponent
} from '..';
import { CicloReproducao } from 'src/app/models/cicloReproducao';
import { Tag, Animal, Programa, ProgramaItem } from 'src/app/models';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { RelatorioUplPdf } from '../../relatorioUplPdf';


@Component({
  templateUrl: './manejo.component.html',
  styleUrls: ['./manejo.component.css']
})
export class ManejoComponent implements OnInit {

  constructor(private manejoService: ManejoService, public dialog: MatDialog,
    private notifications: NotificationsService, private spinner: NgxSpinnerService) {
    this.animalComportamento = new AnimalComportamento([]);
    this.femeas = [];
    this.situacaoSelecionada = new Tag();
  }

  animalComportamento: AnimalComportamento;
  femeas: Animal[];
  filhotes: Animal[];
  ciclosRepdorucao: CicloReproducao[];
  situacoes: Tag[];
  programa: Programa;
  programaItensSelecionados: ProgramaItem[];
  situacaoSelecionada: Tag;

  panelOpenState = false;

  ngOnInit() {
    this.obterFemeas();
    this.obterPrograma("AM");
    this.obterTagsQuantidade();
  }

  async obterPrograma(tipoPrograma: string) {
    try {
      this.programa = await this.manejoService.obterPrograma(tipoPrograma);
    } catch (e) {
      console.error(e);
    }
  }

  async obterProgramaItens(tagId: number) {
    try {
      this.programaItensSelecionados = await this.manejoService.obterProgramaItensPorTag(tagId);
    } catch (e) {
      console.error(e);
    }
  }

  async obterFemeas() {
    try {
      this.femeas = await this.manejoService.obterCiclosReproducao(2020);
    } catch (e) {
      console.error(e);
    }
  }

  async obterTagsQuantidade() {
    try {
      this.situacoes = await this.manejoService.obterTagsQuantidades("UPL");
      this.animalComportamento = new AnimalComportamento(this.situacoes);

      await this.obterProgramaItens(this.situacaoSelecionada.id);
      
      this.selecionarTag(this.situacoes[0].sigla);
    } catch (e) {
      console.error(e);
    }
  }

  async abrirAnimalDialog(id: number) {

    let parametrosDialog = { width: '480px', height: '550px', data: new Animal() };

    if (id) {
      parametrosDialog.data = await this.manejoService.obterAnimalPorId(id);
      const dialogRef = this.dialog.open(AnimalComponent, parametrosDialog);

      dialogRef.afterClosed().subscribe(result => {
        this.obterFemeas();
      });
    } else {
      const dialogRef = this.dialog.open(AnimalComponent, parametrosDialog);

      dialogRef.afterClosed().subscribe(result => {
        this.obterFemeas();
      });
    }
  }

  async abrirCicloReproducaoDialog(id: number) {

    let data = await this.manejoService.obterCicloAtivoPorAnimal(id);

    let ciclo = data.length ? data[0] : new CicloReproducao(id);

    const dialogRef = this.dialog.open(CicloReproducaoComponent, {
      width: '700px',
      height: '730px',
      data: ciclo
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obterFemeas();
    });
  }

  async gerarRelatorioUpl() {
    try {
      let dataInicio = "2020-01-01T03:00:00.000Z";
      let dataFinal = new Date().toString();

      let relatorioUpl = await this.manejoService.obterRelatorioUpl(dataInicio, dataFinal);
      let relatorioPdf = new RelatorioUplPdf();

      relatorioPdf.gerarRelatorioUpl(relatorioUpl);

    } catch (e) {
      console.error(e);
    }
  }

  selecionarTag(sigla: string) {
    let situacoes = this.situacoes.filter(s => s.sigla == sigla);
    this.situacaoSelecionada = situacoes.length ? situacoes[0] : this.situacaoSelecionada;
    this.programaItensSelecionados = this.programa.itens.filter(i => i.tagId == this.situacaoSelecionada.id);
  }

  abrirFichaDialog(numero: number): void {
    const dialogRef = this.dialog.open(FichaComponent, {
      width: '1200px',
      height: '700px',
      data: new Animal()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obterFemeas();
    });
  }

  abrirProgramaDialog() {

    let programaItem = new ProgramaItem(this.programa.id, this.situacaoSelecionada.id);

    const dialogRef = this.dialog.open(ProgramaFormComponent, {
      width: '930px',
      height: '580px',
      data: { programaItem: programaItem, situacao: this.situacaoSelecionada }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obterPrograma("AM");
      this.obterTagsQuantidade();
    });
  }

  abrirSimuladorCiclo() {
    const dialogRef = this.dialog.open(CicloSimularFormComponent, {
      width: '1200px',
      height: '700px',
      data: new CicloReproducao(0)
    });

    dialogRef.afterClosed().subscribe(result => {
    });
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


