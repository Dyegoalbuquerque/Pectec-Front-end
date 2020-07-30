
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
        documento.text("Quantidade total reprodutor", 20, 55);
        documento.text("Quantidade total marrã", 20, 65);
        documento.text("Quantidade total confirmação gestação", 20, 75);
        documento.text("Quantidade total gestação", 20, 85);
        documento.text("Quantidade total lactação", 20, 95);
        documento.text("Quantidade total IDC", 20, 105);
        documento.text("Quantidade total Leitão vivo", 20, 115);
        documento.text("NLN médio geral", 20, 125);
        documento.text("NLD médio geral", 20, 135);
        documento.text("PLN médio geral", 20, 145);
        documento.text("PMLN médio geral", 20, 155);
        documento.text("PLD médio geral", 20, 165);
        documento.text("PMLD médio geral", 20, 175);

        documento.setFont("courier");
        documento.setFontStyle("normal");
        documento.setFontSize(14);
        documento.setTextColor(0, 0, 0);
        documento.text(relatorio.quantidadeTotalMatriz.toString(), 180, 45);
        documento.text(relatorio.quantidadeTotalReprodutor.toString(), 180, 55);
        documento.text(relatorio.quantidadeTotalMarra.toString(), 180, 65);
        documento.text(relatorio.quantidadeTotalConfirmacaoGestacao.toString(), 180, 75);
        documento.text(relatorio.quantidadeTotalGestacao.toString(), 180, 85);
        documento.text(relatorio.quantidadeTotalLactacao.toString(), 180, 95);
        documento.text(relatorio.quantidadeTotalIDC.toString(), 180, 105);
        documento.text(relatorio.quantidadeTotalLeitaoVivo.toString(), 180, 115);
        documento.text(relatorio.nlnMedioGeral.toString(), 180, 125);
        documento.text(relatorio.nldMedioGeral.toString(), 180, 135);
        documento.text(relatorio.plnMedioGeral.toString(), 180, 145);
        documento.text(relatorio.pmlnMedioGeral.toString(), 180, 155);
        documento.text(relatorio.pldMedioGeral.toString(), 180, 165);
        documento.text(relatorio.pmldMedioGeral.toString(), 180, 175);

        documento.save(`relatorio-upl-${dataAtual}-.pdf`);
    }
}