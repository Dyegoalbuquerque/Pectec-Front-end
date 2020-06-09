
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManejoService } from '../../../services/manejo.service';
import { Ciclo } from 'src/app/models/ciclo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CicloFilho } from 'src/app/models/cicloFilho';

@Component({
  selector: 'ciclo-component',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CicloComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CicloFilho, private _snackBar: MatSnackBar,
    private manejoService: ManejoService) { }

  cicloFilho: CicloFilho;
  ciclos: Ciclo[];
  simulacao: boolean;

  tipos = [{
    nome: "Gestação",
    valor: "G"
  }, {
    nome: "Lactação",
    valor: "L"
  }, {
    nome: "Recria",
    valor: "R"
  }, {
    nome: "Terminação",
    valor: "T"
  }, {
    nome: "Reprodutor",
    valor: "B"
  }];

  items = [
    { id: 1, name: 'Python' },
    { id: 2, name: 'Node Js' },
    { id: 3, name: 'Java' },
    { id: 4, name: 'PHP', disabled: true },
    { id: 5, name: 'Django' },
    { id: 6, name: 'Angular' },
    { id: 7, name: 'Vue' },
    { id: 8, name: 'ReactJs' },
  ];
  selected = [
    { id: 2, name: 'Node Js' },
    { id: 8, name: 'ReactJs' }
  ];

  ngOnInit() {
    this.cicloFilho = new CicloFilho();
    this.simulacao = this.cicloFilho.tipo == "S" ? true : false;;
    this.ciclos = [];
    this.data.tipo = this.data.tipo == undefined ? "G" : this.data.tipo;
    this.cicloFilho = this.data;
    this.obterCiclos();
  }

  async obterCiclos() {
    this.ciclos = await this.manejoService.obterCiclosPorAno(2020);
  }

  mudarSimulacao(simulacao) {
    this.simulacao = !simulacao;
    this.cicloFilho.tipo = this.simulacao ? "S" : "G";
  }

  validar(item: CicloFilho): boolean {

    return item.quantidadeAnimais && item.quantidadeDias &&
      item.dataInicio && item.valorRacao > 0 && item.quantidadeRacao > 0 &&
      item.tipo != undefined;
  }

  async salvar() {
    try {
      if (this.validar(this.cicloFilho)) {

        if (this.cicloFilho.id > 0) {
          this.cicloFilho = await this.manejoService.atualizarCiclo(this.cicloFilho);
          this.mostrarMensagem("Salvo com sucesso", "Ciclo");
          this.fechar();
        } else {
          this.cicloFilho = await this.manejoService.salvarCiclo(this.cicloFilho);
          this.mostrarMensagem("Salvo com sucesso", "Ciclo");
          this.fechar();
        }
      } else {
        this.mostrarMensagem("Preencha os campos obrigatórios", "Ciclo");
      }
    } catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "Ciclo");
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }

  mostrarMensagem(mensagem: string, action: string) {
    this._snackBar.open(mensagem, action, {
      duration: 2000,
    });
  }
}