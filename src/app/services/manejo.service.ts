import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Situacao, ProgramaItem, Programa, Ciclo, CicloFilho, 
         AcompanhamentoMaterno, Animal, CausaObito } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ManejoService {

  ApiUrl = 'http://localhost:5000/api/manejo';
  constructor(private httpclient: HttpClient) { }

  obterAnimalPorId(id: number): Observable<Animal> {
    return this.httpclient.get<Animal>(`${this.ApiUrl}/animal/${id}`);
  }

  obterFilhotes(): Observable<Animal[]> {
    return this.httpclient.get<Animal[]>(`${this.ApiUrl}/filhotes/`);
  }

  obterLotesVenda(tipo: string): Observable<Animal[]> {
    return this.httpclient.get<Animal[]>(`${this.ApiUrl}/lote/${tipo}`);
  }

  obterReprodutores(): Observable<Animal[]> {
    return this.httpclient.get<Animal[]>(`${this.ApiUrl}/reprodutores/`);
  }

  obterPrevisoes(ano: number): Observable<Animal[]> {
    return this.httpclient.get<Animal[]>(`${this.ApiUrl}/animal/previsoesPartos/${ano}`);
  }

  obterCausaObitos(): Observable<CausaObito[]> {
    return this.httpclient.get<CausaObito[]>(`${this.ApiUrl}/causaObitos`);
  }

  obterSituacoes(setor: string): Observable<Situacao[]> {
    return this.httpclient.get<Situacao[]>(`${this.ApiUrl}/situacoes/${setor}`);
  }

  obterPrograma(tipoProgramaId: number): Observable<Programa> {
    return this.httpclient.get<Programa>(`${this.ApiUrl}/programa/${tipoProgramaId}`);
  }

  obterProgramaItensPorSituacao(situacaoId: number): Observable<ProgramaItem[]> {
    return this.httpclient.get<ProgramaItem[]>(`${this.ApiUrl}/programaItens/${situacaoId}`);
  }

  obterFichaAnimal(numero: number): Observable<Animal> {
    return this.httpclient.get<Animal>(`${this.ApiUrl}/animal/ficha/${numero}`);
  }

  obterAcompanhamentosPorAnimal(id: number): Observable<AcompanhamentoMaterno[]> {
    return this.httpclient.get<AcompanhamentoMaterno[]>(`${this.ApiUrl}/animal/acompanhamentos/${id}`);
  }
  
  obterCiclosFilhosPorIds(ids: number[]): Observable<CicloFilho[]> {
    return this.httpclient.post<CicloFilho[]>(`${this.ApiUrl}/ciclo/filhos`, ids);
  }

  obterCiclosPorAno(ano: number): Observable<Ciclo[]> {
    return this.httpclient.get<Ciclo[]>(`${this.ApiUrl}/ciclo/${ano}`);
  }

  salvarAnimal(item: Animal): Observable<Animal> {
    return this.httpclient.post<Animal>(`${this.ApiUrl}/animal`, item);
  }

  atualizarAnimal(item: Animal): Observable<Animal> {
    return this.httpclient.put<Animal>(`${this.ApiUrl}/animal`, item);
  }

  removerAnimal(id: number): Observable<Animal> {
    return this.httpclient.delete<Animal>(`${this.ApiUrl}/animal/${id}`);
  }

  salvarAcompanhamento(item: AcompanhamentoMaterno): Observable<AcompanhamentoMaterno> {
    return this.httpclient.post<AcompanhamentoMaterno>(`${this.ApiUrl}/animal/acompanhamento`, item);
  }

  salvarCiclo(item: CicloFilho): Observable<CicloFilho> {
    return this.httpclient.post<CicloFilho>(`${this.ApiUrl}/ciclo`, item);
  }

  atualizarAcompanhamento(item: AcompanhamentoMaterno): Observable<AcompanhamentoMaterno> {
    return this.httpclient.put<AcompanhamentoMaterno>(`${this.ApiUrl}/animal/acompanhamento`, item);
  }

  simularCiclo(item: CicloFilho): Observable<CicloFilho> {
    return this.httpclient.post<CicloFilho>(`${this.ApiUrl}/simularCiclo`, item);
  }

  atualizarCiclo(item: CicloFilho): Observable<CicloFilho> {
    return this.httpclient.put<CicloFilho>(`${this.ApiUrl}/ciclo/`, item);
  }

  removerCiclo(id: number): Observable<CicloFilho> {
    return this.httpclient.delete<CicloFilho>(`${this.ApiUrl}/ciclo/${id}`);
  }

  salvarProgramaItem(item: ProgramaItem): Observable<ProgramaItem> {
    return this.httpclient.post<ProgramaItem>(`${this.ApiUrl}/programaItem`, item);
  }

  atualizarProgramaItem(item: ProgramaItem): Observable<ProgramaItem> {
    return this.httpclient.put<ProgramaItem>(`${this.ApiUrl}/programaItem/`, item);
  }

  obterSituacoesQuantidades(setor: string): Observable<Situacao[]> {
    return this.httpclient.get<Situacao[]>(`${this.ApiUrl}/situacoesQuantidades/${setor}`);
  }

  atualizarSituacoes(especieId: number): Observable<any> {
    return this.httpclient.get<any>(`${this.ApiUrl}/situacoes/atualizar/${especieId}`);
  }

  removerProgramaItem(id: number): Observable<ProgramaItem> {
    return this.httpclient.delete<ProgramaItem>(`${this.ApiUrl}/programaItem/${id}`);
  }
}
