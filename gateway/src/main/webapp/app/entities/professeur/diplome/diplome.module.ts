import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { DiplomeComponent } from './diplome.component';
import { DiplomeDetailComponent } from './diplome-detail.component';
import { DiplomeUpdateComponent } from './diplome-update.component';
import { DiplomeDeleteDialogComponent } from './diplome-delete-dialog.component';
import { diplomeRoute } from './diplome.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(diplomeRoute)],
  declarations: [DiplomeComponent, DiplomeDetailComponent, DiplomeUpdateComponent, DiplomeDeleteDialogComponent],
  entryComponents: [DiplomeDeleteDialogComponent],
})
export class ProfesseurDiplomeModule {}
