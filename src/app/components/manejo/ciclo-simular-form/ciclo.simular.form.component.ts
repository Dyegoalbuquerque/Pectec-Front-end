
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManejoService } from '../../../services/manejo.service';
import { CicloReproducao } from 'src/app/models/cicloReproducao';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subcategoria } from 'src/app/models';
import { ConfiguracaoService } from 'src/app/services';

@Component({
  selector: 'ciclo-component',
  templateUrl: './ciclo.simular.form.component.html',
  styleUrls: ['./ciclo.simular.form.component.css']
})
export class CicloSimularFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CicloSimularFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CicloReproducao, private _snackBar: MatSnackBar,
    private manejoService: ManejoService, private categoriaService: ConfiguracaoService) { }

  cicloFilho: CicloReproducao;
  simulacao: boolean;
  ciclofilhos = [{subcategoriaId: 4, quantidade: 2, dias: 30}, 
                      {subcategoriaId: 4, quantidade: 2, dias: 30}];

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

  subcategorias: Subcategoria[];

  ngOnInit() {
    this.cicloFilho = this.data;

    this.obterSubcategorias("R");
  }

  async obterSubcategorias(codigo: string) {
    try {
      this.subcategorias = await this.categoriaService.obterSubcategorias(codigo);
    } catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "Ração")
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