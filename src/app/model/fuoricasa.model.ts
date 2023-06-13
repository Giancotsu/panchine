import { Giocatore } from "./giocatore.model";
import { Partita } from "./partita.model";

export class FuoriCasa{

  public giocatore: Giocatore;
  public partita: Partita
  public goalMinuto: number[];

  public doubleGoal: number;
  public multiGoal: number;
  public ultraGoal: number;
  public fantasticGoal: number;
  public unbelievableGoal: number;
  public unbelievablePlusGoal: number;

  public idFuoriCasa: number;
  public vittorie: number;
  public pareggi: number;
  public sconfitte: number;
  public goalFatti: number;
  public goalSubiti: number;
  public tiriTotali: number;
  public tiriPorta: number;
  public pali: number;
  public punizioni: number;
  public rigori: number;
  public punti: number;
  public idGiocatore: number;

  constructor(
  ){}
}
