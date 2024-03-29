import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EstoqueService } from 'src/app/services/estoque.service';
import { SliderOptionBuilder } from '../../sliderOptionBuilder';
import { Subcategoria, UnidadeMedida, Estoque, Consumo } from 'src/app/models';
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

  insumos: any[] = [];

  ngOnInit() {
    this.racao = this.data;
    this.racao.comprado = false;
    this.racao.sobra = false;
    this.obterInsumos();
    this.obterSubcategorias("R");
    this.obterUnidadeMedidas();
  }

  selecionarInsumo(item) {
    item.selecionado = !item.selecionado;
    item.retirado = 0;
  }

  mudarCompraRacaoPronta(comprouRacaoPronta) {
    this.racao.comprado = !comprouRacaoPronta;
  }

  mudarRacaoSobra(sobra) {
    this.racao.sobra = !sobra;
  }

  async obterInsumos() {
    try {
      let data = await this.estoqueService.obterEstoqueRealPorCodigoCategoria("I");

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
    } catch (e) {
      console.error(e);
    }
  }

  async obterUnidadeMedidas() {
    try {
      this.unidadeMedidas = await this.categoriaService.obterUnidadeMedidas();
    } catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "Ração")
    }
  }

  async obterSubcategorias(codigo: string) {
    try {
      this.subcategorias = await this.categoriaService.obterSubcategorias([codigo]);
    } catch (e) {
      console.error(e);
      this.mostrarMensagem("Ocorreu um problema", "Ração")
    }
  }

  async salvar() {

    this.racao.consumos = [];

    for (let j = 0; j < this.insumos.length; j++) {
      let insumo = this.insumos[j];

      let consumo = new Consumo();
      consumo.quantidade = insumo.retirado;
      consumo.origemId = insumo.id;

      this.racao.consumos.push(consumo);
    }

    if (this.racao.eValido()) {
      try {
        this.racao = await this.estoqueService.salvarRacao(this.racao);
        this.mostrarMensagem("Salvo com sucesso", "Ração");
        this.fechar();
      } catch (e) {
        console.error(e);
        this.mostrarMensagem("Ocorreu um problema", "Ração")
      }
    } else {
      this.mostrarMensagem("Preencha os campos obrigatórios", "Ração");
    }
  }

  fechar(): void {
    this.dialogRef.close();
  }

  mostrarMensagem(mensagem: string, action: string) {
    this._snackBar.open(mensagem, action, {
      duration: 2000,
    });
  }
}