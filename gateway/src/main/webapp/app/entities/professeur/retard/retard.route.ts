import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRetard, Retard } from 'app/shared/model/professeur/retard.model';
import { RetardService } from './retard.service';
import { RetardComponent } from './retard.component';
import { RetardDetailComponent } from './retard-detail.component';
import { RetardUpdateComponent } from './retard-update.component';

@Injectable({ providedIn: 'root' })
export class RetardResolve implements Resolve<IRetard> {
  constructor(private service: RetardService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRetard> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((retard: HttpResponse<Retard>) => {
          if (retard.body) {
            return of(retard.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Retard());
  }
}

export const retardRoute: Routes = [
  {
    path: '',
    component: RetardComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.professeurRetard.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RetardDetailComponent,
    resolve: {
      retard: RetardResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.professeurRetard.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RetardUpdateComponent,
    resolve: {
      retard: RetardResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.professeurRetard.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RetardUpdateComponent,
    resolve: {
      retard: RetardResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.professeurRetard.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
