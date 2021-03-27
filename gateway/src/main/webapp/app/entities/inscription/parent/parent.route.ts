import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IParent, Parent } from 'app/shared/model/inscription/parent.model';
import { ParentService } from './parent.service';
import { ParentComponent } from './parent.component';
import { ParentDetailComponent } from './parent-detail.component';
import { ParentUpdateComponent } from './parent-update.component';

@Injectable({ providedIn: 'root' })
export class ParentResolve implements Resolve<IParent> {
  constructor(private service: ParentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParent> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((parent: HttpResponse<Parent>) => {
          if (parent.body) {
            return of(parent.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Parent());
  }
}

export const parentRoute: Routes = [
  {
    path: '',
    component: ParentComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.inscriptionParent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ParentDetailComponent,
    resolve: {
      parent: ParentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.inscriptionParent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ParentUpdateComponent,
    resolve: {
      parent: ParentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.inscriptionParent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ParentUpdateComponent,
    resolve: {
      parent: ParentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewayApp.inscriptionParent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
