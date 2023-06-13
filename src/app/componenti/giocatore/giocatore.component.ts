import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { GiocatoreService } from 'src/app/servizi/giocatore.service';

@Component({
  selector: 'app-giocatore',
  templateUrl: './giocatore.component.html',
  styleUrls: ['./giocatore.component.css']
})
export class GiocatoreComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'cognome', 'eta'];
  giocatori: any

  showStatistiche: Boolean = true;
  showRecord: Boolean = false;
  showCarriera: Boolean = false;

  giocatoreDettagli: any
  isAdmin:boolean = false;

  constructor(private giocatoreService: GiocatoreService, private route: Router, private auth:AuthService) { }

  ngOnInit(): void {

    this.giocatoreService.getGiocatori().subscribe((dati: any) =>
      {
        console.log(dati)
        this.giocatori = dati
      }
    );

    this.isAdmin = this.auth.isAdmin();
  }

  handleResponse(response: Object){
    console.log(response);

  }

  listaGiocatori(){
    this.giocatoreService.getGiocatori().subscribe(response => this.handleResponse(response));
  }

  vediDettagli(giocatore: any){
    this.route.navigate(['giocatori', giocatore.idGiocatore])
  }

  creaGiocatore(){
    this.route.navigate(['aggiungi-giocatore'])
  }


}
