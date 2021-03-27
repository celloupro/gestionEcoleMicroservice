import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { ClasseComponent } from './classe.component';
import { ClasseDetailComponent } from './classe-detail.component';
import { ClasseUpdateComponent } from './classe-update.component';
import { ClasseDeleteDialogComponent } from './classe-delete-dialog.component';
import { classeRoute } from './classe.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(classeRoute)],
  declarations: [ClasseComponent, ClasseDetailComponent, ClasseUpdateComponent, ClasseDeleteDialogComponent],
  entryComponents: [ClasseDeleteDialogComponent],
})
export class InscriptionClasseModule {}
