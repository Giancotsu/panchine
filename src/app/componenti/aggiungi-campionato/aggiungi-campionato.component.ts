import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Campionato } from 'src/app/model/campionato.model';
import { CampionatoService } from 'src/app/servizi/campionato.service';

enum TipoCompetizione {
    AMICHEVOLE = 0,
    SERIE_A = 1,
    CHAMPIONS_LEAGUE = 2
}

@Component({
  selector: 'app-aggiungi-campionato',
  templateUrl: './aggiungi-campionato.component.html',
  styleUrls: ['./aggiungi-campionato.component.css']
})
export class AggiungiCampionatoComponent implements OnInit{

  campionatoForm: FormGroup | any
  campionato: Campionato;

  caricamento: Boolean = false;

  constructor(private campionatoService: CampionatoService, private router: Router){}

  ngOnInit(): void {
    this.campionatoForm = new FormGroup({

      tipoCompetizione: new FormControl(null, [Validators.required]),
      edizioneCampionato: new FormControl(null, [Validators.required, Validators.min(1)]),
      numPartite: new FormControl(null, [Validators.required, Validators.min(5), Validators.max(100)]),

    })
  }

  onSubmit(){

    this.caricamento = true;

    console.log(this.campionatoForm)

    this.campionato = new Campionato(TipoCompetizione[this.campionatoForm.value.tipoCompetizione], this.campionatoForm.value.edizioneCampionato, this.campionatoForm.value.numPartite);
    this.campionatoService.insertCampionato(this.campionato).subscribe(ris => console.log(ris))

    setTimeout(() => {
      this.caricamento = false;
      this.router.navigate(['classifica']);
    }, 250);
  }

  annulla(){
    this.router.navigate(['classifica']);
  }
}
