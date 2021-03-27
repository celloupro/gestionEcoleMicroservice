import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { RetardComponent } from './retard.component';
import { RetardDetailComponent } from './retard-detail.component';
import { RetardUpdateComponent } from './retard-update.component';
import { RetardDeleteDialogComponent } from './retard-delete-dialog.component';
import { retardRoute } from './retard.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(retardRoute)],
  declarations: [RetardComponent, RetardDetailComponent, RetardUpdateComponent, RetardDeleteDialogComponent],
  entryComponents: [RetardDeleteDialogComponent],
})
export class ProfesseurRetardModule {}
