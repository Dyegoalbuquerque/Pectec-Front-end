import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return plainToClass(Paginacao, retorno);
  }

  async salvarLancamento(item: Lancamento): Promise<Lancamento> {
    let retorno = await this.httpclient.post<Lancamento>(`${this.ApiUrl}/lancamentos`, item).toPromise();
    return plainToClass(Lancamento, retorno);
  }

  async confirmarPagamentoLancamento(item: Lancamento): Promise<Lancamento> {
    let retorno = await this.httpclient.post<Lancamento>(`${this.ApiUrl}/lancamentos/confirmar-pagamento`, item).toPromise();
    return plainToClass(Lancamento, retorno);
  }

  async removerLancamento(id: number): Promise<Lancamento> {
    let retorno = await this.httpclient.delete<Lancamento>(`${this.ApiUrl}/lancamentos/${id}`).toPromise();
    return plainToClass(Lancamento, retorno);
  }

  async obterBalancoLancamentos(ano: number): Promise<Lancamento> {
    let retorno = await this.httpclient.get<Lancamento>(`${this.ApiUrl}/lancamentos/balanco?ano=${ano}`).toPromise();
    retorno = plainToClass(Lancamento, retorno);
    return retorno;
  }
}
