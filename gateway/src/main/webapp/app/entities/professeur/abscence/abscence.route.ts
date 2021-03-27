import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAbscence, Abscence } from 'app/shared/model/professeur/abscence.model';
import { AbscenceService } from './abscence.service';
import { AbscenceComponent } from './abscence.component';
import { AbscenceDetailComponent } from './abscence-detail.component';
import { AbscenceUpdateComponent } from './abscence-update.component';

@Injectable({ providedIn: 'root' })
export class AbscenceResolve implements Resolve<IAbscence> {
  constructor(private service: AbscenceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAbscence> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((abscence: HttpResponse<Abscence>) => {
          if (abscence.body) {
            return of(abscence.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Abscence());
  }
}

export const abscenceRoute: Routes = [
  {
    path: '',
    component: AbscenceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.professeurAbscence.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AbscenceDetailComponent,
    resolve: {
      abscence: AbscenceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.professeurAbscence.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AbscenceUpdateComponent,
    resolve: {
      abscence: AbscenceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.professeurAbscence.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AbscenceUpdateComponent,
    resolve: {
      abscence: AbscenceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.professeurAbscence.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
