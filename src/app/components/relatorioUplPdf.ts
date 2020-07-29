
import * as jsPDF from 'jspdf';
import { RelatorioUpl } from '../models/relatorioUpl';

export class RelatorioUplPdf {

    gerarRelatorioUpl(data: string, relatorio: RelatorioUpl) {
        let dataAtual = data;
        let documento = new jsPDF();

        var logo = new Image();
        logo.src = "assets/img/logo.jpg";

        documento.addImage(logo, "JPG", 20, 10, 30, 20);
        documento.setFont("helvetica");
        documento.setFontStyle("bold");
        documento.setFontSize(26);
        documento.text("Relatório da Upl", 90, 25);
        documento.setLineWidth(0.1);
        documento.line(20, 35, 185, 35);

        documento.setFontSize(14);
        documento.setTextColor(0, 0, 0);
        documento.text("Quantidade total matriz", 20, 45);
        documento.text("NLN médio geral", 20, 55);
        documento.text("NLD médio geral", 20, 65);
        documento.text("PLN médio geral", 20, 75);
        documento.text("PMLN médio geral", 20, 85);
        documento.text("PLD médio geral", 20, 95);
        documento.text("PMLD médio geral", 20, 105);

        documento.setFont("courier");
        documento.setFontStyle("normal");
        documento.setFontSize(14);
        documento.setTextColor(0, 0, 0);
        documento.text(relatorio.quantidadeTotalMatriz.toString(), 180, 45);
        documento.text(relatorio.nlnMedioGeral.toString(), 180, 55);
        documento.text(relatorio.nldMedioGeral.toString(), 180, 65);
        documento.text(relatorio.plnMedioGeral.toString(), 180, 75);
        documento.text(relatorio.pmlnMedioGeral.toString(), 180, 85);
        documento.text(relatorio.pldMedioGeral.toString(), 180, 95);
        documento.text(relatorio.pmldMedioGeral.toString(), 180, 105);

        documento.save(`relatorio-upl-${dataAtual}-.pdf`);
    }
}