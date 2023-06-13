import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InCasa } from '../model/incasa.model';
import { FuoriCasa } from '../model/fuoricasa.model';
import { Campionato } from '../model/campionato.model';
import { Stadio } from '../model/stadio.model';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class StadioService {

  constructor(private http: HttpClient, private urlService:UrlService) { }

  //url: string = `${this.urlService.localhost}/api/stadio`;
  url: string = `${this.urlService.remotehost}/api/stadio`;

  getStadi(): Observable<Array<Stadio>>{
    return this.http.get<Array<Stadio>>(this.url);
  }

  createStadio(stadio: Stadio): Observable<Stadio>{
    return this.http.post<Stadio>(this.url, stadio);
  }

}
