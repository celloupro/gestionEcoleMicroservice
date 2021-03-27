import { Moment } from 'moment';
import { IEleve } from 'app/shared/model/inscription/eleve.model';
import { IClasse } from 'app/shared/model/inscription/classe.model';

export interface IAnneeScolaire {
  id?: number;
  dateDebut?: Moment;
  dateFin?: Moment;
  eleves?: IEleve[];
  classes?: IClasse[];
}

export class AnneeScolaire implements IAnneeScolaire {
  constructor(
    public id?: number,
    public dateDebut?: Moment,
    public dateFin?: Moment,
    public eleves?: IEleve[],
    public classes?: IClasse[]
  ) {}
}
