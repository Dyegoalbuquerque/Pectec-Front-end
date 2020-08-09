
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
import { MatTableDataSource } from '@angular/material/table';
import { Acontecimento } from 'src/app/models/acontecimento';


@Component({
  templateUrl: './manejo.component.html',
  styleUrls: ['./manejo.component.css']
})
export class ManejoComponent implements OnInit {

  constructor(private manejoService: ManejoService, public dialog: MatDialog,
    private notifications: NotificationsService, private spinner: NgxSpinnerService) {
    this.animalComportamento = new AnimalComportamento([]);
    this.femeas = [];
    this.tagSelecionada = new Tag('');
    this.colunasAcontecimentos = ['descricao', 'na', 'editar', 'verificar'];
    this.dataSourceAcontecimento = new MatTableDataSource<Acontecimento>([]);
    this.programaItensSelecionados = [];
  }

  colunasAcontecimentos: any[];
  dataSourceAcontecimento: MatTableDataSource<Acontecimento>;
  animalComportamento: AnimalComportamento;
  femeas: Animal[];
  filhotes: Animal[];
  ciclosRepdorucao: CicloReproducao[];
  tags: Tag[];
  programa: Programa;
  programaItensSelecionados: ProgramaItem[];
  tagSelecionada: Tag;

  panelOpenState = false;

  ngOnInit() {
    this.obterFemeas();
    this.obterPrograma("AM");
    this.obterAcontecimentos();
  }

  obterAcontecimentos() {
    try {
      let lista = [];
      for (let i = 0; i < 20; i++) {
        let acontecimento = new Acontecimento();
        acontecimento.descricao = "É um suplemento essenciais e colina, que auxilia no metabolismo, nas suas fases de desenvolvimento. Auxilia na recomposição e manutenção da microbiota intestinal equilibrada.";
        lista.push(acontecimento);
      }
      this.dataSourceAcontecimento = new MatTableDataSource<Acontecimento>(lista);
    }
    catch (e) {
      console.error(e);
    }
  }

  async obterPrograma(tipoPrograma: string) {
    try {
      this.programa = await this.manejoService.obterPrograma(tipoPrograma);
      this.obterTagsQuantidade();
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
      this.tags = await this.manejoService.obterTagsQuantidades("UPL");
      this.animalComportamento = new AnimalComportamento(this.tags);
      
      this.selecionarTag(this.tags[0].sigla);
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
      height: '790px',
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

  selecionarProgramaItens(){
    this.programaItensSelecionados = this.programa.itens.length ? 
                                     this.programa.itens.filter(i => i.tagId == this.tagSelecionada.id) :
                                     [];
  }

  selecionarTag(sigla: string) {
    let tags = this.tags.filter(s => s.sigla == sigla);
    this.tagSelecionada = tags.length ? tags[0] : this.tagSelecionada;
    this.selecionarProgramaItens();
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

    let programaItem = new ProgramaItem(this.programa.id, this.tagSelecionada.id);

    const dialogRef = this.dialog.open(ProgramaFormComponent, {
      width: '930px',
      height: '580px',
      data: { programaItem: programaItem, situacao: this.tagSelecionada }
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


