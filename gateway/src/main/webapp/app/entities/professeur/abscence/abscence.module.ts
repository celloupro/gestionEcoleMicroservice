import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AbscenceComponent } from './abscence.component';
import { AbscenceDetailComponent } from './abscence-detail.component';
import { AbscenceUpdateComponent } from './abscence-update.component';
import { AbscenceDeleteDialogComponent } from './abscence-delete-dialog.component';
import { abscenceRoute } from './abscence.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(abscenceRoute)],
  declarations: [AbscenceComponent, AbscenceDetailComponent, AbscenceUpdateComponent, AbscenceDeleteDialogComponent],
  entryComponents: [AbscenceDeleteDialogComponent],
})
export class ProfesseurAbscenceModule {}
