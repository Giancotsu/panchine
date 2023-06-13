import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Campionato } from 'src/app/model/campionato.model';
import { CampionatoService } from 'src/app/servizi/campionato.service';

@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.component.html',
  styleUrls: ['./classifica.component.css']
})
export class ClassificaComponent implements OnInit{


  displayedColumns: string[] = ['tipo', 'versione', 'partite'];
  campionati: Campionato[] = [];
  partiteGiocate: number[] = [];
  isAdmin:boolean=false;

  constructor(private campionatoService: CampionatoService, private route: Router, private auth:AuthService) {}

  ngOnInit(): void {

    this.campionatoService.getCampionati().subscribe((dati: any) =>
      {
        this.campionati = dati
        console.log('campionati',dati)
        this.partiteGiocateCalc(dati);
      }
    );

    this.isAdmin = this.auth.isAdmin();
  }

  partiteGiocateCalc(campionati: Campionato[]){

    campionati.forEach(campionato => {
      this.campionatoService.getPartiteGiocate(campionato.idCampionato).subscribe(num => {
        this.partiteGiocate[campionato.idCampionato]=num;
        console.log('partite',this.partiteGiocate)
      })
    })
  }

  vediDettagli(campionato: any){
    this.route.navigate(['classifica', campionato.idCampionato])
  }

  creaCampionato(){
    this.route.navigate(['aggiungi-campionato'])
  }


}
