import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lancamento } from '../models';
import { Paginacao } from '../paginacao';
import { plainToClass } from "class-transformer";

@Injectable({
  providedIn: 'root'
})
export class CustoService {

  ApiUrl = 'http://localhost:5002/api/custos';
  constructor(private httpclient: HttpClient) { }

  async obterLancamentoPorAno(ano: number, paginacao: Paginacao): Promise<Paginacao> {
    let retorno = await this.httpclient.get<Paginacao>(`${this.ApiUrl}/lancamentos?ano=${ano}&pagina=${paginacao.pagina}&limite=${paginacao.limite}&ordenar=desc`).toPromise();
    retorno.resultado = plainToClass(Lancamento, retorno.resultado);
    return plainToClass(Paginacao, retorno)
  }

  salvarLancamento(item: Lancamento): Observable<Lancamento> {
    return this.httpclient.post<Lancamento>(`${this.ApiUrl}/lancamentos`, item);
  }

  confirmarPagamentoLancamento(item: Lancamento): Observable<Lancamento> {
    return this.httpclient.post<Lancamento>(`${this.ApiUrl}/lancamentos/confirmar-pagamento`, item);
  }

  removerLancamento(id: number): Observable<Lancamento> {
    return this.httpclient.delete<Lancamento>(`${this.ApiUrl}/lancamentos/${id}`);
  }
}
