import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stadio } from 'src/app/model/stadio.model';
import { StadioService } from 'src/app/servizi/stadio.service';

@Component({
  selector: 'app-aggiungi-stadio',
  templateUrl: './aggiungi-stadio.component.html',
  styleUrls: ['./aggiungi-stadio.component.css']
})
export class AggiungiStadioComponent {

  stadioForm: FormGroup | any
  stadio: Stadio = new Stadio;

  caricamento: Boolean = false;

  constructor(private stadioService: StadioService, private router: Router){}

  ngOnInit(): void {
    this.stadioForm = new FormGroup({

      nome: new FormControl(null, [Validators.required]),
      posti: new FormControl(null, [Validators.required, Validators.min(0)]),
      annoCreazione: new FormControl(null, [Validators.required, Validators.min(1000), Validators.max(2023)]),

    })
  }

  onSubmit(){

    this.caricamento = true;

    console.log(this.stadioForm)

    this.stadio.nome=this.stadioForm.value.nome;
    this.stadio.posti=this.stadioForm.value.posti;
    this.stadio.annoCreazione=this.stadioForm.value.annoCreazione;

    console.log(this.stadio);

    this.stadioService.createStadio(this.stadio).subscribe(risposta=>{
      console.log(risposta);

    })

    setTimeout(() => {
      this.caricamento = false;
      this.router.navigate(['stadio']);
    }, 150);
  }

  annulla(){
    this.router.navigate(['stadio']);
  }
}
