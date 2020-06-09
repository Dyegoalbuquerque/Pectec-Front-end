import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManejoService } from '../../../services/manejo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Animal, CausaObito } from 'src/app/models';

@Component({
  selector: 'animal-component',
  templateUrl: 'animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AnimalComponent>, @Inject(MAT_DIALOG_DATA) public data: Animal,
    private _snackBar: MatSnackBar, private manejoService: ManejoService) { }

  animal: Animal;
  situacoes = [];
  sexos = [{ descricao: "Macho", valor: "M" }, { descricao: "Fêmea", valor: "F" }];
  causaObitos: CausaObito[];


  ngOnInit() {
    this.animal = this.data;
    this.obterSituacoes();
    this.obterCausaObitos();
  }

  async obterSituacoes() {
    this.situacoes = await this.manejoService.obterSituacoes("Upl");
  }

  async obterCausaObitos() {
    this.causaObitos = await this.manejoService.obterCausaObitos();
  }

  async salvar() {
    try {
      if (this.validar(this.animal)) {

        if (this.animal.id > 0) {
          this.animal = await this.manejoService.atualizarAnimal(this.animal);
          this.mostrarMensagem("Salvo com sucesso", "Animal");
          this.fechar();
        } else {
          this.animal = await this.manejoService.salvarAnimal(this.animal);
          this.mostrarMensagem("Salvo com sucesso", "Animal");
          this.fechar();
        }
      } else {
        this.mostrarMensagem("Preencha os campos obrigatórios", "Animal");
      }
    } catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "Animal");
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }

  validar(item: Animal): boolean {

    return item.dataNascimento && item.raca && item.sexo &&
      ((item.dataObito && item.situacao == 'O' && item.causaObitoId > 0) ||
        (item.situacao != 'O' && !item.dataObito && !item.causaObitoId))
  }

  mostrarMensagem(mensagem: string, action: string) {
    this._snackBar.open(mensagem, action, {
      duration: 2000,
    });
  }
}