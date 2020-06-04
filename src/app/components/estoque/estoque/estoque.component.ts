
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EstoqueService } from '../../../services';
import { IgxTreeGridComponent } from "igniteui-angular";
import { RacaoComponent, EstoqueFormComponent, EstoqueHistoricoComponent } from '..';
import { Estoque } from 'src/app/models';
import { EstoqueComportamento } from '../estoqueComportamento';

@Component({
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {

  constructor(private estoqueService: EstoqueService, public dialog: MatDialog,
    private estoqueComportamento: EstoqueComportamento) {
  }

  @ViewChild("gridHistorico", { read: IgxTreeGridComponent, static: true }) gridHistorico: IgxTreeGridComponent;

  chartType: string = 'bar';
  chartOptions: any = {
    responsive: true
  };

  chartDatasetsInsumo: Array<any> = [{ data: [], label: ' kg' }]
  chartDatasetsRacao: Array<any> = [{ data: [], label: ' kg' }]
  chartDatasetsMedicamento: Array<any> = [{ data: [], label: ' Ml' }]

  chartLabelsInsumo: Array<any> = [];
  chartLabelsRacao: Array<any> = [];
  chartLabelsMedicamento: Array<any> = [];

  chartColors: Array<any> = [
    {
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
      borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
      borderWidth: 2,
    }
  ];

  ngOnInit() {
    this.carregarChartRacao();
    this.carregarChartInsumos();
    this.carregarChartMedicamento();
  }

  async carregarChartInsumos() {
    try {

      let data = await this.estoqueService.obterEstoqueRealPorCodigoCategoria("I");
      this.chartLabelsInsumo = data.map(i => i.subcategoria.descricao);
      this.chartLabelsInsumo = [...(new Set(this.chartLabelsInsumo))];

      this.estoqueComportamento.construirChart(data, this.chartLabelsInsumo, this.chartDatasetsInsumo);
    } catch (e) {
      console.error(e);
    }
  }

  async carregarChartRacao() {
    try {
      let data = await this.estoqueService.obterEstoqueRealPorCodigoCategoria("R");
      this.chartLabelsRacao = data.map(i => i.subcategoria.descricao);
      this.chartLabelsRacao = [...(new Set(this.chartLabelsRacao))];

      this.estoqueComportamento.construirChart(data, this.chartLabelsRacao, this.chartDatasetsRacao);
    } catch (e) {
      console.error(e);
    }
  }

  async carregarChartMedicamento() {
    try {
      let data = await this.estoqueService.obterEstoqueRealPorCodigoCategoria("M");
      this.chartLabelsMedicamento = data.map(i => i.subcategoria.descricao);
      this.chartLabelsMedicamento = [...(new Set(this.chartLabelsMedicamento))];

      this.estoqueComportamento.construirChart(data, this.chartLabelsMedicamento, this.chartDatasetsMedicamento);
    } catch (e) {
      console.error(e);
    }
  }

  abrirEstoqueHistoricoDialog(): void {
    this.dialog.open(EstoqueHistoricoComponent, {
      width: '900px',
      height: '680px'
    });
  }

  abrirRacaoDialog(): void {
    const dialogRef = this.dialog.open(RacaoComponent, {
      width: '1100px',
      height: '720px',
      data: new Estoque()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.carregarChartRacao();
      this.carregarChartInsumos();
    });
  }

  abrirEstoqueFormDialog(): void {
    const dialogRef = this.dialog.open(EstoqueFormComponent, {
      width: '480px',
      height: '530px',
      data: new Estoque()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.carregarChartInsumos();
      this.carregarChartMedicamento();
    });
  }
}

