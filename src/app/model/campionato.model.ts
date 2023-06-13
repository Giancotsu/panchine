export class Campionato{

  public idCampionato: number;

  constructor(
    public tipoCompetizione: string,
    public edizioneCampionato: number,
    public numPartite: number
  ){}
}
