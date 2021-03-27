import { Moment } from 'moment';
import { IEleve } from 'app/shared/model/inscription/eleve.model';

export interface IParent {
  id?: number;
  nom?: string;
  prenom?: string;
  sexe?: string;
  dateNaissance?: Moment;
  lieuNaissance?: string;
  typeParente?: string;
  tel?: string;
  adresse?: string;
  numCarteIdentite?: string;
  eleves?: IEleve[];
}

export class Parent implements IParent {
  constructor(
    public id?: number,
    public nom?: string,
    public prenom?: string,
    public sexe?: string,
    public dateNaissance?: Moment,
    public lieuNaissance?: string,
    public typeParente?: string,
    public tel?: string,
    public adresse?: string,
    public numCarteIdentite?: string,
    public eleves?: IEleve[]
  ) {}
}
