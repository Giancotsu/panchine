import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassificaModel } from 'src/app/model/classifica.model';
import { FuoriCasa } from 'src/app/model/fuoricasa.model';
import { InCasa } from 'src/app/model/incasa.model';
import { CampionatoService } from 'src/app/servizi/campionato.service';
import { GiocatoreService } from 'src/app/servizi/giocatore.service';
import { PartitaService } from 'src/app/servizi/partita.service';
import {Location} from '@angular/common';

type T = keyof ClassificaModel;

@Component({
  selector: 'app-classifica-dettagli',
  templateUrl: './classifica-dettagli.component.html',
  styleUrls: ['./classifica-dettagli.component.css']
})
export class ClassificaDettagliComponent extends Array  implements OnInit{

  idCampionato: any;
  campionatoDettagli: any;
  imgCompetizione: string = '../../../assets/img/handshake.png';
  partecipantiCompetizione: any[] = [];
  displayedColumns: string[] = ['nome', 'cognome', 'eta'];
  displayedColumnsClassifica: T[] = ['nomeGiocatore', 'cognomeGiocatore', 'vittorie', 'pareggi', 'sconfitte', 'goalFatti', 'goalSubiti', 'tiriTotali', 'punti'];
  tabellaClassifica: string[] = ['nome', 'cognome', 'v', 'p', 's', 'gf', 'gs', 'tiri', 'punti'];
  tabellaPartite: string[] = ['in casa', 'risultato', 'trasferta', 'data'];
  totaleIC: InCasa[] = [];
  totaleFC: FuoriCasa[] = [];
  totale: ClassificaModel[] = [];
  caricato: boolean = false;
  partiteCaricate: boolean = false;
  classifica: ClassificaModel[] = [];

  partiteIC: InCasa[] = [];
  partiteFC: FuoriCasa[] = [];

  constructor(private campionatoService: CampionatoService, private giocatoreService: GiocatoreService, private partitaService: PartitaService,private activatedRoute: ActivatedRoute, private route: Router, private location: Location) {
    super();
  }


  ngOnInit(): void {
    this.idCampionato = this.activatedRoute.snapshot.params['id'];
    this.dettagliCampionato(this.idCampionato);
    this.vediPartecipanti();
    this.mostraPartite();
    this.mostraClassifica(this.idCampionato);
  }

  dettagliCampionato(idCampionato: any){
    this.campionatoService.getCampionatoById(idCampionato).subscribe(
      campionato => {
        this.campionatoDettagli = campionato;
        switch(this.campionatoDettagli.tipoCompetizione){

          case 'SERIE_A':
            this.campionatoDettagli.tipoCompetizione = 'SERIE A';
            this.imgCompetizione = '../../../assets/img/serie-a-logo.png';
            break;

          case 'CHAMPIONS_LEAGUE':
            this.campionatoDettagli.tipoCompetizione = 'UEFA CHAMPIONS LEAGUE';
            this.imgCompetizione = '../../../assets/img/UEFA_Champions_League.jpg';
            break;

          default:
            this.campionatoDettagli.tipoCompetizione = 'CAMPIONATO AMICHEVOLE';
            this.imgCompetizione = '../../../assets/img/handshake.png';
            break;
        }
      })
  }

  mostraClassifica(idCampionato: number){
    this.campionatoService.getClassifica(idCampionato).subscribe(risposta => {
      console.log('classifica',risposta)
      this.classifica = risposta
    });
  }

  vediPartecipanti(){

    this.campionatoService.getPartecipanti(this.idCampionato).subscribe(async (idGiocatori) =>
      {
        for(let idGiocatore of idGiocatori){
          this.giocatoreService.getGiocatoreById(idGiocatore).subscribe((gioc) => {
            this.partecipantiCompetizione.push(gioc);
          })
        }
        return idGiocatori;
      });
  }

  tornaIndietro(){
    this.location.back();
  }

  mostraPartite(){
    let idPartite;
    let numPartite: number;


    this.partitaService.getIdPartiteCampionato(this.idCampionato).subscribe(res => {
      idPartite=res;

      for(let i=0; i<idPartite.length; i++){
        this.partitaService.getRisultatiInCasaPartitaCampionato(idPartite[i], this.idCampionato).subscribe(res => {
          this.partiteIC[i]=res[0];
          console.log(this.partiteIC)
        });
        this.partitaService.getRisultatiFuoriCasaPartitaCampionato(idPartite[i], this.idCampionato).subscribe(res => {
          this.partiteFC[i]=res[0];
          console.log(this.partiteFC)
        });
      }

      this.partiteCaricate = true;
    });
  }

  dettagliPartita(i: number){
    console.log(i);
    this.route.navigate(['partita', i])
  }

  dettagliGiocatore(i: number){
    console.log(i);
    this.route.navigate(['giocatori', i])
  }

}
