import { Animal } from 'src/app/models/animal';
import { Situacao } from 'src/app/models/situacao';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AnimalComportamento {

    constructor(situacoes: Situacao[]) {
        this.situacoes = situacoes;
    }

    situacoes: Situacao[];

    calcularAlertaDeParicao(femea: Animal) {

        let acompanhamentoAtivo = this.obterAcompanhamentoMaternoAtivo(femea);
        var hoje = new Date();
        var dataPartoPrevisao = new Date(acompanhamentoAtivo.dataPartoPrevisao);

        var subtracao = dataPartoPrevisao.getTime() - hoje.getTime();

        return Math.ceil(subtracao / (1000 * 60 * 60 * 24));
    }

    calcularDiasDoAnimal(animal: Animal) {

        var hoje = new Date();
        var dataNascimento = new Date(animal.dataNascimento);

        var subtracao = Math.abs(hoje.getTime() - dataNascimento.getTime());
        return Math.ceil(subtracao / (1000 * 60 * 60 * 24));
    }

    calcularDiasDesdeFecundacao(femea: Animal) {

        let acompanhamentoAtivo = this.obterAcompanhamentoMaternoAtivo(femea);

        if (acompanhamentoAtivo == null || acompanhamentoAtivo.dataFecundacao == null) {
            return 0;
        }

        var hoje = new Date();
        var dataFecundacao = new Date(acompanhamentoAtivo.dataFecundacao);

        var subtracao = Math.abs(hoje.getTime() - dataFecundacao.getTime());
        return Math.ceil(subtracao / (1000 * 60 * 60 * 24));
    }

    taNoPeriodoConfirmacaoDeGestacao(femea: Animal) {
        let dias = this.calcularDiasDesdeFecundacao(femea);

        return femea.situacao == "CG" && dias >= 15;
    }

    verificarAcompanhamentoMaternoAtivo(item) {
        if (item.acompanhamentos.length > 0) {

            for (let i = 0; i < item.acompanhamentos.length; i++) {
                if (item.acompanhamentos[i].ativo) {
                    return true;
                }
            }
        }
        return false;
    }

    obterAcompanhamentoMaternoAtivo(item) {

        if (item.acompanhamentos == null) {
            return null;
        }

        if (item.acompanhamentos.length > 0) {

            for (let i = 0; i < item.acompanhamentos.length; i++) {
                if (item.acompanhamentos[i].ativo) {
                    return item.acompanhamentos[i];
                }
            }
        }
        return null;
    }

    obterDataCobertura(femea: Animal) {
        let acompanhamento = this.obterAcompanhamentoMaternoAtivo(femea);
        return acompanhamento == null ? '' : acompanhamento.dataFecundacao;
    }

    obterDataPartoPrevisao(femea: Animal) {

        let acompanhamento = this.obterAcompanhamentoMaternoAtivo(femea);
        return acompanhamento == null ? '' : acompanhamento.dataPartoPrevisao;
    }

    obterDataApartarPrevisao(femea: Animal) {

        let acompanhamento = this.obterAcompanhamentoMaternoAtivo(femea);
        return acompanhamento == null ? '' : acompanhamento.dataApartarPrevisao;
    }

    obterDataPartoReal(femea: Animal) {

        let acompanhamento = this.obterAcompanhamentoMaternoAtivo(femea);
        return acompanhamento == null ? '' : acompanhamento.dataPartoReal;
    }

    foiFecundada(femea) {

        let acompanhamentoAtivo = this.obterAcompanhamentoMaternoAtivo(femea);

        return acompanhamentoAtivo != null && acompanhamentoAtivo.dataFecundacao != '';
    }

    foiParida(femea) {

        let acompanhamentoAtivo = this.obterAcompanhamentoMaternoAtivo(femea);

        return acompanhamentoAtivo != null && acompanhamentoAtivo.dataPartoReal;
    }

    taEmAlertaDePArto(femea) {
        let dias = this.calcularAlertaDeParicao(femea);

        return dias > 0 && dias <= 10;
    }

    obterSituacao(sigla) {

        let situacao = this.situacoes.filter(x => x.sigla == sigla)[0];

        return situacao ? situacao.nome : '';
    }

    quantidadeFilhotesVivos(femea: Animal) {

        let acompanhamento = this.obterAcompanhamentoMaternoAtivo(femea);

        let quantidade = acompanhamento &&
            acompanhamento.quantidadeFilhoteVV ?
            acompanhamento.quantidadeFilhoteVV -
            acompanhamento.quantidadeFilhoteMorto : 0;

        return quantidade;
    }

    quantidadeFilhotesMortos(femea: Animal) {

        let acompanhamento = this.obterAcompanhamentoMaternoAtivo(femea);

        let quantidade = acompanhamento &&
                         acompanhamento.quantidadeFilhoteVV &&
                         acompanhamento.quantidadeFilhoteMorto ?
                         acompanhamento.quantidadeFilhoteMorto +
                         acompanhamento.quantidadeFilhoteNM : 0;

        return quantidade;
    }
}