export class Statistiche{
  constructor(
    private velocita: number,
    private finalizzazione: number,
    private potenzaTiro: number,
    private tiroDistanza: number,
    private tiroVolo: number,
    private rigori: number,
    private precisioneTiro: number,
    private dribbling: number,
    private intercettazione: number,
    private contrasto: number,
    private resistenza: number,
    private forzaFisica: number
  ){}

  get _velocita(): number{
    return this.velocita;
  }
  get _finalizzazione(): number{
    return this.finalizzazione;
  }
  get _potenzaTiro(): number{
    return this.potenzaTiro;
  }
  get _tiroDistanza(): number{
    return this.tiroDistanza;
  }
  get _tiroVolo(): number{
    return this.tiroVolo;
  }
  get _rigori(): number{
    return this.rigori;
  }
  get _precisioneTiro(): number{
    return this.precisioneTiro;
  }
  get _dribbling(): number{
    return this.dribbling;
  }
  get _intercettazione(): number{
    return this.intercettazione;
  }
  get _contrasto(): number{
    return this.contrasto;
  }
  get _resistenza(): number{
    return this.resistenza;
  }
  get _forzaFisica(): number{
    return this.forzaFisica;
  }



}
