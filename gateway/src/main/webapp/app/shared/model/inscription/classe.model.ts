import { INiveau } from 'app/shared/model/inscription/niveau.model';
import { IEleve } from 'app/shared/model/inscription/eleve.model';
import { IAnneeScolaire } from 'app/shared/model/inscription/annee-scolaire.model';

export interface IClasse {
  id?: number;
  libelle?: string;
  classe?: INiveau;
  eleves?: IEleve[];
  anneeScolaires?: IAnneeScolaire[];
}

export class Classe implements IClasse {
  constructor(
    public id?: number,
    public libelle?: string,
    public classe?: INiveau,
    public eleves?: IEleve[],
    public anneeScolaires?: IAnneeScolaire[]
  ) {}
}
