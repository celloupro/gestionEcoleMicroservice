import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAbscence } from 'app/shared/model/professeur/abscence.model';

type EntityResponseType = HttpResponse<IAbscence>;
type EntityArrayResponseType = HttpResponse<IAbscence[]>;

@Injectable({ providedIn: 'root' })
export class AbscenceService {
  public resourceUrl = SERVER_API_URL + 'services/professeur/api/abscences';

  constructor(protected http: HttpClient) {}

  create(abscence: IAbscence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(abscence);
    return this.http
      .post<IAbscence>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(abscence: IAbscence): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(abscence);
    return this.http
      .put<IAbscence>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAbscence>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAbscence[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(abscence: IAbscence): IAbscence {
    const copy: IAbscence = Object.assign({}, abscence, {
      heureDebut: abscence.heureDebut && abscence.heureDebut.isValid() ? abscence.heureDebut.toJSON() : undefined,
      heureFin: abscence.heureFin && abscence.heureFin.isValid() ? abscence.heureFin.toJSON() : undefined,
      dateAbsence: abscence.dateAbsence && abscence.dateAbsence.isValid() ? abscence.dateAbsence.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.heureDebut = res.body.heureDebut ? moment(res.body.heureDebut) : undefined;
      res.body.heureFin = res.body.heureFin ? moment(res.body.heureFin) : undefined;
      res.body.dateAbsence = res.body.dateAbsence ? moment(res.body.dateAbsence) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((abscence: IAbscence) => {
        abscence.heureDebut = abscence.heureDebut ? moment(abscence.heureDebut) : undefined;
        abscence.heureFin = abscence.heureFin ? moment(abscence.heureFin) : undefined;
        abscence.dateAbsence = abscence.dateAbsence ? moment(abscence.dateAbsence) : undefined;
      });
    }
    return res;
  }
}
