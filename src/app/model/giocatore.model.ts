import { Carriera } from "./carriera.model";
import { RecordGiocatore } from "./record.model";
import { Statistiche } from "./statistiche.model";

export class Giocatore{

    public idGiocatore: any;
    public nome: string;
    public cognome: string;
    public eta: number;
    public immagineProfiloUrl: string;
    public statistiche: Statistiche;
    public carriera: Carriera;
    public record: RecordGiocatore;

  constructor(
    /*
    public idGiocatore: any,
    public nome: string,
    public cognome: string,
    public eta: number,
    public immagineProfiloUrl: string,
    public statistiche: Statistiche,
    public carriera: Carriera,
    public record: RecordGiocatore
    */
  ){}
}
