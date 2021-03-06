import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAnneeScolaire } from 'app/shared/model/inscription/annee-scolaire.model';

type EntityResponseType = HttpResponse<IAnneeScolaire>;
type EntityArrayResponseType = HttpResponse<IAnneeScolaire[]>;

@Injectable({ providedIn: 'root' })
export class AnneeScolaireService {
  public resourceUrl = SERVER_API_URL + 'services/inscription/api/annee-scolaires';

  constructor(protected http: HttpClient) {}

  create(anneeScolaire: IAnneeScolaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(anneeScolaire);
    return this.http
      .post<IAnneeScolaire>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(anneeScolaire: IAnneeScolaire): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(anneeScolaire);
    return this.http
      .put<IAnneeScolaire>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAnneeScolaire>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAnneeScolaire[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(anneeScolaire: IAnneeScolaire): IAnneeScolaire {
    const copy: IAnneeScolaire = Object.assign({}, anneeScolaire, {
      dateDebut: anneeScolaire.dateDebut && anneeScolaire.dateDebut.isValid() ? anneeScolaire.dateDebut.format(DATE_FORMAT) : undefined,
      dateFin: anneeScolaire.dateFin && anneeScolaire.dateFin.isValid() ? anneeScolaire.dateFin.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateDebut = res.body.dateDebut ? moment(res.body.dateDebut) : undefined;
      res.body.dateFin = res.body.dateFin ? moment(res.body.dateFin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((anneeScolaire: IAnneeScolaire) => {
        anneeScolaire.dateDebut = anneeScolaire.dateDebut ? moment(anneeScolaire.dateDebut) : undefined;
        anneeScolaire.dateFin = anneeScolaire.dateFin ? moment(anneeScolaire.dateFin) : undefined;
      });
    }
    return res;
  }
}
