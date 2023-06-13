import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Stadio } from 'src/app/model/stadio.model';
import { StadioService } from 'src/app/servizi/stadio.service';

@Component({
  selector: 'app-stadio',
  templateUrl: './stadio.component.html',
  styleUrls: ['./stadio.component.css']
})
export class StadioComponent {

  displayedColumns: string[] = ['nome', 'posti', 'annoCreazione'];
  stadi: Stadio[] = [];
  isAdmin:boolean=false;

  constructor(private stadioService: StadioService, private route: Router, private auth:AuthService) {}

  ngOnInit(): void {

    this.stadioService.getStadi().subscribe((dati: any) =>
      {
        this.stadi = dati
        console.log('stadi',dati)
      }
    );

    this.isAdmin = this.auth.isAdmin();
  }

  vediDettagli(stadio: any){
    this.route.navigate(['stadio', stadio.idStadio])
  }

  creaStadio(){
    this.route.navigate(['aggiungi-stadio'])
  }

}
