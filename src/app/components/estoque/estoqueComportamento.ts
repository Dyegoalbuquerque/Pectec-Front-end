import { Estoque } from 'src/app/models';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class EstoqueComportamento {

    constructor() { }

    construirHistorico(tipoEstoque: string, data: Estoque[]) {
        let itens = [];

        let dataEstoque = data.map(o => ({ ...o, estoqueId: tipoEstoque }));

        let total = 0;
        dataEstoque.forEach(x => { total += x.quantidadeEntrada; });

        let cabecalho = { id: tipoEstoque, descricao: "", quantidadeEntrada: total, dataEntrada: "", unidadeMedida: "", subcategoria: "", valor: "" };

        itens.push(cabecalho);
        itens = itens.concat(dataEstoque);
        itens.forEach(x => {
            x.unidadeMedida = x.unidadeMedida;
            x.descricao = x.subcategoria.descricao;

            let valor = x.valorUnitario && x.quantidadeEmbalagem ?
                x.valorUnitario * x.quantidadeEmbalagem : 0;
            x.valor = parseFloat(valor.toFixed(2));
        });

        return itens.sort(Estoque.ordenarPorDataEntrada);
    }

    construirChart(data: Estoque[], labels: string[], chartDataset: any[]) {

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
}