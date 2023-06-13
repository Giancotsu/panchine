import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InCasa } from '../model/incasa.model';
import { FuoriCasa } from '../model/fuoricasa.model';
import { Campionato } from '../model/campionato.model';
import { ClassificaModel } from '../model/classifica.model';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class CampionatoService {

  constructor(private http: HttpClient, private urlService:UrlService) { }

  //url: string = `${this.urlService.localhost}/api/campionato`;
  url: string = `${this.urlService.remotehost}/api/campionato`;

  getCampionati(): Observable<Array<Campionato>>{
    return this.http.get<Array<Campionato>>(this.url);
  }

  getClassifica(idCampionato: number): Observable<Array<ClassificaModel>>{
    return this.http.get<Array<ClassificaModel>>(`${this.url}/classifica/${idCampionato}`);
  }

  getCampionatoById(id: number): Observable<Object>{
    return this.http.get(`${this.url}/${id}`);
  }

  getPartiteGiocate(id: number): Observable<number>{
    return this.http.get<number>(`${this.url}/partite-giocate/${id}`);
  }

  getPartecipanti(id: number): Observable<Array<number>>{
    return this.http.get<Array<number>>(`${this.url}/partecipanti/${id}`);
  }

  getRisultatiInCasa(idGiocatore: number, idCampionato: number): Observable<Array<InCasa>>{
    return this.http.get<Array<InCasa>>(`${this.url}/risultati-in-casa/${idGiocatore}/${idCampionato}`);
  }

  getRisultatiFuoriCasa(idGiocatore: number, idCampionato: number): Observable<Array<FuoriCasa>>{
    return this.http.get<Array<FuoriCasa>>(`${this.url}/risultati-fuori-casa/${idGiocatore}/${idCampionato}`);
  }

  insertCampionato(campionato: Campionato){
    console.log('SERVICE CAMPIONATO',JSON.stringify(campionato))
    return this.http.post(this.url, campionato);
  }
}
