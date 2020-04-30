
import { Component, OnInit } from '@angular/core';
import { EstoqueService } from 'src/app/services/estoque.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Estoque } from 'src/app/models/estoque';
import { plainToClass } from "class-transformer";

@Component({
  templateUrl: './estoque.historico.component.html',
  styleUrls: ['./estoque.historico.component.css']
})
export class EstoqueHistoricoComponent implements OnInit {

  constructor(private estoqueService: EstoqueService, public dialogRef: MatDialogRef<EstoqueHistoricoComponent>) { }

  estoques: any[];

  ngOnInit() {
    this.estoques = [];
    this.obterInsumos();
    this.obterRacoes();
    this.obterMedicamentos();
  }

  construirHistorico(tipoEstoque: string, data: Estoque[]){

    let itens = [];
    data = plainToClass(Estoque, data);

    data = data.map(o => ({ ...o, estoqueId: tipoEstoque }));

    let total = 0;
    data.forEach(x => { total += x.quantidadeEntrada; });

    let cabecalho = { id: tipoEstoque, descricao: "", quantidadeEntrada: total, dataEntrada: "", unidadeMedida: "", subcategoria: "", valor: "" };

    itens.push(cabecalho);
    itens = itens.concat(data);
    itens.forEach(x => {
      x.unidadeMedida = x.unidadeMedida.descricao;
      x.descricao = x.subcategoria.descricao;

      let valor = x.valorUnitario && x.quantidadeEmbalagem ?
                  x.valorUnitario * x.quantidadeEmbalagem : 0;
      x.valor = parseFloat(valor.toFixed(2));
    });

    this.estoques = this.estoques.filter(x => x.descricao != tipoEstoque);
    this.estoques = itens.concat(this.estoques);

    this.estoques = this.estoques.sort(Estoque.ordenarPorDataEntrada);
  }

  obterInsumos() {
    this.estoqueService.obterPorCategoria("I").subscribe(data => {

      this.construirHistorico("Insumo", data);
    });
  }

  obterRacoes() {
    this.estoqueService.obterPorCategoria("R").subscribe(data => {

      this.construirHistorico("Ração", data);
    });
  }

  obterMedicamentos() {
    this.estoqueService.obterPorCategoria("M").subscribe(data => {
     
      this.construirHistorico("Medicamento", data);
    });
  }

  fechar(): void {
    this.dialogRef.close();
  }
}


