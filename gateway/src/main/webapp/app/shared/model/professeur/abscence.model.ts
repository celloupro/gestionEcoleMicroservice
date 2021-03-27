import { Moment } from 'moment';
import { IProfesseur } from 'app/shared/model/professeur/professeur.model';

export interface IAbscence {
  id?: number;
  heureDebut?: Moment;
  heureFin?: Moment;
  nombreHeure?: number;
  dateAbsence?: Moment;
  motif?: string;
  professeur?: IProfesseur;
}

export class Abscence implements IAbscence {
  constructor(
    public id?: number,
    public heureDebut?: Moment,
    public heureFin?: Moment,
    public nombreHeure?: number,
    public dateAbsence?: Moment,
    public motif?: string,
    public professeur?: IProfesseur
  ) {}
}
