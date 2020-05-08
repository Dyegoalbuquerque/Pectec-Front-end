
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstoqueService } from 'src/app/services/estoque.service';
import { SliderOptionBuilder } from '../sliderOptionBuilder';
import { Subcategoria, UnidadeMedida, Estoque, Evento } from 'src/app/models';
import { ConfiguracaoService } from 'src/app/services';
import { plainToClass } from "class-transformer";

@Component({
  selector: 'racao-dialog',
  templateUrl: 'racao.component.html',
  styleUrls: ['./racao.component.css']
})
export class RacaoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Estoque, private _snackBar: MatSnackBar,
    private estoqueService: EstoqueService, private categoriaService: ConfiguracaoService) { }

  racao: Estoque;
  subcategorias: Subcategoria[];
  comprouRacaoPronta: boolean;
  unidadeMedidas: UnidadeMedida[];

  quantidadeEmbalagens = [{
    valor: 10
  }, {
    valor: 20
  }, {
    valor: 30
  }, {
    valor: 40
  }, {
    valor: 50
  }, {
    valor: 60
  }];

  insumos : any[] = [];

  ngOnInit() {
    this.comprouRacaoPronta = false;
    this.racao = this.data;
    this.obterInsumos();
    this.obterSubcategorias("R");
    this.obterUnidadeMedidas();
  }

  selecionarInsumo(item) {
    item.selecionado = !item.selecionado;
    item.retirado = 0;
  }

  mudarCompraRacaoPronta(comprouRacaoPronta) {
    this.comprouRacaoPronta = !comprouRacaoPronta;
    this.racao.comprado = this.comprouRacaoPronta;
  }

  obterInsumos() {
    this.estoqueService.obterEstoqueRealPorCodigoCategoria("I").subscribe(data => {

      for (let i = 0; i < data.length; i++) {
        let insumo = data[i];

        let sliderHelper = new SliderOptionBuilder(insumo.quantidadeEntradaReal, 0);
        let option = sliderHelper.addStep(0.1).build();

        let item = {
          id: insumo.id, descricao: insumo.subcategoria.descricao,
          selecionado: false, disponivel: insumo.quantidadeEntradaReal,
          retirado: 0, valorUnitario: insumo.valorUnitario, option: option
        };

        this.insumos.push(item);
      }

      this.insumos = this.insumos.sort(Estoque.ordenarPorDescricao);
    });
  }

  obterUnidadeMedidas() {
    this.categoriaService.obterUnidadeMedidas().subscribe(data => {
      this.unidadeMedidas = plainToClass(UnidadeMedida, data);
    });
  }

  salvar(): void {

    if (this.validar(this.racao)) {

      this.estoqueService.salvarRacao(this.racao).subscribe(data => {
        this.racao = data;
        this.mostrarMensagem("Salvo com sucesso", "Ração");
        this.fechar();
      },
        err => {
          this.mostrarMensagem("Ocorreu um problema", "Ração");
        });
    } else {
      this.mostrarMensagem("Preencha os campos obrigatórios", "Ração");
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }

  obterSubcategorias(codigo: string) {
    this.categoriaService.obterSubcategorias(codigo).subscribe(data => {
      this.subcategorias = data;
    });
  }

  validar(item: Estoque): boolean {

    this.racao.eventos = [];
    for (let j = 0; j < this.insumos.length; j++) {
      let insumo = this.insumos[j];

      let consumo = new Evento();
      consumo.quantidade = insumo.retirado;
      consumo.origemId = insumo.id;

      this.racao.eventos.push(consumo);
    }

    let algumInsumoSelecionado = false;
    for (let i = 0; i < item.eventos.length; i++) {
      if (item.eventos[i].quantidade > 0) {
        algumInsumoSelecionado = true;
        break;
      }
    }

    return (item.descricao && item.subcategoriaId && item.unidadeMedida != '' && item.quantidadeEmbalagem > 0) &&
      (!this.comprouRacaoPronta && algumInsumoSelecionado && item.dataEntrada != '' ||
        this.comprouRacaoPronta && item.quantidadeEmbalagem && item.quantidadeEmbalagem > 0 &&
        item.quantidade > 0);
  }

  mostrarMensagem(mensagem: string, action: string) {
    this._snackBar.open(mensagem, action, {
      duration: 2000,
    });
  }
}