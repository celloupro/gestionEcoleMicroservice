import { Moment } from 'moment';
import { IProfesseur } from 'app/shared/model/professeur/professeur.model';

export interface IRetard {
  id?: number;
  heureDebut?: Moment;
  heureFin?: Moment;
  nombreHeure?: number;
  dateRetard?: Moment;
  motif?: string;
  professeur?: IProfesseur;
}

export class Retard implements IRetard {
  constructor(
    public id?: number,
    public heureDebut?: Moment,
    public heureFin?: Moment,
    public nombreHeure?: number,
    public dateRetard?: Moment,
    public motif?: string,
    public professeur?: IProfesseur
  ) {}
}
