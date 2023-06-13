import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GiocatoreService } from 'src/app/servizi/giocatore.service';
import { Statistiche } from 'src/app/model/statistiche.model';
import { Carriera } from 'src/app/model/carriera.model';
import { RecordGiocatore } from 'src/app/model/record.model';
import { Giocatore } from 'src/app/model/giocatore.model';

@Component({
  selector: 'app-modifica-giocatore',
  templateUrl: './modifica-giocatore.component.html',
  styleUrls: ['./modifica-giocatore.component.css']
})
export class ModificaGiocatoreComponent {

  giocatore: Giocatore | undefined
  statistiche: Statistiche | undefined
  carriera: Carriera | undefined
  record: RecordGiocatore | undefined

  initGiocatore: any
  idGiocatore: any

  caricamento: Boolean = false;

  giocatoreForm: FormGroup = new FormGroup({

    //generalità

    idGiocatore: new FormControl({value: null, disabled: true}, Validators.required),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cognome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    eta: new FormControl(null, [Validators.required, Validators.min(14), Validators.max(50)]),
    immagineProfiloUrl: new FormControl(null),

    //statistiche
    velocita: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    finalizzazione: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    potenzaTiro: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    tiroDistanza: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    tiroVolo: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    rigori: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    precisioneTiro: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    dribbling: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    intercettazione: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    contrasto: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    resistenza: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),
    forzaFisica: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(100)]),

    //carriera
    scudetti: new FormControl(null, [Validators.required, Validators.min(0)]),
    champions: new FormControl(null, [Validators.required, Validators.min(0)]),
    coppe: new FormControl(null, [Validators.required, Validators.min(0)]),
    partiteGiocate: new FormControl(null, [Validators.required, Validators.min(0)]),
    vittorie: new FormControl(null, [Validators.required, Validators.min(0)]),
    pareggi: new FormControl(null, [Validators.required, Validators.min(0)]),
    sconfitte: new FormControl(null, [Validators.required, Validators.min(0)]),
    goalFatti: new FormControl(null, [Validators.required, Validators.min(0)]),
    goalSubiti: new FormControl(null, [Validators.required, Validators.min(0)]),
    partiteGiocateA: new FormControl(null, [Validators.required, Validators.min(0)]),
    vittorieA: new FormControl(null, [Validators.required, Validators.min(0)]),
    pareggiA: new FormControl(null, [Validators.required, Validators.min(0)]),
    sconfitteA: new FormControl(null, [Validators.required, Validators.min(0)]),
    goalFattiA: new FormControl(null, [Validators.required, Validators.min(0)]),
    goalSubitiA: new FormControl(null, [Validators.required, Validators.min(0)]),
    puntiA: new FormControl(null, [Validators.required, Validators.min(0)]),
    puntiChamp: new FormControl(null, [Validators.required, Validators.min(0)]),
    partiteGiocateChamp: new FormControl(null, [Validators.required, Validators.min(0)]),
    vittorieChamp: new FormControl(null, [Validators.required, Validators.min(0)]),
    pareggiChamp: new FormControl(null, [Validators.required, Validators.min(0)]),
    sconfitteChamp: new FormControl(null, [Validators.required, Validators.min(0)]),
    goalFattiChamp: new FormControl(null, [Validators.required, Validators.min(0)]),
    goalSubitiChamp: new FormControl(null, [Validators.required, Validators.min(0)]),

    //carriera
    recordGoalFattiFila: new FormControl(null, [Validators.required, Validators.min(0)]),
    recordGoalSubitiFila: new FormControl(null, [Validators.required, Validators.min(0)]),
    recordGoalFattiFilaPartita: new FormControl(null, [Validators.required, Validators.min(0)]),
    recordGoalSubitiFilaPartita: new FormControl(null, [Validators.required, Validators.min(0)]),
    recordGoalFattiPartita: new FormControl(null, [Validators.required, Validators.min(0)]),
    recordGoalSubitiPartita: new FormControl(null, [Validators.required, Validators.min(0)]),
    recordGoalPunizione: new FormControl(null, [Validators.required, Validators.min(0)]),
    recordGoalRigore: new FormControl(null, [Validators.required, Validators.min(0)]),
    doubleGoal: new FormControl(null, [Validators.required, Validators.min(0)]),
    multiGoal: new FormControl(null, [Validators.required, Validators.min(0)]),
    ultraGoal: new FormControl(null, [Validators.required, Validators.min(0)]),
    fantasticGoal: new FormControl(null, [Validators.required, Validators.min(0)]),
    unbelievableGoal: new FormControl(null, [Validators.required, Validators.min(0)]),
    unbelievablePlusGoal: new FormControl(null, [Validators.required, Validators.min(0)])
  })

  constructor(private giocatoreService: GiocatoreService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {


    this.idGiocatore = this.activatedRoute.snapshot.params['id'];

    this.giocatoreService.getGiocatoreById(this.idGiocatore).subscribe(
      gioc => {
        this.initGiocatore = gioc;
      })



  }

  onSubmit(){

    this.caricamento = true;

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

    //this.giocatore = new Giocatore(this.idGiocatore, this.giocatoreForm.value.nome, this.giocatoreForm.value.cognome, this.giocatoreForm.value.eta, this.giocatoreForm.value.immagineProfiloUrl, this.statistiche, this.carriera, this.record);
    let nuovoGiocatore = new Giocatore();
    nuovoGiocatore.idGiocatore = this.idGiocatore;
    nuovoGiocatore.nome = this.giocatoreForm.value.nome;
    nuovoGiocatore.cognome = this.giocatoreForm.value.cognome;
    nuovoGiocatore.eta = this.giocatoreForm.value.eta;
    nuovoGiocatore.immagineProfiloUrl = this.giocatoreForm.value.immagineProfiloUrl;
    nuovoGiocatore.statistiche = this.statistiche;
    nuovoGiocatore.carriera = this.carriera;
    nuovoGiocatore.record = this.record;
    this.giocatore = nuovoGiocatore;
    this.giocatoreService.modificaGiocatore(this.giocatore).subscribe(response => console.log(response));
    console.log(this.giocatore)
    console.log(this.giocatoreForm)

    setTimeout(() => {
      this.caricamento = false;
      this.router.navigate(['giocatori']);
    }, 1000);
  }

  annulla(){
    this.router.navigate(['giocatori', this.initGiocatore.idGiocatore]);
  }



}
