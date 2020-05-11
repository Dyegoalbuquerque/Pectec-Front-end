
import { Component, OnInit } from '@angular/core';
import { EstoqueService } from 'src/app/services/estoque.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Estoque } from 'src/app/models/estoque';
import { plainToClass } from "class-transformer";
import { EstoqueComportamento } from '../estoqueComportamento';

@Component({
  templateUrl: './estoque.historico.component.html',
  styleUrls: ['./estoque.historico.component.css']
})
export class EstoqueHistoricoComponent implements OnInit {

  constructor(private estoqueService: EstoqueService, public dialogRef: MatDialogRef<EstoqueHistoricoComponent>,
              public estoqueComportamento: EstoqueComportamento) { }

  estoques: any[];

  ngOnInit() {
    this.estoques = [];
    this.obterInsumos();
    this.obterRacoes();
    this.obterMedicamentos();
  }

  obterInsumos() {
    this.estoqueService.obterPorCategoria("I").subscribe(data => {
     let historico = this.estoqueComportamento.construirHistorico("Insumo", plainToClass(Estoque, data));
     this.estoques = this.estoques.concat(historico);
    });
  }

  obterRacoes() {
    this.estoqueService.obterPorCategoria("R").subscribe(data => {
      let historico = this.estoqueComportamento.construirHistorico("Ração", plainToClass(Estoque, data));
      this.estoques = this.estoques.concat(historico);
    });
  }

  obterMedicamentos() {
    this.estoqueService.obterPorCategoria("M").subscribe(data => {
      let historico = this.estoqueComportamento.construirHistorico("Medicamento", plainToClass(Estoque, data));
      this.estoques = this.estoques.concat(historico);
    });
  }

  fechar(): void {
    this.dialogRef.close();
  }
}


