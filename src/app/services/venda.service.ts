import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  ApiUrl = 'http://localhost:5004/api/venda';
  constructor(private httpclient: HttpClient) { }


  obterVendas(ano: number): Observable<Venda[]> {
    return this.httpclient.get<Venda[]>(`${this.ApiUrl}/${ano}`);
  }

  salvarVendaRacao(item: Venda): Observable<Venda> {
    return this.httpclient.post<Venda>(`${this.ApiUrl}/racao`, item);
  }

  atualizarVendaRacao(item: Venda): Observable<Venda> {
    return this.httpclient.put<Venda>(`${this.ApiUrl}/racao`, item);
  }

  salvarVendaInsumo(item: Venda): Observable<Venda> {
    return this.httpclient.post<Venda>(`${this.ApiUrl}/insumo`, item);
  }

  salvarVendaAnimal(item: Venda): Observable<Venda> {
    return this.httpclient.post<Venda>(`${this.ApiUrl}/animal`, item);
  }
}
