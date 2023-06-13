import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Carriera } from 'src/app/model/carriera.model';
import { Giocatore } from 'src/app/model/giocatore.model';
import { RecordGiocatore } from 'src/app/model/record.model';
import { Statistiche } from 'src/app/model/statistiche.model';
import { GiocatoreService } from 'src/app/servizi/giocatore.service';


@Component({
  selector: 'app-aggiungi-giocatore',
  templateUrl: './aggiungi-giocatore.component.html',
  styleUrls: ['./aggiungi-giocatore.component.css']
})
export class AggiungiGiocatoreComponent implements OnInit{

  giocatoreForm: FormGroup | any
  giocatore: Giocatore | undefined
  statistiche: Statistiche | undefined
  carriera: Carriera | undefined
  record: RecordGiocatore | undefined

  caricamento: Boolean = false;

  constructor(private giocatoreService: GiocatoreService, private router: Router){}

  ngOnInit(): void {
    this.giocatoreForm = new FormGroup({

      //generalità
      nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      cognome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      eta: new FormControl(null, [Validators.required, Validators.min(14), Validators.max(50)]),
      immagineProfiloUrl: new FormControl(null),

      //statistiche
      velocita: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      finalizzazione: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      potenzaTiro: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      tiroDistanza: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      tiroVolo: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      rigori: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      precisioneTiro: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      dribbling: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      intercettazione: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      contrasto: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      resistenza: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      forzaFisica: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),

      //carriera
      scudetti: new FormControl(0, [Validators.required, Validators.min(0)]),
      champions: new FormControl(0, [Validators.required, Validators.min(0)]),
      coppe: new FormControl(0, [Validators.required, Validators.min(0)]),
      partiteGiocate: new FormControl(0, [Validators.required, Validators.min(0)]),
      vittorie: new FormControl(0, [Validators.required, Validators.min(0)]),
      pareggi: new FormControl(0, [Validators.required, Validators.min(0)]),
      sconfitte: new FormControl(0, [Validators.required, Validators.min(0)]),
      goalFatti: new FormControl(0, [Validators.required, Validators.min(0)]),
      goalSubiti: new FormControl(0, [Validators.required, Validators.min(0)]),
      partiteGiocateA: new FormControl(0, [Validators.required, Validators.min(0)]),
      vittorieA: new FormControl(0, [Validators.required, Validators.min(0)]),
      pareggiA: new FormControl(0, [Validators.required, Validators.min(0)]),
      sconfitteA: new FormControl(0, [Validators.required, Validators.min(0)]),
      goalFattiA: new FormControl(0, [Validators.required, Validators.min(0)]),
      goalSubitiA: new FormControl(0, [Validators.required, Validators.min(0)]),
      puntiA: new FormControl(0, [Validators.required, Validators.min(0)]),
      puntiChamp: new FormControl(0, [Validators.required, Validators.min(0)]),
      partiteGiocateChamp: new FormControl(0, [Validators.required, Validators.min(0)]),
      vittorieChamp: new FormControl(0, [Validators.required, Validators.min(0)]),
      pareggiChamp: new FormControl(0, [Validators.required, Validators.min(0)]),
      sconfitteChamp: new FormControl(0, [Validators.required, Validators.min(0)]),
      goalFattiChamp: new FormControl(0, [Validators.required, Validators.min(0)]),
      goalSubitiChamp: new FormControl(0, [Validators.required, Validators.min(0)]),

      //carriera
      recordGoalFattiFila: new FormControl(0, [Validators.required, Validators.min(0)]),
      recordGoalSubitiFila: new FormControl(0, [Validators.required, Validators.min(0)]),
      recordGoalFattiFilaPartita: new FormControl(0, [Validators.required, Validators.min(0)]),
      recordGoalSubitiFilaPartita: new FormControl(0, [Validators.required, Validators.min(0)]),
      recordGoalFattiPartita: new FormControl(0, [Validators.required, Validators.min(0)]),
      recordGoalSubitiPartita: new FormControl(0, [Validators.required, Validators.min(0)]),
      recordGoalPunizione: new FormControl(0, [Validators.required, Validators.min(0)]),
      recordGoalRigore: new FormControl(0, [Validators.required, Validators.min(0)]),
      doubleGoal: new FormControl(0, [Validators.required, Validators.min(0)]),
      multiGoal: new FormControl(0, [Validators.required, Validators.min(0)]),
      ultraGoal: new FormControl(0, [Validators.required, Validators.min(0)]),
      fantasticGoal: new FormControl(0, [Validators.required, Validators.min(0)]),
      unbelievableGoal: new FormControl(0, [Validators.required, Validators.min(0)]),
      unbelievablePlusGoal: new FormControl(0, [Validators.required, Validators.min(0)])
    })
  }

  onSubmit(){

    this.caricamento = true;

    console.log(this.giocatoreForm)

    this.statistiche = new Statistiche(this.giocatoreForm.value.velocita, this.giocatoreForm.value.finalizzazione, this.giocatoreForm.value.potenzaTiro, this.giocatoreForm.value.tiroDistanza,
      this.giocatoreForm.value.tiroVolo, this.giocatoreForm.value.rigori, this.giocatoreForm.value.precisioneTiro, this.giocatoreForm.value.dribbling, this.giocatoreForm.value.intercettazione,
      this.giocatoreForm.value.contrasto, this.giocatoreForm.value.resistenza, this.giocatoreForm.value.forzaFisica);

      this.carriera = new Carriera(this.giocatoreForm.value.scudetti, this.giocatoreForm.value.champions, this.giocatoreForm.value.coppe, this.giocatoreForm.value.partiteGiocate,
        this.giocatoreForm.value.vittorie, this.giocatoreForm.value.pareggi, this.giocatoreForm.value.sconfitte, this.giocatoreForm.value.goalFatti, this.giocatoreForm.value.goalSubiti,
        this.giocatoreForm.value.partiteGiocateA, this.giocatoreForm.value.vittorieA, this.giocatoreForm.value.pareggiA, this.giocatoreForm.value.sconfitteA,
        this.giocatoreForm.value.goalFattiA, this.giocatoreForm.value.goalSubitiA, this.giocatoreForm.value.puntiA, this.giocatoreForm.value.puntiChamp, this.giocatoreForm.value.partiteGiocateChamp, this.giocatoreForm.value.vittorieChamp,
        this.giocatoreForm.value.pareggiChamp, this.giocatoreForm.value.sconfitteChamp, this.giocatoreForm.value.goalFattiChamp, this.giocatoreForm.value.goalSubitiChamp);

    this.record = new RecordGiocatore(this.giocatoreForm.value.recordGoalFattiFila, this.giocatoreForm.value.recordGoalSubitiFila, this.giocatoreForm.value.recordGoalFattiFilaPartita, this.giocatoreForm.value.recordGoalSubitiFilaPartita,
        this.giocatoreForm.value.recordGoalFattiPartita, this.giocatoreForm.value.recordGoalSubitiPartita, this.giocatoreForm.value.recordGoalPunizione, this.giocatoreForm.value.recordGoalRigore, this.giocatoreForm.value.doubleGoal,
        this.giocatoreForm.value.multiGoal, this.giocatoreForm.value.ultraGoal, this.giocatoreForm.value.fantasticGoal, this.giocatoreForm.value.unbelievableGoal, this.giocatoreForm.value.unbelievablePlusGoal);

    console.log(this.statistiche, this.carriera, this.record)

    //this.giocatore = new Giocatore(null, this.giocatoreForm.value.nome, this.giocatoreForm.value.cognome, this.giocatoreForm.value.eta, this.giocatoreForm.value.immagineProfiloUrl, this.statistiche, this.carriera, this.record);
    let nuovoGiocatore = new Giocatore();
    nuovoGiocatore.nome = this.giocatoreForm.value.nome;
    nuovoGiocatore.cognome = this.giocatoreForm.value.cognome;
    nuovoGiocatore.eta = this.giocatoreForm.value.eta;
    nuovoGiocatore.immagineProfiloUrl = this.giocatoreForm.value.immagineProfiloUrl;
    nuovoGiocatore.statistiche = this.statistiche;
    nuovoGiocatore.carriera = this.carriera;
    nuovoGiocatore.record = this.record;
    this.giocatore = nuovoGiocatore;




    this.giocatoreService.insertGiocatore(this.giocatore).subscribe(response => console.log(response));
    console.log(this.giocatore)
    console.log(this.giocatoreForm)

    setTimeout(() => {
      this.caricamento = false;
      this.router.navigate(['giocatori']);
    }, 1000);
  }

  annulla(){
    this.router.navigate(['giocatori']);
  }



}
