import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estoque, Consumo } from '../models';
import { Paginacao } from '../paginacao';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})

export class EstoqueService {

  ApiUrl = 'http://localhost:5001/api/estoques';
  constructor(private httpclient: HttpClient) { }

  async obterEstoqueRealPorCodigoCategoria(codigo: string): Promise<Estoque[]> {
    let retorno = await this.httpclient.get<Estoque[]>(`${this.ApiUrl}/real?codigoCategoria=${codigo}`).toPromise();
    return plainToClass(Estoque, retorno);
  }

  async obterOrigens(categoriaId: number): Promise<Estoque[]> {
    let retorno = await this.httpclient.get<Estoque[]>(`${this.ApiUrl}/origens?categoriaId=${categoriaId}`).toPromise();
    return plainToClass(Estoque, retorno);
  }

  async obterPorCategoria(categoriaId: number): Promise<Estoque[]> {
    let retorno = await this.httpclient.get<Estoque[]>(`${this.ApiUrl}?categoriaId=${categoriaId}`).toPromise();
    return plainToClass(Estoque, retorno);
  }

  async salvarEstoque(item: Estoque): Promise<Estoque> {
    let retorno = await this.httpclient.post<Estoque>(`${this.ApiUrl}/`, item).toPromise();
    return plainToClass(Estoque, retorno);
  }

  async salvarRacao(item: Estoque): Promise<Estoque> {

    let consumos = [];

    for (let i = 0; i < item.consumos.length; i++) {
      let consumo = item.consumos[i];

      if (consumo.quantidade > 0) {
        consumos.push(consumo);
      }
    }

    item.consumos = consumos;

    let retorno = await this.httpclient.post<Estoque>(`${this.ApiUrl}/racao/`, item).toPromise();
    return plainToClass(Estoque, retorno);
  }

  async removerRacao(id: number): Promise<Estoque> {
    let retorno = await this.httpclient.delete<Estoque>(`${this.ApiUrl}/racao/${id}`).toPromise();
    return plainToClass(Estoque, retorno);
  }

  async obterConsumos(paginacao: Paginacao): Promise<Paginacao> {
    let resultado = await this.httpclient.get<Paginacao>(`${this.ApiUrl}/consumo?pagina=${paginacao.pagina}&limite=${paginacao.limite}&ordenar=desc`).toPromise();
    resultado.resultado = plainToClass(Consumo, resultado.resultado);
    return plainToClass(Paginacao, resultado)
  }

  async salvarConsumo(item: Consumo): Promise<Consumo> {
    let retorno = await this.httpclient.post<Consumo>(`${this.ApiUrl}/consumo`, item).toPromise();
    return plainToClass(Consumo, retorno);
  }

  async atualizarConsumo(item: Consumo): Promise<Consumo> {
    let retorno = await this.httpclient.put<Consumo>(`${this.ApiUrl}/consumo`, item).toPromise();
    return plainToClass(Consumo, retorno);
  }
}
