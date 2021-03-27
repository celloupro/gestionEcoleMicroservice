import { Moment } from 'moment';
import { IDiplome } from 'app/shared/model/professeur/diplome.model';
import { IRetard } from 'app/shared/model/professeur/retard.model';
import { IAbscence } from 'app/shared/model/professeur/abscence.model';
import { Sexe } from 'app/shared/model/enumerations/sexe.model';

export interface IProfesseur {
  id?: number;
  photoContentType?: string;
  photo?: any;
  nom?: string;
  prenom?: string;
  sexe?: Sexe;
  dateNaissance?: Moment;
  lieuNaissance?: string;
  tel?: string;
  adresse?: string;
  diplomes?: IDiplome[];
  retards?: IRetard[];
  abscences?: IAbscence[];
}

export class Professeur implements IProfesseur {
  constructor(
    public id?: number,
    public photoContentType?: string,
    public photo?: any,
    public nom?: string,
    public prenom?: string,
    public sexe?: Sexe,
    public dateNaissance?: Moment,
    public lieuNaissance?: string,
    public tel?: string,
    public adresse?: string,
    public diplomes?: IDiplome[],
    public retards?: IRetard[],
    public abscences?: IAbscence[]
  ) {}
}
