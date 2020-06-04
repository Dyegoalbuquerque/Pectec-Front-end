
import { Component, OnInit } from '@angular/core';
import { EstoqueService } from 'src/app/services/estoque.service';
import { MatDialogRef } from '@angular/material/dialog';
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

  async obterInsumos() {
    try {
      let retorno = await this.estoqueService.obterPorCategoria(3);
      let historico = this.estoqueComportamento.construirHistorico("Insumo", retorno);
      this.estoques = this.estoques.concat(historico);
    } catch (e) {
      console.error(e);
    }
  }

  async obterRacoes() {
    try {
      let retorno = await this.estoqueService.obterPorCategoria(2);
      let historico = this.estoqueComportamento.construirHistorico("Ração", retorno);
      this.estoques = this.estoques.concat(historico);
    } catch (e) {
      console.error(e);
    }
  }

  async obterMedicamentos() {
    try {
      let retorno = await this.estoqueService.obterPorCategoria(3);
      let historico = this.estoqueComportamento.construirHistorico("Medicamento", retorno);
      this.estoques = this.estoques.concat(historico);
    } catch (e) {
      console.error(e);
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }
}


