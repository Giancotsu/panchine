import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PartitaService } from 'src/app/servizi/partita.service';
import {Location} from '@angular/common';
import { Partita } from 'src/app/model/partita.model';
import { InCasa } from 'src/app/model/incasa.model';
import { FuoriCasa } from 'src/app/model/fuoricasa.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-partita-dettagli',
  templateUrl: './partita-dettagli.component.html',
  styleUrls: ['./partita-dettagli.component.css']
})
export class PartitaDettagliComponent implements OnInit{

  imgCompetizione: string = '../../../assets/img/handshake.jpg';
  imgGiocatoreCasa: string = '../../../assets/img/immagineprofilo.png';
  imgGiocatoreTrasferta: string = '../../../assets/img/immagineprofilo.png';
  mostraErrore: boolean = false;
  idPartita = this.activatedRoute.snapshot.params['id'];
  partita: Partita;
  inCasa: InCasa;
  fuoriCasa: FuoriCasa;

  isAdmin:boolean=false;

  constructor(private partitaService: PartitaService, private activatedRoute: ActivatedRoute, private route: Router, private location: Location, private auth:AuthService) { }


  ngOnInit(): void {

    this.caricaPartita();
    this.mostraDettagli();

    this.isAdmin=this.auth.isAdmin();
  }


  mostraDettagli(){

    this.partitaService.getRisultatiInCasaPartita(this.idPartita).subscribe(ris =>{
      console.log(ris);

      if(ris.giocatore.immagineProfiloUrl != null && ris.giocatore.immagineProfiloUrl != ''){
        this.imgGiocatoreCasa = ris.giocatore.immagineProfiloUrl;
      }

      if(!ris.doubleGoal){
        ris.doubleGoal = 0;
      }
      if(!ris.multiGoal){
        ris.multiGoal = 0;
      }
      if(!ris.ultraGoal){
        ris.ultraGoal = 0;
      }
      if(!ris.fantasticGoal){
        ris.fantasticGoal = 0;
      }
      if(!ris.unbelievableGoal){
        ris.unbelievableGoal = 0;
      }
      if(!ris.unbelievablePlusGoal){
        ris.unbelievablePlusGoal = 0;
      }

      this.inCasa=ris;
    })
    this.partitaService.getRisultatiFuoriCasaPartita(this.idPartita).subscribe(ris => {
      console.log(ris);

      if(ris.giocatore.immagineProfiloUrl != null && ris.giocatore.immagineProfiloUrl != ''){
        this.imgGiocatoreTrasferta = ris.giocatore.immagineProfiloUrl;
      }

      if(!ris.doubleGoal){
        ris.doubleGoal = 0;
      }
      if(!ris.multiGoal){
        ris.multiGoal = 0;
      }
      if(!ris.ultraGoal){
        ris.ultraGoal = 0;
      }
      if(!ris.fantasticGoal){
        ris.fantasticGoal = 0;
      }
      if(!ris.unbelievableGoal){
        ris.unbelievableGoal = 0;
      }
      if(!ris.unbelievablePlusGoal){
        ris.unbelievablePlusGoal = 0;
      }

      this.fuoriCasa=ris;

    })

  }

  caricaPartita(){
    this.partitaService.getPartitaById(this.idPartita).subscribe(ris =>{
      this.partita = ris;
      switch(this.partita.campionato.tipoCompetizione){

        case 'SERIE_A':
          this.partita.campionato.tipoCompetizione = 'SERIE A';
          this.imgCompetizione = '../../../assets/img/serie-a-logo.png';
          break;

        case 'CHAMPIONS_LEAGUE':
          this.partita.campionato.tipoCompetizione = 'UEFA CHAMPIONS LEAGUE';
          this.imgCompetizione = '../../../assets/img/UEFA_Champions_League.jpg';
          break;

        default:
          this.partita.campionato.tipoCompetizione = 'CAMPIONATO AMICHEVOLE';
          this.imgCompetizione = '../../../assets/img/handshake.jpg';
          break;
      }
      console.log('partita',this.partita);
    });
  }

  modificaPartita(){}

  eliminaPartita(){}

  tornaIndietro(){
    this.location.back();
  }

}
