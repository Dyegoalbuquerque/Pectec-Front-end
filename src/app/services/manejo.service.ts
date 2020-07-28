import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Situacao, ProgramaItem, Programa, CicloReproducao, Animal, CausaObito
} from '../models';
import { plainToClass } from "class-transformer";

@Injectable({
  providedIn: 'root'
})
export class ManejoService {

  ApiUrl = 'http://localhost:5000/api/manejos';
  constructor(private httpclient: HttpClient) { }

  async obterAnimalPorId(id: number): Promise<Animal> {
    let data = await this.httpclient.get<Animal>(`${this.ApiUrl}/animal/${id}`).toPromise();
    return plainToClass(Animal, data);
  }

  async obterLotesVenda(tipo: string): Promise<Animal[]> {
    let data = await this.httpclient.get<Animal[]>(`${this.ApiUrl}/lote?tipo=${tipo}`).toPromise();
    return plainToClass(Animal, data);
  }

  async obterReprodutores(): Promise<Animal[]> {
    let data = await this.httpclient.get<Animal[]>(`${this.ApiUrl}/reprodutores/`).toPromise();
    return plainToClass(Animal, data);
  }

  async obterPrevisoes(ano: number): Promise<Animal[]> {
    let data = await this.httpclient.get<Animal[]>(`${this.ApiUrl}/ciclos-reproducao?ano=${ano}`).toPromise();
    return plainToClass(Animal, data);
  }

  async obterCausaObitos(): Promise<CausaObito[]> {
    let data = await this.httpclient.get<CausaObito[]>(`${this.ApiUrl}/causa-obitos`).toPromise();
    return plainToClass(CausaObito, data);
  }

  async obterSituacoes(setor: string): Promise<Situacao[]> {
    let data = await this.httpclient.get<Situacao[]>(`${this.ApiUrl}/situacoes?setor=${setor}`).toPromise();
    return plainToClass(Situacao, data);
  }

  async obterPrograma(tipoProgramaId: number): Promise<Programa> {
    let data = await this.httpclient.get<Programa>(`${this.ApiUrl}/programa?tipoProgramaId=${tipoProgramaId}`).toPromise();
    data = plainToClass(Programa, data);
    data.itens = plainToClass(ProgramaItem, data.itens);
    return data;
  }

  async obterProgramaItensPorSituacao(situacaoId: number): Promise<ProgramaItem[]> {
    let data = await this.httpclient.get<ProgramaItem[]>(`${this.ApiUrl}/programa-itens?situacaoId=${situacaoId}`).toPromise();
    return plainToClass(ProgramaItem, data);
  }

  async obterFichaAnimal(numero: number): Promise<Animal> {
    let data = await this.httpclient.get<Animal>(`${this.ApiUrl}/animal/${numero}/ficha`).toPromise();
    return plainToClass(Animal, data);
  }

  async obterCiclosPorAnimal(id: number): Promise<CicloReproducao[]> {
    let data = await this.httpclient.get<CicloReproducao[]>(`${this.ApiUrl}/animal/${id}/ciclos-reproducao`).toPromise();
    return plainToClass(CicloReproducao, data);
  }

  async salvarAnimal(item: Animal): Promise<Animal> {
    let data = await this.httpclient.post<Animal>(`${this.ApiUrl}/animal`, item).toPromise();
    return plainToClass(Animal, data);
  }

  async atualizarAnimal(item: Animal): Promise<Animal> {
    let data = await this.httpclient.put<Animal>(`${this.ApiUrl}/animal`, item).toPromise();
    return plainToClass(Animal, data);
  }

  async removerAnimal(id: number): Promise<Animal> {
    let data = await this.httpclient.delete<Animal>(`${this.ApiUrl}/animal/${id}`).toPromise();
    return plainToClass(Animal, data);
  }

  async  salvarAcompanhamento(item: CicloReproducao): Promise<CicloReproducao> {
    let data = await this.httpclient.post<CicloReproducao>(`${this.ApiUrl}/animal/ciclo-reproducao`, item).toPromise();
    return plainToClass(CicloReproducao, data);
  }

  async atualizarAcompanhamento(item: CicloReproducao): Promise<CicloReproducao> {
    let data = await this.httpclient.put<CicloReproducao>(`${this.ApiUrl}/animal/ciclo-reproducao`, item).toPromise();
    return plainToClass(CicloReproducao, data);
  }

  async salvarProgramaItem(item: ProgramaItem): Promise<ProgramaItem> {
    let data = await this.httpclient.post<ProgramaItem>(`${this.ApiUrl}/programa-item`, item).toPromise();
    return plainToClass(ProgramaItem, data);
  }

  async atualizarProgramaItem(item: ProgramaItem): Promise<ProgramaItem> {
    let data = await this.httpclient.put<ProgramaItem>(`${this.ApiUrl}/programa-item/`, item).toPromise();
    return plainToClass(ProgramaItem, data);
  }

  async obterSituacoesQuantidades(setor: string): Promise<Situacao[]> {
    let data = await this.httpclient.get<Situacao[]>(`${this.ApiUrl}/situacoes-quantidades?setor=${setor}`).toPromise();
    return plainToClass(Situacao, data);
  }

  async removerProgramaItem(id: number): Promise<ProgramaItem> {
    let data = await this.httpclient.delete<ProgramaItem>(`${this.ApiUrl}/programa-item/${id}`).toPromise();
    return plainToClass(ProgramaItem, data);
  }
}
