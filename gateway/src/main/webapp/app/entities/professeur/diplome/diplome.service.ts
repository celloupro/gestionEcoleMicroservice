import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDiplome } from 'app/shared/model/professeur/diplome.model';

type EntityResponseType = HttpResponse<IDiplome>;
type EntityArrayResponseType = HttpResponse<IDiplome[]>;

@Injectable({ providedIn: 'root' })
export class DiplomeService {
  public resourceUrl = SERVER_API_URL + 'services/professeur/api/diplomes';

  constructor(protected http: HttpClient) {}

  create(diplome: IDiplome): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(diplome);
    return this.http
      .post<IDiplome>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(diplome: IDiplome): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(diplome);
    return this.http
      .put<IDiplome>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDiplome>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDiplome[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(diplome: IDiplome): IDiplome {
    const copy: IDiplome = Object.assign({}, diplome, {
      dateObtention: diplome.dateObtention && diplome.dateObtention.isValid() ? diplome.dateObtention.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateObtention = res.body.dateObtention ? moment(res.body.dateObtention) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((diplome: IDiplome) => {
        diplome.dateObtention = diplome.dateObtention ? moment(diplome.dateObtention) : undefined;
      });
    }
    return res;
  }
}
