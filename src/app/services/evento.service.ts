import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoEvento } from '../models/tipoEvento';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})

export class EventoService {

  ApiUrl = 'http://localhost:5000/api/evento';
  constructor(private httpclient: HttpClient) { }

  obterEventos(): Observable<Evento[]> {
    return this.httpclient.get<Evento[]>(`${this.ApiUrl}/evento`);
  }

  obterTiposDeEventos(): Observable<TipoEvento[]> {
    return this.httpclient.get<TipoEvento[]>(this.ApiUrl + '/evento/tipos');
  }

  obterEvento(id: number): Observable<Evento> {
    return this.httpclient.get<Evento>(this.ApiUrl + '/evento/' + id);
  }

  salvarEvento(item: Evento): Observable<Evento> {
    return this.httpclient.post<Evento>(this.ApiUrl + '/evento/', item);
  }

  atualizarEvento(item: Evento): Observable<Evento> {
    return this.httpclient.put<Evento>(this.ApiUrl + '/evento/', item);
  }

  removerEvento(id: number): Observable<Evento> {
    return this.httpclient.delete<Evento>(this.ApiUrl + '/evento/' + id);
  }
}
