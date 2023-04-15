import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManejoService } from '../../../services/manejo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CicloTerminacao } from 'src/app/models/cicloTerminacao';
import { Local } from 'src/app/models/local';

@Component({
  selector: 'cicloTerminacao-component',
  templateUrl: 'cicloTerminacao.component.html',
  styleUrls: ['./cicloTerminacao.component.css']
})
export class CicloTerminacaoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CicloTerminacaoComponent>, @Inject(MAT_DIALOG_DATA) public data: CicloTerminacao,
    private _snackBar: MatSnackBar, private manejoService: ManejoService) { }

  cicloTerminacao: CicloTerminacao;
  locais: Local[];
  tempos: any[];

  ngOnInit() {
    this.cicloTerminacao = this.data;
    this.obterLocais();
    this.obterTempos();
  }

  async obterLocais() {
    this.locais = await this.manejoService.obterLocais();
  }

  async salvar() {
    try {

      if (this.validar(this.cicloTerminacao)) {


        if (this.cicloTerminacao.id || this.cicloTerminacao.dataEntrada) {
          this.cicloTerminacao = await this.manejoService.atualizarCicloTerminacao(this.cicloTerminacao);
          this.mostrarMensagem("Salvo com sucesso", "ciclo Terminacao");
          this.fechar();
        } else {
          this.cicloTerminacao = await this.manejoService.salvarCicloTerminacao(this.cicloTerminacao);
          this.mostrarMensagem("Salvo com sucesso", "ciclo terminacao");
          this.fechar();
        }
      } else {
        this.mostrarMensagem("Preencha os campos obrigatórios", "ciclo Terminacao");
      }
    } catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "ciclo Terminacao");
    }
  }

  obterTempos() {
    this.tempos = [{ valor: 140 }, { valor: 145 }, { valor: 150 }];
  }


  fechar(): void {
    this.dialogRef.close();
  }

  validar(item: CicloTerminacao): boolean {
    return item.dataNascimento && item.dataEntrada && item.pesoAnimalEntrada > 0 &&
      item.localId && item.quantidadeEntrada > 0 && item.valorEntrada > 0 && item.tempoCiclo > 0;
  }

  mostrarMensagem(mensagem: string, action: string) {
    this._snackBar.open(mensagem, action, {
      duration: 2000,
    });
  }
}