import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

import { RelatorioMatriz } from '../models/relatorioMatriz';

export class RelatorioMatrizPdf {

    gerarRelatorioMatriz(relatorio: RelatorioMatriz) {

        let dataInicial = new Date(relatorio.dataInicial);
        let dataFinal = new Date(relatorio.dataFinal);
        let dataInicialTexto = `${dataInicial.getDate()}/${dataInicial.getMonth() + 1}/${dataInicial.getFullYear()}`;
        let dataFinalTexto = `${dataFinal.getDate()}/${dataFinal.getMonth() + 1}/${dataFinal.getFullYear()}`;
        let textoDatas = `De ${dataInicialTexto} á ${dataFinalTexto}`;

        let documento = new jsPDF();

        var logo = new Image();
        logo.src = "assets/img/logo.jpg";

        const colunas = ["Nº matriz", "Qtde Ciclos", "NLN", "NLD", "PMLD", "PMLN", "(%) Aborto",
            "(%) Parição", "(%) Mortalidade", "(%) Retorno cio"]

        const cabecalho = () => {
            documento.addImage(logo, "JPG", 20, 10, 30, 20);
            documento.setFont("helvetica");
            documento.setFontSize(26);
            documento.text("Relatório de matriz", 90, 25);
            documento.setFont("courier");
            documento.setFontStyle("normal");
            documento.setFontSize(12);
            documento.text(textoDatas, 92, 30);
            documento.setLineWidth(0.1);
            documento.line(20, 35, 182, 35);
        };

        const opcoes = {
            beforePageContent: cabecalho,
            margin: {
                top: 80
            },
            startX: 15,
            startY: documento.autoTableEndPosY() + 40
        }

        let itens = [];
        relatorio.itens.forEach(r => {

            let valores = [r.numero, r.quantidadeCiclos, r.nln, r.nld, r.pmld, r.pmln, 
                           r.taxaAborto, r.taxaParicao, r.taxaMortalidade, r.taxaRetornoCio];

            itens.push(valores);
        });

        documento.autoTable(colunas, itens, opcoes);
        documento.save(`relatorio-matriz-${dataInicialTexto}-${dataFinalTexto}.pdf`);
    }
}