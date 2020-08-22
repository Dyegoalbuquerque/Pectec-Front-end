
import * as jsPDF from 'jspdf';
import { RelatorioUpl } from '../models/relatorioUpl';

export class RelatorioUplPdf {

    gerarRelatorioUpl(relatorio: RelatorioUpl) {
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
        documento.text("Relatório da Upl", 90, 25);    
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
        documento.text("Quantidade total matriz", 20, 45);
        documento.text("Quantidade total reprodutor", 20, 55);
        documento.text("Quantidade total marrã", 20, 65);
        documento.text("Quantidade total confirmação gestação", 20, 75);
        documento.text("Quantidade total gestação", 20, 85);
        documento.text("Quantidade total lactação", 20, 95);
        documento.text("Quantidade total IDC", 20, 105);
        documento.text("Quantidade total Leitão vivo", 20, 115);
        documento.text("NLN médio geral (quantidade)", 20, 125);
        documento.text("NLD médio geral (quantidade)", 20, 135);
        documento.text("PLN médio geral (Kg)", 20, 145);
        documento.text("PMLN médio geral (Kg)", 20, 155);
        documento.text("PLD médio geral (Kg)", 20, 165);
        documento.text("PMLD médio geral (Kg)", 20, 175);
        documento.text("Taxa de mortalidade geral (%)", 20, 185);
        documento.text("Retorno de cio (%)", 20, 195);
        documento.text("Aborto (%)", 20, 205);
        documento.text("Taxa de parição (%)", 20, 215);

        documento.setFont("courier");
        documento.setFontStyle("bolditalic");
        documento.setFontSize(16);
        documento.setTextColor(0,0,0);
        documento.text(relatorio.quantidadeTotalMatriz.toString(), 180, 45, null, null, 'right');
        documento.text(relatorio.quantidadeTotalReprodutor.toString(), 180, 55, null, null, 'right');
        documento.text(relatorio.quantidadeTotalMarra.toString(), 180, 65, null, null, 'right');
        documento.text(relatorio.quantidadeTotalConfirmacaoGestacao.toString(), 180, 75, null, null, 'right');
        documento.text(relatorio.quantidadeTotalGestacao.toString(), 180, 85, null, null, 'right');
        documento.text(relatorio.quantidadeTotalLactacao.toString(), 180, 95, null, null, 'right');
        documento.text(relatorio.quantidadeTotalIDC.toString(), 180, 105, null, null, 'right');
        documento.text(relatorio.quantidadeTotalLeitaoVivo.toString(), 180, 115, null, null, 'right');
        documento.text(relatorio.nlnMedioGeral.toString(), 180, 125, null, null, 'right');
        documento.text(relatorio.nldMedioGeral.toString(), 180, 135, null, null, 'right');
        documento.text(relatorio.plnMedioGeral.toString(), 180, 145, null, null, 'right');
        documento.text(relatorio.pmlnMedioGeral.toString(), 180, 155, null, null, 'right');
        documento.text(relatorio.pldMedioGeral.toString(), 180, 165, null, null, 'right');
        documento.text(relatorio.pmldMedioGeral.toString(), 180, 175, null, null, 'right');
        documento.text(`${relatorio.taxaMortalidade.toString()}%`, 180, 185, null, null, 'right');
        documento.text(`${relatorio.taxaRetornoCio.toString()}%`, 180, 195, null, null, 'right');
        documento.text(`${relatorio.taxaAborto.toString()}%`, 180, 205, null, null, 'right');
        documento.text(`${relatorio.taxaParicao.toString()}%`, 180, 215, null, null, 'right');

        documento.save(`relatorio-upl-${dataInicialTexto}-${dataFinalTexto}.pdf`);
    }
}