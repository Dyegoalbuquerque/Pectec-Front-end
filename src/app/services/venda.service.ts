import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { plainToClass } from "class-transformer";
import { Venda } from '../models';
import { Paginacao } from '../paginacao';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  ApiUrl = 'http://localhost:5004/api/vendas';
  constructor(private httpclient: HttpClient) { }

  async obterVendas(ano: number, paginacao: Paginacao): Promise<Paginacao> {
    let retorno = await this.httpclient.get<Paginacao>(`${this.ApiUrl}?ano=${ano}&pagina=${paginacao.pagina}&limite=${paginacao.limite}&ordenar=desc`).toPromise();
    retorno.resultado = plainToClass(Venda, retorno.resultado);
    return plainToClass(Paginacao, retorno);
  }

  async salvarVendaRacao(item: Venda): Promise<Venda> {
    let retorno = await this.httpclient.post<Venda>(`${this.ApiUrl}/racao`, item).toPromise();
    return plainToClass(Venda, retorno);
  }

  async atualizarVendaRacao(item: Venda): Promise<Venda> {
    let retorno = await this.httpclient.put<Venda>(`${this.ApiUrl}/racao`, item).toPromise();
    return plainToClass(Venda, retorno);
  }

  async salvarVendaInsumo(item: Venda): Promise<Venda> {
    let retorno = await this.httpclient.post<Venda>(`${this.ApiUrl}/insumo`, item).toPromise();
    return plainToClass(Venda, retorno);
  }

  async salvarVendaAnimal(item: Venda): Promise<Venda> {
    let retorno = await this.httpclient.post<Venda>(`${this.ApiUrl}/animal`, item).toPromise();
    return plainToClass(Venda, retorno);
  }
}
