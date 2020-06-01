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

  obterEstoqueRealPorCodigoCategoria(codigo: string): Observable<Estoque[]> {
    return this.httpclient.get<Estoque[]>(`${this.ApiUrl}/real?codigoCategoria=${codigo}`);
  }

  obterOrigens(categoriaId: number): Observable<Estoque[]> {
    return this.httpclient.get<Estoque[]>(`${this.ApiUrl}/origens?categoriaId=${categoriaId}`);
  }

  obterPorCategoria(categoriaId: number): Observable<Estoque[]> {
    return this.httpclient.get<Estoque[]>(`${this.ApiUrl}?categoriaId=${categoriaId}`);
  }

  salvarEstoque(item: Estoque): Observable<Estoque> {
    return this.httpclient.post<Estoque>(`${this.ApiUrl}/`, item);
  }

  salvarRacao(item: Estoque): Observable<Estoque> {

    let consumos = [];

    for (let i = 0; i < item.consumos.length; i++) {
      let consumo = item.consumos[i];

      if (consumo.quantidade > 0) {
        consumos.push(consumo);
      }
    }

    item.consumos = consumos;

    return this.httpclient.post<Estoque>(`${this.ApiUrl}/racao/`, item);
  }

  removerRacao(id: number): Observable<Estoque> {
    return this.httpclient.delete<Estoque>(`${this.ApiUrl}/racao/${id}`);
  }

  async obterConsumos(paginacao: Paginacao): Promise<Paginacao> {
    let resultado = await this.httpclient.get<Paginacao>(`${this.ApiUrl}/consumo?pagina=${paginacao.pagina}&limite=${paginacao.limite}&ordenar=desc`).toPromise();
    resultado.resultado = plainToClass(Consumo, resultado.resultado);
    return plainToClass(Paginacao, resultado)
  }

  salvarConsumo(item: Consumo): Observable<Consumo> {
    return this.httpclient.post<Consumo>(`${this.ApiUrl}/consumo`, item);
  }

  atualizarConsumo(item: Consumo): Observable<Consumo> {
    return this.httpclient.put<Consumo>(`${this.ApiUrl}/consumo`, item);
  }
}
