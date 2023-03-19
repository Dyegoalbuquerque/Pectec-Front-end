import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManejoService } from '../../../services/manejo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CicloCreche } from 'src/app/models/cicloCreche';
import { Local } from 'src/app/models/local';

@Component({
  selector: 'cicloCreche-component',
  templateUrl: 'cicloCreche.component.html',
  styleUrls: ['./cicloCreche.component.css']
})
export class CicloCrecheComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CicloCrecheComponent>, @Inject(MAT_DIALOG_DATA) public data: CicloCreche,
    private _snackBar: MatSnackBar, private manejoService: ManejoService) { }

  cicloCreche: CicloCreche;
  locais: Local[];
  tempos: any[];

  ngOnInit() {
    this.cicloCreche = this.data;
    this.obterLocais();
    this.obterTempos();
  }

  async obterLocais() {
    this.locais = await this.manejoService.obterLocais();
  }

  async salvar() {
    try {

      if (this.validar(this.cicloCreche)) {

        if (this.cicloCreche.id > 0) {
          this.cicloCreche = await this.manejoService.atualizarCicloCreche(this.cicloCreche);
          this.mostrarMensagem("Salvo com sucesso", "ciclo Terminacao");
          this.fechar();
        } else {
          this.cicloCreche = await this.manejoService.salvarCicloCreche(this.cicloCreche);
          this.mostrarMensagem("Salvo com sucesso", "ciclo creche");
          this.fechar();
        }
      } else {
        this.mostrarMensagem("Preencha os campos obrigatórios", "ciclo creche");
      }
    } catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "ciclo creche");
    }
  }

  obterTempos() {
    this.tempos = [{ valor: 140 }, { valor: 145 }, { valor: 150 }];
  }

  fechar(): void {
    this.dialogRef.close();
  }

  validar(item: CicloCreche): boolean {
    return item.dataNascimento && item.dataEntrada && item.pesoAnimalEntrada > 0 &&
      item.localId > 0 && item.quantidadeEntrada > 0 && item.valorEntrada > 0 && item.tempoCiclo > 0;
  }

  mostrarMensagem(mensagem: string, action: string) {
    this._snackBar.open(mensagem, action, {
      duration: 2000,
    });
  }
}