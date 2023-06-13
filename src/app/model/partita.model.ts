import { Campionato } from "./campionato.model";
import { Giocatore } from "./giocatore.model";

export class Partita{

  public idPartita: number;
  public dataPartita: string;
  public calcioInizio: Date;
  public durataPartita: number;
  public campionato: Campionato;
  public stadio: any;

  constructor(){}
}
