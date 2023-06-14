import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Campionato } from 'src/app/model/campionato.model';
import { Carriera } from 'src/app/model/carriera.model';
import { FuoriCasa } from 'src/app/model/fuoricasa.model';
import { Giocatore } from 'src/app/model/giocatore.model';
import { InCasa } from 'src/app/model/incasa.model';
import { Partita } from 'src/app/model/partita.model';
import { RecordGiocatore } from 'src/app/model/record.model';
import { Stadio } from 'src/app/model/stadio.model';
import { Statistiche } from 'src/app/model/statistiche.model';
import { CampionatoService } from 'src/app/servizi/campionato.service';
import { GiocatoreService } from 'src/app/servizi/giocatore.service';
import { PartitaService } from 'src/app/servizi/partita.service';
import { StadioService } from 'src/app/servizi/stadio.service';

@Component({
  selector: 'app-aggiungi-partita',
  templateUrl: './aggiungi-partita.component.html',
  styleUrls: ['./aggiungi-partita.component.css'],
})
export class AggiungiPartitaComponent implements OnInit{

  partitaform: FormGroup | any;
  giocatore: Giocatore | undefined;
  statistiche: Statistiche | undefined;
  carriera: Carriera | undefined;
  record: RecordGiocatore | undefined;
  campionati: Campionato[];
  stadi: Stadio[];
  giocatori: Giocatore[];
  nuovaPartita: Partita | undefined;
  caricamento: Boolean = false;
  nuovoIC: InCasa | undefined
  nuovoFC: FuoriCasa | undefined
  goalMinutoNumberIC: number[] = [];
  goalMinutoNumberFC: number[] = [];

  constructor(private partitaService: PartitaService, private campionatoService: CampionatoService, private stadioService: StadioService, private giocatoreService: GiocatoreService, private router: Router){}

  ngOnInit(): void {

    this.caricaCampionati();
    this.caricaStadi();
    this.caricaGiocatori();

    this.partitaform = new FormGroup({

      //partita
      dataPartita: new FormControl(null, [Validators.required]),
      calcioInizio: new FormControl(null, [Validators.required]),
      durataPartita: new FormControl(null, [Validators.required, Validators.min(5), Validators.max(60)]),
      campionato: new FormControl(null, [Validators.required]),
      stadio: new FormControl(null, [Validators.required]),

      //risultati
      giocatoreIC: new FormControl(null, [Validators.required]),
      goalFattiIC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      goalSubitiIC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      tiriTotaliIC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1000)]),
      tiriPortaIC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1000)]),
      paliIC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      punizioniIC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      rigoriIC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      doubleGoalIC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      multiGoalIC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      ultraGoalIC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      fantasticGoalIC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      unbelievableGoalIC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      unbelievablePlusGoalIC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      goalMinutoIC: new FormControl(),

      giocatoreFC: new FormControl(null, [Validators.required]),
      goalFattiFC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      goalSubitiFC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      tiriTotaliFC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1000)]),
      tiriPortaFC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1000)]),
      paliFC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      punizioniFC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      rigoriFC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      doubleGoalFC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      multiGoalFC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      ultraGoalFC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      fantasticGoalFC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      unbelievableGoalFC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      unbelievablePlusGoalFC: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
      goalMinutoFC: new FormControl()
    })
  }

  caricaCampionati(){
    this.campionatoService.getCampionati().subscribe(ris=>{
      this.campionati=ris;
      console.log(this.campionati);
    })
  }

  caricaStadi(){
    this.stadioService.getStadi().subscribe(ris=>{
      this.stadi=ris;
      console.log(this.stadi);
    })
  }

  caricaGiocatori(){
    this.giocatoreService.getGiocatori().subscribe(ris=>{
      this.giocatori=ris;
      console.log(this.giocatori);
    })
  }

  onSubmit(){
    let dd:string = this.partitaform.value.dataPartita.getDate().toString();
    let MM:string = (this.partitaform.value.dataPartita.getMonth()+1).toString();
    let yyyy = this.partitaform.value.dataPartita.getFullYear();

    if(dd.length == 1){
      dd = `0${dd}`;
    }
    if(MM.length == 1){
      MM = `0${MM}`;
    }

    console.log('data rifatta', `${dd}-${MM}-${yyyy}`)

    if(this.partitaform.value.goalMinutoIC){
      let goalMinutoStringIC: string[] = this.partitaform.value.goalMinutoIC.split(",");
      goalMinutoStringIC.forEach(ele => this.goalMinutoNumberIC.push(+ele));
    }

    if(this.partitaform.value.goalMinutoFC){
      let goalMinutoStringFC: string[] = this.partitaform.value.goalMinutoFC.split(",");
      goalMinutoStringFC.forEach(ele => this.goalMinutoNumberFC.push(+ele));
    }


    console.error(this.goalMinutoNumberIC, this.goalMinutoNumberFC)

    this.caricamento = true;

    this.nuovaPartita = new Partita;
    this.nuovaPartita.calcioInizio = this.partitaform.value.calcioInizio;
    this.nuovaPartita.dataPartita = `${dd}-${MM}-${yyyy}`;
    this.nuovaPartita.durataPartita = this.partitaform.value.durataPartita;
    this.nuovaPartita.campionato = this.partitaform.value.campionato;
    this.nuovaPartita.stadio = this.partitaform.value.stadio;

    this.partitaService.insertPartita(this.nuovaPartita).subscribe(response =>
      {
        console.log(response)
        this.salvaInCasa(response);
        this.salvaFuoriCasa(response);
      });



    setTimeout(() => {
      this.caricamento = false;
      this.router.navigate(['partite']);
    }, 1000);
  }

  salvaInCasa(partita: Partita){
    this.nuovoIC = new InCasa;
    this.nuovoIC.giocatore = this.partitaform.value.giocatoreIC;
    this.nuovoIC.partita = partita;
    this.nuovoIC.goalFatti = this.partitaform.value.goalFattiIC;
    this.nuovoIC.goalSubiti = this.partitaform.value.goalSubitiIC;
    this.nuovoIC.tiriTotali = this.partitaform.value.tiriTotaliIC;
    this.nuovoIC.tiriPorta = this.partitaform.value.tiriPortaIC;
    this.nuovoIC.pali = this.partitaform.value.paliIC;
    this.nuovoIC.punizioni = this.partitaform.value.punizioniIC;
    this.nuovoIC.rigori = this.partitaform.value.rigoriIC;
    this.nuovoIC.doubleGoal = this.partitaform.value.doubleGoalIC;
    this.nuovoIC.multiGoal = this.partitaform.value.multiGoalIC;
    this.nuovoIC.ultraGoal = this.partitaform.value.ultraGoalIC;
    this.nuovoIC.fantasticGoal = this.partitaform.value.fantasticGoalIC;
    this.nuovoIC.unbelievableGoal = this.partitaform.value.unbelievableGoalIC;
    this.nuovoIC.unbelievablePlusGoal = this.partitaform.value.unbelievablePlusGoalIC;
    this.nuovoIC.goalMinuto = this.goalMinutoNumberIC;

    this.partitaService.insertPartitaInCasa(this.nuovoIC).subscribe(response => console.log(response));

    this.aggiornaStatisticheGiocatore("casa");
  }

  salvaFuoriCasa(partita: Partita){
    this.nuovoFC = new FuoriCasa;
    this.nuovoFC.giocatore = this.partitaform.value.giocatoreFC;
    this.nuovoFC.partita = partita;
    this.nuovoFC.goalFatti = this.partitaform.value.goalFattiFC;
    this.nuovoFC.goalSubiti = this.partitaform.value.goalSubitiFC;
    this.nuovoFC.tiriTotali = this.partitaform.value.tiriTotaliFC;
    this.nuovoFC.tiriPorta = this.partitaform.value.tiriPortaFC;
    this.nuovoFC.pali = this.partitaform.value.paliFC;
    this.nuovoFC.punizioni = this.partitaform.value.punizioniFC;
    this.nuovoFC.rigori = this.partitaform.value.rigoriFC;
    this.nuovoFC.doubleGoal = this.partitaform.value.doubleGoalFC;
    this.nuovoFC.multiGoal = this.partitaform.value.multiGoalFC;
    this.nuovoFC.ultraGoal = this.partitaform.value.ultraGoalFC;
    this.nuovoFC.fantasticGoal = this.partitaform.value.fantasticGoalFC;
    this.nuovoFC.unbelievableGoal = this.partitaform.value.unbelievableGoalFC;
    this.nuovoFC.unbelievablePlusGoal = this.partitaform.value.unbelievablePlusGoalFC;
    this.nuovoFC.goalMinuto = this.goalMinutoNumberFC;

    this.partitaService.insertPartitaFuoriCasa(this.nuovoFC).subscribe(response => console.log(response));

    this.aggiornaStatisticheGiocatore("trasferta");
  }

  aggiornaStatisticheGiocatore(casaOTrasferta: string){

    if(casaOTrasferta === "casa"){
      this.giocatoreService.getGiocatoreById(this.nuovoIC?.giocatore.idGiocatore).subscribe(giocatore => {

        //AGGIORNO LA CARRIERA
        if(this.partitaform.value.campionato.tipoCompetizione == "AMICHEVOLE"){
          if(this.partitaform.value.goalFattiIC>this.partitaform.value.goalSubitiIC){
            giocatore.carriera.vittorie++;
          }
          if(this.partitaform.value.goalFattiIC==this.partitaform.value.goalSubitiIC){
            giocatore.carriera.pareggi++;
          }
          if(this.partitaform.value.goalFattiIC<this.partitaform.value.goalSubitiIC){
            giocatore.carriera.sconfitte++;
          }
          giocatore.carriera.partiteGiocate++;
          giocatore.carriera.goalFatti += this.partitaform.value.goalFattiIC;
          giocatore.carriera.goalSubiti += this.partitaform.value.goalSubitiIC;
        }

        if(this.partitaform.value.campionato.tipoCompetizione == "SERIE_A"){
          if(this.partitaform.value.goalFattiIC>this.partitaform.value.goalSubitiIC){
            giocatore.carriera.vittorie++;
            giocatore.carriera.vittorieA++;
            giocatore.carriera.puntiA += 3;
          }
          if(this.partitaform.value.goalFattiIC==this.partitaform.value.goalSubitiIC){
            giocatore.carriera.pareggi++;
            giocatore.carriera.pareggiA++;
            giocatore.carriera.puntiA += 1;
          }
          if(this.partitaform.value.goalFattiIC<this.partitaform.value.goalSubitiIC){
            giocatore.carriera.sconfitte++;
            giocatore.carriera.sconfitteA++;
          }
          giocatore.carriera.partiteGiocate++;
          giocatore.carriera.partiteGiocateA++;
          giocatore.carriera.goalFatti += this.partitaform.value.goalFattiIC;
          giocatore.carriera.goalSubiti += this.partitaform.value.goalSubitiIC;
          giocatore.carriera.goalFattiA += this.partitaform.value.goalFattiIC;
          giocatore.carriera.goalSubitiA += this.partitaform.value.goalSubitiIC;
        }

        if(this.partitaform.value.campionato.tipoCompetizione == "CHAMPIONS_LEAGUE"){
          if(this.partitaform.value.goalFattiIC>this.partitaform.value.goalSubitiIC){
            giocatore.carriera.vittorie++;
            giocatore.carriera.vittorieChamp++;
            giocatore.carriera.puntiChamp += 3;
          }
          if(this.partitaform.value.goalFattiIC==this.partitaform.value.goalSubitiIC){
            giocatore.carriera.pareggi++;
            giocatore.carriera.pareggiChamp++;
            giocatore.carriera.puntiChamp += 1;
          }
          if(this.partitaform.value.goalFattiIC<this.partitaform.value.goalSubitiIC){
            giocatore.carriera.sconfitte++;
            giocatore.carriera.sconfitteChamp++;
          }
          giocatore.carriera.partiteGiocate++;
          giocatore.carriera.partiteGiocateChamp++;
          giocatore.carriera.goalFatti += this.partitaform.value.goalFattiIC;
          giocatore.carriera.goalSubiti += this.partitaform.value.goalSubitiIC;
          giocatore.carriera.goalFattiChamp += this.partitaform.value.goalFattiIC;
          giocatore.carriera.goalSubitiChamp += this.partitaform.value.goalSubitiIC;
        }

        //AGGIORNO I RECORD
        giocatore.record.doubleGoal += this.partitaform.value.doubleGoalIC;
        giocatore.record.multiGoal += this.partitaform.value.multiGoalIC;
        giocatore.record.ultraGoal += this.partitaform.value.ultraGoalIC;
        giocatore.record.fantasticGoal += this.partitaform.value.fantasticGoalIC;
        giocatore.record.unbelievableGoal += this.partitaform.value.unbelievableGoalIC;
        giocatore.record.unbelievablePlusGoal += this.partitaform.value.unbelievablePlusGoalIC;
        giocatore.record.recordGoalPunizione += this.partitaform.value.punizioniIC;
        giocatore.record.recordGoalRigore += this.partitaform.value.rigoriIC;

        this.giocatoreService.modificaGiocatore(giocatore).subscribe(response => console.log(response));
      })
    }

    if(casaOTrasferta === "trasferta"){
      this.giocatoreService.getGiocatoreById(this.nuovoFC?.giocatore.idGiocatore).subscribe(giocatore => {

        //AGGIORNO LA CARRIERA
        if(this.partitaform.value.campionato.tipoCompetizione == "AMICHEVOLE"){
          if(this.partitaform.value.goalFattiFC>this.partitaform.value.goalSubitiFC){
            giocatore.carriera.vittorie++;
          }
          if(this.partitaform.value.goalFattiFC==this.partitaform.value.goalSubitiFC){
            giocatore.carriera.pareggi++;
          }
          if(this.partitaform.value.goalFattiFC<this.partitaform.value.goalSubitiFC){
            giocatore.carriera.sconfitte++;
          }
          giocatore.carriera.partiteGiocate++;
          giocatore.carriera.goalFatti += this.partitaform.value.goalFattiFC;
          giocatore.carriera.goalSubiti += this.partitaform.value.goalSubitiFC;
        }

        if(this.partitaform.value.campionato.tipoCompetizione == "SERIE_A"){
          if(this.partitaform.value.goalFattiFC>this.partitaform.value.goalSubitiFC){
            giocatore.carriera.vittorie++;
            giocatore.carriera.vittorieA++;
            giocatore.carriera.puntiA += 3;
          }
          if(this.partitaform.value.goalFattiFC==this.partitaform.value.goalSubitiFC){
            giocatore.carriera.pareggi++;
            giocatore.carriera.pareggiA++;
            giocatore.carriera.puntiA += 1;
          }
          if(this.partitaform.value.goalFattiFC<this.partitaform.value.goalSubitiFC){
            giocatore.carriera.sconfitte++;
            giocatore.carriera.sconfitteA++;
          }
          giocatore.carriera.partiteGiocate++;
          giocatore.carriera.partiteGiocateA++;
          giocatore.carriera.goalFatti += this.partitaform.value.goalFattiFC;
          giocatore.carriera.goalSubiti += this.partitaform.value.goalSubitiFC;
          giocatore.carriera.goalFattiA += this.partitaform.value.goalFattiFC;
          giocatore.carriera.goalSubitiA += this.partitaform.value.goalSubitiFC;
        }

        if(this.partitaform.value.campionato.tipoCompetizione == "CHAMPIONS_LEAGUE"){
          if(this.partitaform.value.goalFattiFC>this.partitaform.value.goalSubitiFC){
            giocatore.carriera.vittorie++;
            giocatore.carriera.vittorieChamp++;
            giocatore.carriera.puntiChamp += 3;
          }
          if(this.partitaform.value.goalFattiFC==this.partitaform.value.goalSubitiFC){
            giocatore.carriera.pareggi++;
            giocatore.carriera.pareggiChamp++;
            giocatore.carriera.puntiChamp += 1;
          }
          if(this.partitaform.value.goalFattiFC<this.partitaform.value.goalSubitiFC){
            giocatore.carriera.sconfitte++;
            giocatore.carriera.sconfitteChamp++;
          }
          giocatore.carriera.partiteGiocate++;
          giocatore.carriera.partiteGiocateChamp++;
          giocatore.carriera.goalFatti += this.partitaform.value.goalFattiFC;
          giocatore.carriera.goalSubiti += this.partitaform.value.goalSubitiFC;
          giocatore.carriera.goalFattiChamp += this.partitaform.value.goalFattiFC;
          giocatore.carriera.goalSubitiChamp += this.partitaform.value.goalSubitiFC;
        }

        //AGGIORNO I RECORD
        giocatore.record.doubleGoal += this.partitaform.value.doubleGoalFC;
        giocatore.record.multiGoal += this.partitaform.value.multiGoalFC;
        giocatore.record.ultraGoal += this.partitaform.value.ultraGoalFC;
        giocatore.record.fantasticGoal += this.partitaform.value.fantasticGoalFC;
        giocatore.record.unbelievableGoal += this.partitaform.value.unbelievableGoalFC;
        giocatore.record.unbelievablePlusGoal += this.partitaform.value.unbelievablePlusGoalFC;
        giocatore.record.recordGoalPunizione += this.partitaform.value.punizioniFC;
        giocatore.record.recordGoalRigore += this.partitaform.value.rigoriFC;

        this.giocatoreService.modificaGiocatore(giocatore).subscribe(response => console.log(response));
      })

    }

  }

  annulla(){
    this.router.navigate(['partite']);
  }
}
