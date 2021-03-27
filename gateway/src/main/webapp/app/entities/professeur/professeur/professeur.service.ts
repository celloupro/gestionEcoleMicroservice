import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProfesseur } from 'app/shared/model/professeur/professeur.model';

type EntityResponseType = HttpResponse<IProfesseur>;
type EntityArrayResponseType = HttpResponse<IProfesseur[]>;

@Injectable({ providedIn: 'root' })
export class ProfesseurService {
  public resourceUrl = SERVER_API_URL + 'services/professeur/api/professeurs';

  constructor(protected http: HttpClient) {}

  create(professeur: IProfesseur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professeur);
    return this.http
      .post<IProfesseur>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(professeur: IProfesseur): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(professeur);
    return this.http
      .put<IProfesseur>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProfesseur>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProfesseur[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(professeur: IProfesseur): IProfesseur {
    const copy: IProfesseur = Object.assign({}, professeur, {
      dateNaissance:
        professeur.dateNaissance && professeur.dateNaissance.isValid() ? professeur.dateNaissance.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateNaissance = res.body.dateNaissance ? moment(res.body.dateNaissance) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((professeur: IProfesseur) => {
        professeur.dateNaissance = professeur.dateNaissance ? moment(professeur.dateNaissance) : undefined;
      });
    }
    return res;
  }
}
