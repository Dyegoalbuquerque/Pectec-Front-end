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

    calcularQuantidadeDiasAteHoje(data: string) {

        var dataInicio = new Date(data);

        var subtracao = Math.abs(new Date().getTime() - dataInicio.getTime());
        return Math.ceil(subtracao / (1000 * 60 * 60 * 24));
    }

    calcularAlertaDeParicao(femea: Animal) {

        let acompanhamentoAtivo = this.obterAcompanhamentoMaternoAtivo(femea);

        return this.calcularQuantidadeDiasAteHoje(acompanhamentoAtivo.dataPartoPrevisao);
    }

    calcularDiasDoAnimal(animal: Animal) {
        return this.calcularQuantidadeDiasAteHoje(animal.dataNascimento);
    }

    calcularDiasDesdeFecundacao(femea: Animal) {

        let acompanhamentoAtivo = this.obterAcompanhamentoMaternoAtivo(femea);

        if (acompanhamentoAtivo == null || acompanhamentoAtivo.dataFecundacao == null) {
            return 0;
        }
        
        return this.calcularQuantidadeDiasAteHoje(acompanhamentoAtivo.dataFecundacao);
    }

    taEmAlertaDeConfirmacaoDeGestacao(femea: Animal) {
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

    taEmAlertaDeParto(femea) {
        let dias = this.calcularAlertaDeParicao(femea);

        return dias > 0 && dias <= 10;
    }

    obterSituacao(sigla) {

        let situacao = this.situacoes.filter(x => x.sigla == sigla)[0];

        return situacao ? situacao.nome : '';
    }
 
    calcularQuantidadeFilhotesAtual(femea: Animal) {

        let acompanhamento = this.obterAcompanhamentoMaternoAtivo(femea);

        let quantidade;
        let vivos;
        let adotados;
        let doados;
        let mortos;
        let vendidos;
        let apartados;

        if (acompanhamento) {
            vivos = acompanhamento.quantidadeFilhoteVV ? acompanhamento.quantidadeFilhoteVV : 0;
            adotados = acompanhamento.quantidadeAdotado ? acompanhamento.quantidadeAdotado : 0;
            doados = acompanhamento.quantidadeDoado ? acompanhamento.quantidadeDoado : 0;
            mortos = acompanhamento.quantidadeFilhoteMorto ? acompanhamento.quantidadeFilhoteMorto  : 0;
            vendidos = acompanhamento.quantidadeVendido ? acompanhamento.quantidadeVendido : 0;
            apartados = acompanhamento.quantidadeApartado ? acompanhamento.quantidadeApartado : 0;

            quantidade = (vivos + adotados) - (mortos + doados + vendidos + apartados);
        }


        return quantidade;
    }

    calcularQuantidadeDiasDeParida(femea: Animal) {

        let acompanhamento = this.obterAcompanhamentoMaternoAtivo(femea);

        return this.calcularQuantidadeDiasAteHoje(acompanhamento.dataPartoReal);
    }

    foiFecundadaEnaoPariu(femea: Animal){
        return this.foiFecundada(femea) && !this.foiParida(femea);
    }

    taNoPeriodoEntreGestacaoElactacao(femea: Animal){
        return femea.situacao == 'G' || femea.situacao == 'L';
    }

    taEmConfirmacaoGestacaoEnaoTaEmAlerta(femea: Animal){  
        return femea.taEmSituacaoConfirmacaoGestacao() && !this.taEmAlertaDeConfirmacaoDeGestacao(femea);
    }
}