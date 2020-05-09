import { Lancamento } from 'src/app/models';
import { DataHelper } from 'src/app/dataHelper';

export class CustoComportamento {

    constructor() { }

    construirCronograma(data: Lancamento[]) {
        let itens = [];

        data = data.map(o => ({ ...o, cronogramaId: o.mes }));

        for (let i = 0; i < 12; i++) {

            let lancamentos = data.filter(x => x.mes == DataHelper.obterNomeMes(i));

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
}