import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDiplome, Diplome } from 'app/shared/model/professeur/diplome.model';
import { DiplomeService } from './diplome.service';
import { DiplomeComponent } from './diplome.component';
import { DiplomeDetailComponent } from './diplome-detail.component';
import { DiplomeUpdateComponent } from './diplome-update.component';

@Injectable({ providedIn: 'root' })
export class DiplomeResolve implements Resolve<IDiplome> {
  constructor(private service: DiplomeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDiplome> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((diplome: HttpResponse<Diplome>) => {
          if (diplome.body) {
            return of(diplome.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Diplome());
  }
}

export const diplomeRoute: Routes = [
  {
    path: '',
    component: DiplomeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.professeurDiplome.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DiplomeDetailComponent,
    resolve: {
      diplome: DiplomeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.professeurDiplome.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DiplomeUpdateComponent,
    resolve: {
      diplome: DiplomeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.professeurDiplome.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DiplomeUpdateComponent,
    resolve: {
      diplome: DiplomeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.professeurDiplome.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
