import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { PartitaService } from 'src/app/servizi/partita.service';

@Component({
  selector: 'app-partita',
  templateUrl: './partita.component.html',
  styleUrls: ['./partita.component.css']
})
export class PartitaComponent implements OnInit{

  displayedColumns: string[] = ['inCasa', 'risultato', 'fuoriCasa', 'data'];
  partite: any
  partiteIC: any
  partiteFC: any
  partiteCaricate:boolean = false;

  isAdmin:boolean=false;

  constructor(private partitaService: PartitaService, private route: Router, private auth:AuthService) { }

  ngOnInit(): void {


    this.partitaService.getPartiteInCasa().subscribe((dati: any) =>
      {
        this.partiteIC = dati
        console.log('ic',dati)
      });
    this.partitaService.getPartiteFuoriCasa().subscribe((dati: any) =>
      {
        this.partiteFC = dati
        console.log('fc',dati)
      });

    this.partitaService.getPartite().subscribe((dati: any) =>
      {
        this.partite = dati
        console.log(this.partite)
        this.partiteCaricate=true;
      }
    );

    this.isAdmin=this.auth.isAdmin();
  }

  dettagliPartita(i: number){
    console.log(i);
    this.route.navigate(['partita', i])
  }

  creaPartita(){
    this.route.navigate(['aggiungi-partita'])
  }

}
