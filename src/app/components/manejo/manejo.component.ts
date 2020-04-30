
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManejoService } from '../../services';
import { FichaComponent, AnimalComponent, AcompanhamentoMaternoComponent,
         CicloComponent, CicloSimularComponent, ProgramaFormComponent, AnimalComportamento
} from '../manejo';
import { AcompanhamentoMaterno } from 'src/app/models/acompanhamentoMaterno';
import { Ciclo, CicloFilho, Situacao, Animal, Programa } from 'src/app/models';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { Options } from 'ng5-slider';
import { ProgramaItem } from 'src/app/models/programaItem';
import { plainToClass } from "class-transformer";


@Component({
  templateUrl: './manejo.component.html',
  styleUrls: ['./manejo.component.css']
})
export class ManejoComponent implements OnInit {

  constructor(private manejoService: ManejoService, public dialog: MatDialog,
    private notifications: NotificationsService, private spinner: NgxSpinnerService) { }

  animalComportamento: AnimalComportamento;
  femeas: Animal[];
  filhotes: Animal[];
  ciclosFilhos: CicloFilho[];
  situacoes: Situacao[];
  programa: Programa;
  programaItensSelecionados: ProgramaItem[];
  situacaoSelecionada: Situacao;

  panelOpenState = false;
  options: Options;

  ngOnInit() {
    this.femeas = [];
    this.situacaoSelecionada = new Situacao();
    this.obterProgramaDoAnimal(1);
    this.obterSituacoesQuantidade();
    this.obterFemeas();
    this.obterFilhotes();
  }

  obterProgramaDoAnimal(tipoProgramaId: number) {
    this.manejoService.obterPrograma(tipoProgramaId).subscribe(data => {
      this.programa = plainToClass(Programa, data);
      this.programa.itens = plainToClass(ProgramaItem, this.programa.itens);
    });
  }

  obterProgramaItens(situacaoId: number) {
    this.manejoService.obterProgramaItensPorSituacao(situacaoId).subscribe(data => {
      this.programaItensSelecionados = plainToClass(ProgramaItem, data);
    });
  }

  obterCiclos() {
    this.manejoService.obterCiclosPorAno(2020).subscribe(data => {

      let ids = [];
      data.map(o => ids.push(o.id));

      this.manejoService.obterCiclosFilhosPorIds(ids).subscribe(filhos => {
        let itens = [];
        for (let i = 0; i < data.length; i++) {
          let cicloFilhos = filhos.filter(x => x.cicloId == data[i].id);
          let lista = cicloFilhos.map(o => ({ ...o, cicloId: data[i].descricao }));

          if (lista.length > 0) {
            let total = 0;
            lista.forEach(x => { total += x.valor; });

            let cabecalho = {
              id: data[i].descricao, valorRacao: 0, valor: total, valorMedicamentos: 0,
              valorGastosExtra: 0, quantidadeAnimais: 0, quantidadeDias: 0,
              quantidadeRacao: 0
            };

            itens.push(cabecalho);
            itens = itens.concat(lista);
          }
        }
        this.ciclosFilhos = itens;
      });
    });
  }

  obterFemeas() {
    this.manejoService.obterPrevisoes(2020).subscribe(data => {
      this.femeas = data;
    });
  }

  obterSituacoesQuantidade() {
    this.manejoService.obterSituacoesQuantidades("Upl").subscribe(data => {
      this.situacoes = plainToClass(Situacao, data.sort(Situacao.ordenar));
      this.animalComportamento = new AnimalComportamento(this.situacoes);
      this.situacaoSelecionada = this.situacoes.length ? this.situacoes[0] : new Situacao();

      this.obterProgramaItens(this.situacaoSelecionada.id);
    });
  }

  obterFilhotes() {
    this.manejoService.obterFilhotes().subscribe(data => {
      this.filhotes = data;
    });
  }

  selecionarSituacao(sigla: string) {
    let situacoes = this.situacoes.filter(s => s.sigla == sigla);

    this.situacaoSelecionada = situacoes.length ? situacoes[0] : this.situacaoSelecionada;
    this.programaItensSelecionados = this.programa.itens.filter(i => i.situacaoId == this.situacaoSelecionada.id);
  }

  abrirCicloDialog(item: Ciclo): void {
    const dialogRef = this.dialog.open(CicloComponent, {
      width: '700px',
      height: '650px',
      data: item == null ? new Ciclo() : item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obterCiclos();
    });
  }

  abrirCicloSimularDialog(item: Ciclo): void {
    const dialogRef = this.dialog.open(CicloSimularComponent, {
      width: '450px',
      height: '550px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obterCiclos();
    });
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

  abrirAnimalDialog(id: number) {

    let parametrosDialog = { width: '480px', height: '550px', data: new Animal() };

    if (id) {
      this.manejoService.obterAnimalPorId(id).subscribe(data => {

        parametrosDialog.data = data;
        const dialogRef = this.dialog.open(AnimalComponent, parametrosDialog);

        dialogRef.afterClosed().subscribe(result => {
          this.obterFemeas();
          this.obterFilhotes();
        });
      });

    } else {
      const dialogRef = this.dialog.open(AnimalComponent, parametrosDialog);

      dialogRef.afterClosed().subscribe(result => {
        this.obterFemeas();
        this.obterFilhotes();
      });
    }
  }

  abrirAcompanhamentoDialog(id: number) {

    this.manejoService.obterAcompanhamentosPorAnimal(id).subscribe(data => {

      let acompanhamento;

      for (let i = 0; i < data.length; i++) {
        if (data[i].ativo) {
          acompanhamento = data[i];
          break;
        }
      }

      acompanhamento = !acompanhamento ? new AcompanhamentoMaterno(id) : acompanhamento;

      const dialogRef = this.dialog.open(AcompanhamentoMaternoComponent, {
        width: '670px',
        height: '670px',
        data: acompanhamento
      });

      dialogRef.afterClosed().subscribe(result => {
        this.obterFemeas();
      });
    });
  }

  abrirProgramaDialog(id: number) {

    let itensFiltrados = this.programa.itens.filter(i => i.id == id);
    let programaItem = itensFiltrados.length > 0 ? itensFiltrados[0] : new ProgramaItem(this.programa.id, this.situacaoSelecionada.id);

    const dialogRef = this.dialog.open(ProgramaFormComponent, {
      width: '680px',
      height: '580px',
      data: { programaItem: programaItem, situacao: this.situacaoSelecionada }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.obterProgramaDoAnimal(1);
      this.obterSituacoesQuantidade();
    });
  }

  executarAtualizacaoSituacoes() {
    this.mostrarSpinner();

    this.manejoService.atualizarSituacoes(1).subscribe(data => {
      this.esconderSpinner();
      this.obterSituacoesQuantidade();
      this.obterFemeas();
      this.obterFilhotes();
      this.mostrarMensagem("", "Salvo com sucesso", NotificationType.Success);

    }, error => {
      this.esconderSpinner();
      this.mostrarMensagem("", "Ocorreu um problema", NotificationType.Error);
    });
  }

  atualizarCiclo(id: number) {

    let lista = this.ciclosFilhos.filter(c => c.id == id);

    let item = lista[0];

    this.manejoService.atualizarCiclo(item).subscribe(data => {
      this.obterCiclos();

      this.mostrarMensagem("Atualizado com sucesso", "Ciclo", NotificationType.Success);
    });
  }

  removerCiclo(id: number) {

    this.manejoService.removerCiclo(id).subscribe(data => {
      this.obterCiclos();

      this.mostrarMensagem("Removido com sucesso", "Ciclo", NotificationType.Success);
    });
  }

  removerProgramaItem(id: number) {
    this.manejoService.removerProgramaItem(id).subscribe(data => {
      this.obterProgramaDoAnimal(1);
      this.obterSituacoesQuantidade();

      this.mostrarMensagem("Removido com sucesso", "Lançamento", NotificationType.Success);
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


