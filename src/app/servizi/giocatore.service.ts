import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Giocatore } from '../model/giocatore.model';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class GiocatoreService {

  constructor(private http: HttpClient, private urlService:UrlService) { }

    //url: string = `${this.urlService.localhost}/api/giocatore`;
    url: string = `${this.urlService.remotehost}/api/giocatore`;

  insertGiocatore(giocatore: Giocatore){
    return this.http.post(this.url, giocatore);
  }

  modificaGiocatore(giocatore: Giocatore){
    return this.http.put(this.url, giocatore);
  }

  getGiocatori(): Observable<Array<Giocatore>>{
    return this.http.get<Array<Giocatore>>(this.url);
  }

  getGiocatoreById(id: number): Observable<Giocatore>{
    return this.http.get<Giocatore>(`${this.url}/${id}`);
  }

  eliminaGiocatore(giocatore: Giocatore){

    return this.http.delete(this.url, {body: giocatore} )
  }

  eliminaGiocatoreById(id: number){

    return this.http.delete(`${this.url}/${id}`)
  }
}
