
import { SliderOptionBuilder } from '../sliderOptionBuilder';

export class ProgramaComportamento {

    constructor() { }

    temIntervaloParaAdicionar(item) {

        let inicio = 1;
        let tamanho = item.intervalos.length;
        let temIntervalo = tamanho == 0;

        if (temIntervalo) {
            return true;
        }

        for (let i = 0; i < tamanho; i++) {
            let itemQuantidade = item.intervalos[i];

            temIntervalo = (itemQuantidade.inicio - inicio) > 0 ? true : false;

            if (temIntervalo) {
                return temIntervalo;
            }

            inicio = itemQuantidade.fim + 1;

            temIntervalo = i + 1 == tamanho && itemQuantidade.fim < item.quantidadeDias;

            if (temIntervalo) {
                return temIntervalo;
            }
        }
        return temIntervalo;
    }

    obterProximoIntervalo(item) {

        let temIntervalo = false;
        let inicio = 1;
        let fim = 0;
        let diferencaDias = 0;
        let tamanho = item.intervalos.length;
        let adicionarPrimeiro = tamanho == 0;

        let sliderBuilder = new SliderOptionBuilder(item.quantidadeDias, 1);

        if (adicionarPrimeiro) {

            let option = sliderBuilder.build();

            return { id: 0, inicio: option.floor, fim: option.ceil, option: option };
        }

        for (let i = 0; i < tamanho; i++) {
            let itemQuantidade = item.intervalos[i];
            diferencaDias = itemQuantidade.inicio - inicio;
            temIntervalo = diferencaDias > 0 ? true : false;

            if (temIntervalo) {
                fim = (inicio + diferencaDias) - 1;

                let option = sliderBuilder.addCeil(fim)
                    .addFloor(inicio)
                    .build();

                return { id: 0, inicio: inicio, fim: fim, option: option };
            }

            inicio = itemQuantidade.fim + 1;

            temIntervalo = i + 1 == tamanho && itemQuantidade.fim < item.quantidadeDias;

            if (temIntervalo) {
                fim = (item.quantidadeDias - itemQuantidade.fim) + itemQuantidade.fim;

                let option = sliderBuilder.addCeil(fim)
                    .addFloor(inicio)
                    .build();

                return { id: 0, inicio: inicio, fim: fim, option: option };
            }
        }
    }

    redefinirIntervalos(item) {

        item.intervalos = item.intervalos.sort((a, b) => { return a.inicio - b.inicio; });
        let tamanho = item.intervalos.length;

        for (let i = 0; i < tamanho; i++) {

            let intervalo = item.intervalos[i];
            let fimAnterior = i - 1 < 0 ? 0 : item.intervalos[i - 1].fim;
            let inicioProximo = i + 1 < tamanho ? item.intervalos[i + 1].inicio : intervalo.fim + 1;

            intervalo.inicio = fimAnterior + 1;
            intervalo.fim = inicioProximo - 1;


            let sliderBuilder = new SliderOptionBuilder(intervalo.fim, intervalo.inicio);

            intervalo.option = sliderBuilder.build();
        }
    }
}