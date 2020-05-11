import { Lancamento } from 'src/app/models';
import { DataHelper } from 'src/app/dataHelper';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CustoComportamento {

    constructor() { }

    construirCronograma(data: Lancamento[]) {
        let itens = [];

        let dataCronograma = data.map(o => ({ ...o, cronogramaId: o.mes }));

        for (let i = 0; i < 12; i++) {

            let lancamentos = dataCronograma.filter(x => x.mes == DataHelper.obterNomeMes(i));

            if (lancamentos.length > 0) {
                let total = 0;

                let dataParamentro = new Date(lancamentos[0].vencimento);
                dataParamentro = new Date(new Date(lancamentos[0].vencimento).getFullYear(), dataParamentro.getMonth(), 1)

                let cabecalho = { id: DataHelper.obterNomeMes(i), descricao: "", valor: total, vencimento: dataParamentro, tipo: "" };

                itens.push(cabecalho);
                itens = itens.concat(lancamentos);
            }
        }

        itens = itens.sort(Lancamento.ordenarPorVencimentoCrescente);

        return itens;
    }

    calcularTotalSaida(lista: Lancamento[]): number {
        let total = 0;

        lista.forEach(x => {
            if (x.eDoTipoSaida()) {
                total += x.valor;
            }
        });
        return total;
    }

    calcularTotalEntrada(lista: Lancamento[]): number {
        let total = 0;
        
        lista.forEach(x => {
            if (x.eDoTipoEntrada()) {
                total += x.valor;
            }
        });
        return total;
    }

    calcularTotalSaldo(lista: Lancamento[]): number {
        return this.calcularTotalEntrada(lista) - this.calcularTotalSaida(lista);
    }
}