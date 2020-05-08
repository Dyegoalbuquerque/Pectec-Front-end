import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UnidadeMedida, Categoria, Subcategoria } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService {

  ApiUrl='http://localhost:5003/api/configuracao';    
  constructor(private httpclient: HttpClient) { }    
    
  obterCategorias():Observable<Categoria[]>{    
    return this.httpclient.get<Categoria[]>(this.ApiUrl + '/obter'); 
  }

  obterUnidadeMedidas(): Observable<UnidadeMedida[]> {
    return this.httpclient.get<UnidadeMedida[]>(`${this.ApiUrl}/unidadeMedida`);
  }

  obterSubcategorias(codigoCategoria?: string): Observable<Subcategoria[]> {
    return this.httpclient.get<Subcategoria[]>(`${this.ApiUrl}/${codigoCategoria}/subcategorias`);
  }

  obterTodasSubcategorias(): Observable<Subcategoria[]> {
    return this.httpclient.get<Subcategoria[]>(`${this.ApiUrl}/subcategorias`);
  }
}
