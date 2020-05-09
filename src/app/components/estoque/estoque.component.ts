
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EstoqueService } from '../../services/';
import { IgxTreeGridComponent } from "igniteui-angular";
import { RacaoComponent, EstoqueFormComponent, EstoqueHistoricoComponent } from '../estoque';
import { Estoque } from 'src/app/models';

@Component({
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {

  constructor(private estoqueService: EstoqueService, public dialog: MatDialog) {
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

  construirChart(data, labels, chartDataset) {

    for (let i = 0; i < labels.length; i++) {

      let total = 0;

      for (let ii = 0; ii < data.length; ii++) {

        if (data[ii].subcategoria.descricao === labels[i]) {
          total += data[ii].quantidadeEntradaReal;
        }
      }
      chartDataset[0].data.push(total);
    }

    if (chartDataset[0].data.length > 0) {
      chartDataset[0].data.push(1);
    }
  }

  carregarChartInsumos() {

    this.estoqueService.obterEstoqueRealPorCodigoCategoria("I").subscribe(data => {

      this.chartLabelsInsumo = data.map(i => i.subcategoria.descricao);
      this.chartLabelsInsumo = [...(new Set(this.chartLabelsInsumo))];

      this.construirChart(data, this.chartLabelsInsumo, this.chartDatasetsInsumo);
    });
  }

  carregarChartRacao() {

    this.estoqueService.obterEstoqueRealPorCodigoCategoria("R").subscribe(data => {

      this.chartLabelsRacao = data.map(i => i.subcategoria.descricao);
      this.chartLabelsRacao = [...(new Set(this.chartLabelsRacao))];

      this.construirChart(data, this.chartLabelsRacao, this.chartDatasetsRacao);
    });
  }

  carregarChartMedicamento() {

    this.estoqueService.obterEstoqueRealPorCodigoCategoria("M").subscribe(data => {

      this.chartLabelsMedicamento = data.map(i => i.subcategoria.descricao);
      this.chartLabelsMedicamento = [...(new Set(this.chartLabelsMedicamento))];

      this.construirChart(data, this.chartLabelsMedicamento, this.chartDatasetsMedicamento);
    });
  }

  chartClicked(e: any): void { }
  chartHovered(e: any): void { }

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

