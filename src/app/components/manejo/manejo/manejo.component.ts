
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManejoService } from '../../../services';
import {
  FichaComponent, AnimalComponent, CicloReproducaoComponent,
  ProgramaFormComponent, AnimalComportamento, CicloSimularFormComponent
} from '..';
import { CicloReproducao } from 'src/app/models/cicloReproducao';
import { Situacao, Animal, Programa, ProgramaItem } from 'src/app/models';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  templateUrl: './manejo.component.html',
  styleUrls: ['./manejo.component.css']
})
export class ManejoComponent implements OnInit {

  constructor(private manejoService: ManejoService, public dialog: MatDialog,
    private notifications: NotificationsService, private spinner: NgxSpinnerService) {
    this.animalComportamento = new AnimalComportamento([]);
    this.femeas = [];
    this.situacaoSelecionada = new Situacao();
  }

  animalComportamento: AnimalComportamento;
  femeas: Animal[];
  filhotes: Animal[];
  ciclosRepdorucao: CicloReproducao[];
  situacoes: Situacao[];
  programa: Programa;
  programaItensSelecionados: ProgramaItem[];
  situacaoSelecionada: Situacao;

  panelOpenState = false;

  ngOnInit() {
    this.obterProgramaDoAnimal(1);
    this.obterSituacoesQuantidade();
    this.obterFemeas();
    this.obterFilhotes();
  }

  async obterProgramaDoAnimal(tipoProgramaId: number) {
    try {
      this.programa = await this.manejoService.obterPrograma(tipoProgramaId);
    } catch (e) {
      console.error(e);
    }
  }

  async obterProgramaItens(situacaoId: number) {
    try {
      this.programaItensSelecionados = await this.manejoService.obterProgramaItensPorSituacao(situacaoId);
    } catch (e) {
      console.error(e);
    }
  }

  async obterFemeas() {
    try {
      this.femeas = await this.manejoService.obterPrevisoes(2020);
    } catch (e) {
      console.error(e);
    }
  }

  async obterSituacoesQuantidade() {
    try {
      this.situacoes = await this.manejoService.obterSituacoesQuantidades("Upl");
      this.animalComportamento = new AnimalComportamento(this.situacoes);
      this.situacaoSelecionada = this.situacoes.length ? this.situacoes[0] : new Situacao();

      await this.obterProgramaItens(this.situacaoSelecionada.id);
    } catch (e) {
      console.error(e);
    }
  }

  async obterFilhotes() {
    try {
      this.filhotes = await this.manejoService.obterFilhotes();
    } catch (e) {
      console.error(e);
    }
  }

  async executarAtualizacaoSituacoes() {
    try {
      this.mostrarSpinner();

      await this.manejoService.atualizarSituacoes(1);

      this.esconderSpinner();

      await this.obterSituacoesQuantidade();
      await this.obterFemeas();
      await this.obterFilhotes();

      this.mostrarMensagem("", "Salvo com sucesso", NotificationType.Success);
    } catch (e) {
      console.error(e);
      this.esconderSpinner();
      this.mostrarMensagem("", "Ocorreu um problema", NotificationType.Error);
    }
  }

  selecionarSituacao(sigla: string) {
    let situacoes = this.situacoes.filter(s => s.sigla == sigla);

    this.situacaoSelecionada = situacoes.length ? situacoes[0] : this.situacaoSelecionada;
    this.programaItensSelecionados = this.programa.itens.filter(i => i.situacaoId == this.situacaoSelecionada.id);
  }

  abrirFichaDialog(numero: number): void {
    const dialogRef = this.dialog.open(FichaComponent, {
      width: '900px',
      height: '600px',
      data: new Animal()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obterFemeas();
    });
  }

  async abrirAnimalDialog(id: number) {

    let parametrosDialog = { width: '480px', height: '550px', data: new Animal() };

    if (id) {
      parametrosDialog.data = await this.manejoService.obterAnimalPorId(id);
      const dialogRef = this.dialog.open(AnimalComponent, parametrosDialog);

      dialogRef.afterClosed().subscribe(result => {
        this.obterFemeas();
        this.obterFilhotes();
      });
    } else {
      const dialogRef = this.dialog.open(AnimalComponent, parametrosDialog);

      dialogRef.afterClosed().subscribe(result => {
        this.obterFemeas();
        this.obterFilhotes();
      });
    }
  }

  async abrirCicloReproducaoDialog(id: number) {

    let data = await this.manejoService.obterAcompanhamentosPorAnimal(id);

    let acompanhamento;

    for (let i = 0; i < data.length; i++) {
      if (data[i].ativo) {
        acompanhamento = data[i];
        break;
      }
    }

    acompanhamento = !acompanhamento ? new CicloReproducao(id) : acompanhamento;

    const dialogRef = this.dialog.open(CicloReproducaoComponent, {
      width: '700px',
      height: '730px',
      data: acompanhamento
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obterFemeas();
    });
  }

  abrirProgramaDialog(id: number) {

    let itensFiltrados = this.programa.itens.filter(i => i.id == id);
    let programaItem = itensFiltrados.length > 0 ? itensFiltrados[0] : new ProgramaItem(this.programa.id, this.situacaoSelecionada.id);

    const dialogRef = this.dialog.open(ProgramaFormComponent, {
      width: '730px',
      height: '580px',
      data: { programaItem: programaItem, situacao: this.situacaoSelecionada }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obterProgramaDoAnimal(1);
      this.obterSituacoesQuantidade();
    });
  }

  abrirSimuladorCiclo(){
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


