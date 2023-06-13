import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InCasa } from '../model/incasa.model';
import { FuoriCasa } from '../model/fuoricasa.model';
import { Partita } from '../model/partita.model';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class PartitaService {

  constructor(private http: HttpClient, private urlService:UrlService) { }

    //url: string = `${this.urlService.localhost}/api/partita`;
    url: string = `${this.urlService.remotehost}/api/partita`;

  getPartite(): Observable<Partita>{
    return this.http.get<Partita>(this.url);
  }

  getPartitaById(id: number): Observable<Partita>{
    return this.http.get<Partita>(`${this.url}/${id}`);
  }

  getNumPartiteByCampionato(id: number): Observable<number>{
    return this.http.get<number>(`${this.url}/num-partite-campionato/${id}`);
  }

  getIdPartiteCampionato(idCampionato: number): Observable<Array<number>>{
    return this.http.get<Array<number>>(`${this.url}/partite-campionato/${idCampionato}`);
  }

  getRisultatiInCasaPartitaCampionato(idPartita: number, idCampionato: number): Observable<Array<InCasa>>{
    return this.http.get<Array<InCasa>>(`${this.url}/risultati-in-casa-partita-campionato/${idPartita}/${idCampionato}`);
  }

  getRisultatiFuoriCasaPartitaCampionato(idPartita: number, idCampionato: number): Observable<Array<FuoriCasa>>{
    return this.http.get<Array<FuoriCasa>>(`${this.url}/risultati-fuori-casa-partita-campionato/${idPartita}/${idCampionato}`);
  }

  getRisultatiInCasaPartita(idPartita: number): Observable<InCasa>{
    return this.http.get<InCasa>(`${this.url}/risultati-in-casa-partita/${idPartita}`);
  }

  getRisultatiFuoriCasaPartita(idPartita: number): Observable<FuoriCasa>{
    return this.http.get<FuoriCasa>(`${this.url}/risultati-fuori-casa-partita/${idPartita}`);
  }

  getPartiteInCasa(): Observable<Array<InCasa>>{
    return this.http.get<Array<InCasa>>(`${this.url}/partite-in-casa`);
  }

  getPartiteFuoriCasa(): Observable<Array<FuoriCasa>>{
    return this.http.get<Array<FuoriCasa>>(`${this.url}/partite-fuori-casa`);
  }

  insertPartita(partita: Partita): Observable<Partita>{
    console.log(partita)
    return this.http.post<Partita>(this.url, partita);
  }

  insertPartitaInCasa(inCasa: InCasa){
    console.log('SERVICE IN CASA',JSON.stringify(inCasa))
    return this.http.post(`${this.url}/nuova-in-casa`, inCasa);
  }

  insertPartitaFuoriCasa(fuoriCasa: FuoriCasa){
    console.log('SERVICE FUORI CASA',JSON.stringify(fuoriCasa))
    return this.http.post(`${this.url}/nuova-fuori-casa`, fuoriCasa);
  }

}
