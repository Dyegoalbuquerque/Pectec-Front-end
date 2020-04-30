import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from '../models';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  ApiUrl = 'http://localhost:5003/api/venda';
  constructor(private httpclient: HttpClient) { }


  obterVendas(ano: number): Observable<Venda[]> {
    return this.httpclient.get<Venda[]>(`${this.ApiUrl}/${ano}`);
  }
}
