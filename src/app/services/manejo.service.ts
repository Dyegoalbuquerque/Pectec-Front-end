import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Tag, ProgramaItem, Programa, CicloReproducao, Animal, CausaObito
} from '../models';
import { plainToClass } from "class-transformer";
import { RelatorioUpl } from '../models/relatorioUpl';
import { Acontecimento } from '../models/acontecimento';
import { AcontecimentoItem } from '../models/acontecimentoItem';
import { CicloCrescimento } from '../models/cicloCrescimento';
import { RelatorioUC } from '../models/relatorioUC';

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

  async obterCiclosReproducao(ano: number): Promise<Animal[]> {
    let data = await this.httpclient.get<Animal[]>(`${this.ApiUrl}/ciclos-reproducao?ano=${ano}`).toPromise();
    return plainToClass(Animal, data);
  }

  async obterCiclosCrescimento(): Promise<CicloCrescimento[]> {
    let data = await this.httpclient.get<CicloCrescimento[]>(`${this.ApiUrl}/ciclos-crescimento/ativo`).toPromise();
    return plainToClass(CicloCrescimento, data);
  }

  async obterCausaObitos(): Promise<CausaObito[]> {
    let data = await this.httpclient.get<CausaObito[]>(`${this.ApiUrl}/causa-obitos`).toPromise();
    return plainToClass(CausaObito, data);
  }

  async obterTags(setor: string): Promise<Tag[]> {
    let data = await this.httpclient.get<Tag[]>(`${this.ApiUrl}/tags?setor=${setor}`).toPromise();
    return plainToClass(Tag, data);
  }

  async obterPrograma(tipoPrograma: string): Promise<Programa> {
    let data = await this.httpclient.get<Programa>(`${this.ApiUrl}/programa?tipoPrograma=${tipoPrograma}`).toPromise();
    data = plainToClass(Programa, data);
    data.itens = plainToClass(ProgramaItem, data.itens);
    return data;
  }

  async obterProgramaItensPorTag(tagId: number): Promise<ProgramaItem[]> {
    let data = await this.httpclient.get<ProgramaItem[]>(`${this.ApiUrl}/programa-itens?tagId=${tagId}`).toPromise();
    return plainToClass(ProgramaItem, data);
  }

  async obterFichaAnimal(numero: number): Promise<Animal> {
    let data = await this.httpclient.get<Animal>(`${this.ApiUrl}/animal/${numero}/ficha`).toPromise();
    return plainToClass(Animal, data);
  }

  async obterCicloAtivoPorAnimal(id: number): Promise<CicloReproducao[]> {
    let data = await this.httpclient.get<CicloReproducao[]>(`${this.ApiUrl}/animal/${id}/ciclos-reproducao/ativo`).toPromise();
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

  async obterTagsQuantidades(setor: string): Promise<Tag[]> {
    let data = await this.httpclient.get<Tag[]>(`${this.ApiUrl}/tags-quantidades?setor=${setor}`).toPromise();
    return plainToClass(Tag, data);
  }

  async removerProgramaItem(id: number): Promise<ProgramaItem> {
    let data = await this.httpclient.delete<ProgramaItem>(`${this.ApiUrl}/programa-item/${id}`).toPromise();
    return plainToClass(ProgramaItem, data);
  }

  async obterRelatorioUpl(dataInicial: string, dataFinal: string): Promise<RelatorioUpl> {
    let data = await this.httpclient.get<RelatorioUpl>(`${this.ApiUrl}/relatorios/upl?dataInicial=${dataInicial}&dataFinal=${dataFinal}`).toPromise();
    return plainToClass(RelatorioUpl, data);
  }

  async obterRelatorioUC(dataInicial: string, dataFinal: string): Promise<RelatorioUC> {
    let data = await this.httpclient.get<RelatorioUC>(`${this.ApiUrl}/relatorios/uc?dataInicial=${dataInicial}&dataFinal=${dataFinal}`).toPromise();
    return plainToClass(RelatorioUC, data);
  }

  async obterAcontecimentos(dataInicial: string, dataFinal: string): Promise<AcontecimentoItem[]> {
    let data = await this.httpclient.get<AcontecimentoItem[]>(`${this.ApiUrl}/acontecimentos?dataInicio=${dataInicial}&dataFinal=${dataFinal}`).toPromise();
    data = plainToClass(AcontecimentoItem, data);
    return data;
  }
}
