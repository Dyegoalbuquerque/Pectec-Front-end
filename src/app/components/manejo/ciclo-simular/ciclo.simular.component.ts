
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManejoService } from '../../../services/manejo.service';
import { CicloFilho } from 'src/app/models/cicloFilho';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'ciclo-simular-dialog',
  templateUrl: 'ciclo.simular.component.html',
})
export class CicloSimularComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CicloSimularComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CicloFilho, private _snackBar: MatSnackBar,
    private manejoService: ManejoService) {
    this.ciclo = this.data;
  }

  ciclo: CicloFilho;

  ngOnInit() {}

  async salvar() {
    try {
      this.ciclo = await this.manejoService.salvarCiclo(this.ciclo);
      this.mostrarMensagem("Salvo com sucesso", "Ciclo");
      this.fechar();
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