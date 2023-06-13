import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolbarComponent } from './componenti/toolbar/toolbar.component';
import { ClassificaComponent } from './componenti/classifica/classifica.component';
import { GiocatoreComponent } from './componenti/giocatore/giocatore.component';
import { HomepageComponent } from './componenti/homepage/homepage.component';
import { GiocatoreDettagliComponent } from './componenti/giocatore-dettagli/giocatore-dettagli.component';
import { AggiungiGiocatoreComponent } from './componenti/aggiungi-giocatore/aggiungi-giocatore.component';
import { ModificaGiocatoreComponent } from './componenti/modifica-giocatore/modifica-giocatore.component';
import { ClassificaDettagliComponent } from './componenti/classifica-dettagli/classifica-dettagli.component';
import { PartitaDettagliComponent } from './componenti/partita-dettagli/partita-dettagli.component';
import { PartitaComponent } from './componenti/partita/partita.component';
import { AggiungiPartitaComponent } from './componenti/aggiungi-partita/aggiungi-partita.component';
import { AggiungiCampionatoComponent } from './componenti/aggiungi-campionato/aggiungi-campionato.component';
import { LoginComponent } from './componenti/login/login.component';
import { RegisterComponent } from './componenti/register/register.component';
import { StadioComponent } from './componenti/stadio/stadio.component';
import { AggiungiStadioComponent } from './componenti/aggiungi-stadio/aggiungi-stadio.component';

const routes: Routes = [
  {path: '', component: ToolbarComponent, children: [
    {path: '', redirectTo: 'homepage', pathMatch: 'full'},
    {path: 'homepage', component: HomepageComponent},
    {path: 'classifica', component: ClassificaComponent},
    {path: 'partite', component: PartitaComponent},
    {path: 'giocatori', component: GiocatoreComponent},
    {
      path: 'giocatori/:id',
      component: GiocatoreDettagliComponent,
      data: { title: 'Dettagli giocatore' }
    },
    {
      path: 'aggiungi-giocatore',
      component: AggiungiGiocatoreComponent,
      data: { title: 'Aggiungi giocatore' }
    },
    {
      path: 'modifica-giocatore/:id',
      component: ModificaGiocatoreComponent,
      data: { title: 'Modifica giocatore' }
    },
    {
      path: 'classifica/:id',
      component: ClassificaDettagliComponent,
      data: { title: 'Dettagli campionato' }
    },
    {
      path: 'partita/:id',
      component: PartitaDettagliComponent,
      data: { title: 'Dettagli partita' }
    },
    {
      path: 'aggiungi-partita',
      component: AggiungiPartitaComponent,
      data: { title: 'Aggiungi partita' }
    },
    {
      path: 'aggiungi-campionato',
      component: AggiungiCampionatoComponent,
      data: { title: 'Aggiungi campionato' }
    },
    {
      path: 'login',
      component: LoginComponent,
      data: { title: 'Login' }
    },
    {
      path: 'register',
      component: RegisterComponent,
      data: { title: 'Register' }
    },
    {
      path: 'stadio',
      component: StadioComponent,
      data: { title: 'Stadio' }
    },
    {
      path: 'aggiungi-stadio',
      component: AggiungiStadioComponent,
      data: { title: 'Aggiungi Stadio' }
    }
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
