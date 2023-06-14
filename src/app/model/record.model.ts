export class RecordGiocatore{
  constructor(
    private recordGoalFattiFila: number,
    private recordGoalSubitiFila: number,
    private recordGoalFattiFilaPartita: number,
    private recordGoalSubitiFilaPartita: number,
    private recordGoalFattiPartita: number,
    private recordGoalSubitiPartita: number,
    public recordGoalPunizione: number,
    public recordGoalRigore: number,
    public doubleGoal: number,
    public multiGoal: number,
    public ultraGoal: number,
    public fantasticGoal: number,
    public unbelievableGoal: number,
    public unbelievablePlusGoal: number
  ){}
}
