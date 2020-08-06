import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UnidadeMedida, Categoria, Subcategoria } from '../models';
import { plainToClass } from "class-transformer";

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoService {

  ApiUrl='http://localhost:5003/api/configuracoes';    
  constructor(private httpclient: HttpClient) { }    
    
  async obterCategorias():Promise<Categoria[]>{    
    let retorno = await this.httpclient.get<Categoria[]>(`${this.ApiUrl}/categorias`).toPromise(); 
    return plainToClass(Categoria, retorno);
  }

  async obterUnidadeMedidas(): Promise<UnidadeMedida[]> {
    let retorno = await  this.httpclient.get<UnidadeMedida[]>(`${this.ApiUrl}/unidadeMedidas`).toPromise();
    return plainToClass(UnidadeMedida, retorno);
  }

  async obterSubcategorias(categorias?: any[]): Promise<Subcategoria[]> {
    let retorno = await  this.httpclient.get<Subcategoria[]>(`${this.ApiUrl}/subcategorias?categorias=${categorias}`).toPromise();
    return plainToClass(Subcategoria, retorno);
  }
}
