import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './componenti/toolbar/toolbar.component';
import {MatTableModule} from '@angular/material/table';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HomepageComponent } from './componenti/homepage/homepage.component';
import { ClassificaComponent } from './componenti/classifica/classifica.component';
import { GiocatoreComponent } from './componenti/giocatore/giocatore.component';
import {MatCardModule} from '@angular/material/card';
import { GiocatoreDettagliComponent } from './componenti/giocatore-dettagli/giocatore-dettagli.component';
import { AggiungiGiocatoreComponent } from './componenti/aggiungi-giocatore/aggiungi-giocatore.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ModificaGiocatoreComponent } from './componenti/modifica-giocatore/modifica-giocatore.component';
import { ClassificaDettagliComponent } from './componenti/classifica-dettagli/classifica-dettagli.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PartitaDettagliComponent } from './componenti/partita-dettagli/partita-dettagli.component';
import { PartitaComponent } from './componenti/partita/partita.component';
import { AggiungiPartitaComponent } from './componenti/aggiungi-partita/aggiungi-partita.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { AggiungiCampionatoComponent } from './componenti/aggiungi-campionato/aggiungi-campionato.component';
import { LoginComponent } from './componenti/login/login.component';
import { RegisterComponent } from './componenti/register/register.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/Auth.interceptor';
import { StadioComponent } from './componenti/stadio/stadio.component';
import { AggiungiStadioComponent } from './componenti/aggiungi-stadio/aggiungi-stadio.component';



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomepageComponent,
    ClassificaComponent,
    GiocatoreComponent,
    GiocatoreDettagliComponent,
    AggiungiGiocatoreComponent,
    ModificaGiocatoreComponent,
    ClassificaDettagliComponent,
    PartitaDettagliComponent,
    PartitaComponent,
    AggiungiPartitaComponent,
    AggiungiCampionatoComponent,
    LoginComponent,
    RegisterComponent,
    StadioComponent,
    AggiungiStadioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
