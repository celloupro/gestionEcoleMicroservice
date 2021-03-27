import { Moment } from 'moment';
import { IProfesseur } from 'app/shared/model/professeur/professeur.model';

export interface IDiplome {
  id?: number;
  intitule?: string;
  ecole?: string;
  specialite?: string;
  niveau?: string;
  dateObtention?: Moment;
  professeur?: IProfesseur;
}

export class Diplome implements IDiplome {
  constructor(
    public id?: number,
    public intitule?: string,
    public ecole?: string,
    public specialite?: string,
    public niveau?: string,
    public dateObtention?: Moment,
    public professeur?: IProfesseur
  ) {}
}
