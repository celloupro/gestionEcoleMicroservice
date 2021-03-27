import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAnneeScolaire, AnneeScolaire } from 'app/shared/model/inscription/annee-scolaire.model';
import { AnneeScolaireService } from './annee-scolaire.service';
import { AnneeScolaireComponent } from './annee-scolaire.component';
import { AnneeScolaireDetailComponent } from './annee-scolaire-detail.component';
import { AnneeScolaireUpdateComponent } from './annee-scolaire-update.component';

@Injectable({ providedIn: 'root' })
export class AnneeScolaireResolve implements Resolve<IAnneeScolaire> {
  constructor(private service: AnneeScolaireService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAnneeScolaire> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((anneeScolaire: HttpResponse<AnneeScolaire>) => {
          if (anneeScolaire.body) {
            return of(anneeScolaire.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AnneeScolaire());
  }
}

export const anneeScolaireRoute: Routes = [
  {
    path: '',
    component: AnneeScolaireComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.inscriptionAnneeScolaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AnneeScolaireDetailComponent,
    resolve: {
      anneeScolaire: AnneeScolaireResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.inscriptionAnneeScolaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AnneeScolaireUpdateComponent,
    resolve: {
      anneeScolaire: AnneeScolaireResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.inscriptionAnneeScolaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AnneeScolaireUpdateComponent,
    resolve: {
      anneeScolaire: AnneeScolaireResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.inscriptionAnneeScolaire.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
