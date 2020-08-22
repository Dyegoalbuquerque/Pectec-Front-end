
import * as jsPDF from 'jspdf';
import { RelatorioUC } from '../models/relatorioUC';

export class RelatorioUCPdf {

    gerarRelatorioUC(relatorio: RelatorioUC) {
        let dataInicial = new Date(relatorio.dataInicial);
        let dataFinal = new Date(relatorio.dataFinal);
        let dataInicialTexto = `${dataInicial.getDate()}/${dataInicial.getMonth()+1}/${dataInicial.getFullYear()}`;
        let dataFinalTexto = `${dataFinal.getDate()}/${dataFinal.getMonth()+1}/${dataFinal.getFullYear()}`;
        let textoDatas = `De ${dataInicialTexto} á ${dataFinalTexto}`;
        let documento = new jsPDF();

        var logo = new Image();
        logo.src = "assets/img/logo.jpg";

        documento.addImage(logo, "JPG", 20, 10, 30, 20);
        documento.setFont("helvetica");
        documento.setFontSize(26);
        documento.text("Relatório da UC", 90, 25);    
        documento.setFont("courier");
        documento.setFontStyle("normal");     
        documento.setFontSize(12);
        documento.text(textoDatas, 92, 30);
        documento.setLineWidth(0.1);
        documento.line(20, 35, 182, 35);

        documento.setFont("helvetica");
        documento.setFontStyle("normal");
        documento.setFontSize(14);
        documento.setTextColor(0, 0, 0);
        documento.text("Quantidade total animal vivo", 20, 45);
        documento.text("Taxa de mortalidade geral (%)", 20, 55);

        documento.setFont("courier");
        documento.setFontStyle("bolditalic");
        documento.setFontSize(16);
        documento.setTextColor(0,0,0);
        documento.text(relatorio.quantidadeAnimais.toString(), 180, 45, null, null, 'right');
        documento.text(`${relatorio.taxaMortalidade.toString()}%`, 180, 55, null, null, 'right');

        documento.save(`relatorio-uc-${dataInicialTexto}-${dataFinalTexto}.pdf`);
    }
}