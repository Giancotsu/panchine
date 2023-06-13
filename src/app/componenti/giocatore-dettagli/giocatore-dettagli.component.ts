import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GiocatoreService } from 'src/app/servizi/giocatore.service';
import {Location} from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-giocatore-dettagli',
  templateUrl: './giocatore-dettagli.component.html',
  styleUrls: ['./giocatore-dettagli.component.css']
})
export class GiocatoreDettagliComponent implements OnInit{

  showStatistiche: Boolean = true;
  showRecord: Boolean = false;
  showCarriera: Boolean = false;
  mostraErrore: Boolean = false;

  idGiocatore: any
  giocatoreDettagli: any

  isAdmin:boolean = false;


  constructor(private giocatoreService: GiocatoreService, private activatedRoute: ActivatedRoute, private route: Router, private location: Location, private auth:AuthService) { }


  ngOnInit(): void {
    this.idGiocatore = this.activatedRoute.snapshot.params['id'];
    this.dettagliGiocatore(this.idGiocatore)

    this.isAdmin = this.auth.isAdmin();
  }

  dettagliGiocatore(idGiocatore: any){
    this.giocatoreService.getGiocatoreById(idGiocatore).subscribe(
      giocatore => {
        console.log(giocatore);
        this.giocatoreDettagli = giocatore;
        if(this.giocatoreDettagli.immagineProfiloUrl == null){
          this.giocatoreDettagli.immagineProfiloUrl = '../../../assets/img/immagineprofilo.png'
          console.log( this.giocatoreDettagli);
        }
      })

  }

  mostraStatistiche(){
    this.showStatistiche = true;
    this.showRecord = false;
    this.showCarriera = false;
  }

  mostraRecord(){
    this.showStatistiche = false;
    this.showRecord = true;
    this.showCarriera = false;
  }

  mostraCarriera(){
    this.showStatistiche = false;
    this.showRecord = false;
    this.showCarriera = true;
  }

  tornaIndietro(){
    this.location.back();
  }

  eliminaGiocatore(){
    this.giocatoreService.eliminaGiocatore(this.giocatoreDettagli).subscribe(
      (response)=>{
        console.log(response);
        this.route.navigate(['giocatori'])
      },
    (error) => {
      console.log(error);
      this.mostraErrore=true;
    });
  }

  modificaGiocatore(){
    this.route.navigate(['modifica-giocatore', this.giocatoreDettagli.idGiocatore])
    console.log(this.giocatoreDettagli.idGiocatore)
  }

}
