import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lancamento } from '../models/lancamento';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CustoService {

  ApiUrl='http://localhost:5000/api/custo';    
  constructor(private httpclient: HttpClient) { }    
    
  obterCategorias():Observable<Categoria[]>{    
    return this.httpclient.get<Categoria[]>(this.ApiUrl + '/categoria/obter'); 

  }

  obterCronogramasPorAno(ano: number):Observable<Lancamento[]>{    
    return this.httpclient.get<Lancamento[]>(this.ApiUrl + '/' + ano);    
  } 

  obterLancamentoPorAno(ano: number):Observable<Lancamento[]>{    
    return this.httpclient.get<Lancamento[]>(this.ApiUrl + '/lancamento/' + ano);    
  }   

  salvarLancamento(item:Lancamento):Observable<Lancamento>{ 
    return this.httpclient.post<Lancamento>(this.ApiUrl+ '/lancamento', item);    
  }

  confirmarPagamentoLancamento(item:Lancamento):Observable<Lancamento>{ 
    return this.httpclient.post<Lancamento>(this.ApiUrl+ '/lancamento/confirmarPagamento', item);    
  }

  removerLancamento(id : number): Observable<Lancamento>{
    return this.httpclient.delete<Lancamento>(this.ApiUrl + '/lancamento/' + id);
  }
}
