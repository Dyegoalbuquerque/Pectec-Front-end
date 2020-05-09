import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subcategoria, Estoque, Consumo } from '../models';

@Injectable({
  providedIn: 'root'
})

export class EstoqueService {

  ApiUrl = 'http://localhost:5001/api/estoque';
  constructor(private httpclient: HttpClient) { }

  obterEstoqueRealPorCodigoCategoria(codigo: string): Observable<Estoque[]> {
    return this.httpclient.get<Estoque[]>(`${this.ApiUrl}/categoria/${codigo}/real`);
  }

  obterOrigens(categoriaId: number): Observable<Estoque[]> {
    return this.httpclient.get<Estoque[]>(`${this.ApiUrl}/origens/${categoriaId}`);
  }

  obterPorCategoria(codigoCategoria: string): Observable<Estoque[]> {
    return this.httpclient.get<Estoque[]>(`${this.ApiUrl}/${codigoCategoria}/todos`);
  }

  obterTipoInsumos(): Observable<Subcategoria[]> {
    return this.httpclient.get<Subcategoria[]>(`${this.ApiUrl}/insumo/tipos`);
  }

  obterTipoRacoes(): Observable<Subcategoria[]> {
    return this.httpclient.get<Subcategoria[]>(`${this.ApiUrl}/racao/tipos`);
  }

  obterOrigensConsumo(): Observable<any> {
    return this.httpclient.get<any>(`${this.ApiUrl}/consumo/origens`);
  }

  obterInsumo(id: number): Observable<Estoque> {
    return this.httpclient.get<Estoque>(`${this.ApiUrl}/insumo/${id}`);
  }

  obterRacao(id: number): Observable<Estoque> {
    return this.httpclient.get<Estoque>(`${this.ApiUrl}/racao/${id}`);
  }

  salvarEstoque(item: Estoque): Observable<Estoque> {
    return this.httpclient.post<Estoque>(`${this.ApiUrl}/`, item);
  }

  salvarRacao(item: Estoque): Observable<Estoque> {

    let consumos = [];
    for (let i = 0; i < item.eventos.length; i++) {

      if (item.eventos[i].quantidade > 0) {
        consumos.push(item.eventos[i]);
      }
    }

    item.eventos = consumos;

    return this.httpclient.post<Estoque>(`${this.ApiUrl}/racao/`, item);
  }

  removerRacao(id: number): Observable<Estoque> {
    return this.httpclient.delete<Estoque>(`${this.ApiUrl}/racao/${id}`);
  }

  obterConsumos(): Observable<Consumo[]> {
    return this.httpclient.get<Consumo[]>(`${this.ApiUrl}/consumo`);
  }

  obterConsumo(id: number): Observable<Consumo> {
    return this.httpclient.get<Consumo>(`${this.ApiUrl}/consumo/${id}`);
  }

  salvarConsumo(item: Consumo): Observable<Consumo> {
    return this.httpclient.post<Consumo>(`${this.ApiUrl}/consumo`, item);
  }

  atualizarConsumo(item: Consumo): Observable<Consumo> {
    return this.httpclient.put<Consumo>(`${this.ApiUrl}/consumo`, item);
  }

  removerConsumo(id: number): Observable<Consumo> {
    return this.httpclient.delete<Consumo>(`${this.ApiUrl}/consumo/${id}`);
  }
}
