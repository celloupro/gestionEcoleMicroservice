import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRetard } from 'app/shared/model/professeur/retard.model';

type EntityResponseType = HttpResponse<IRetard>;
type EntityArrayResponseType = HttpResponse<IRetard[]>;

@Injectable({ providedIn: 'root' })
export class RetardService {
  public resourceUrl = SERVER_API_URL + 'services/professeur/api/retards';

  constructor(protected http: HttpClient) {}

  create(retard: IRetard): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(retard);
    return this.http
      .post<IRetard>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(retard: IRetard): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(retard);
    return this.http
      .put<IRetard>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRetard>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRetard[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(retard: IRetard): IRetard {
    const copy: IRetard = Object.assign({}, retard, {
      heureDebut: retard.heureDebut && retard.heureDebut.isValid() ? retard.heureDebut.toJSON() : undefined,
      heureFin: retard.heureFin && retard.heureFin.isValid() ? retard.heureFin.toJSON() : undefined,
      dateRetard: retard.dateRetard && retard.dateRetard.isValid() ? retard.dateRetard.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.heureDebut = res.body.heureDebut ? moment(res.body.heureDebut) : undefined;
      res.body.heureFin = res.body.heureFin ? moment(res.body.heureFin) : undefined;
      res.body.dateRetard = res.body.dateRetard ? moment(res.body.dateRetard) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((retard: IRetard) => {
        retard.heureDebut = retard.heureDebut ? moment(retard.heureDebut) : undefined;
        retard.heureFin = retard.heureFin ? moment(retard.heureFin) : undefined;
        retard.dateRetard = retard.dateRetard ? moment(retard.dateRetard) : undefined;
      });
    }
    return res;
  }
}
