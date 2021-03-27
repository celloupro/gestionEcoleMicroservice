import { Moment } from 'moment';
import { IParent } from 'app/shared/model/inscription/parent.model';
import { IClasse } from 'app/shared/model/inscription/classe.model';
import { IAnneeScolaire } from 'app/shared/model/inscription/annee-scolaire.model';

export interface IEleve {
  id?: number;
  photoContentType?: string;
  photo?: any;
  nom?: string;
  prenom?: string;
  sexe?: string;
  dateNaissance?: Moment;
  lieuNaissance?: string;
  matricule?: string;
  adresse?: string;
  parents?: IParent[];
  classes?: IClasse[];
  anneeScolaires?: IAnneeScolaire[];
}

export class Eleve implements IEleve {
  constructor(
    public id?: number,
    public photoContentType?: string,
    public photo?: any,
    public nom?: string,
    public prenom?: string,
    public sexe?: string,
    public dateNaissance?: Moment,
    public lieuNaissance?: string,
    public matricule?: string,
    public adresse?: string,
    public parents?: IParent[],
    public classes?: IClasse[],
    public anneeScolaires?: IAnneeScolaire[]
  ) {}
}
