import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { AnneeScolaireComponent } from './annee-scolaire.component';
import { AnneeScolaireDetailComponent } from './annee-scolaire-detail.component';
import { AnneeScolaireUpdateComponent } from './annee-scolaire-update.component';
import { AnneeScolaireDeleteDialogComponent } from './annee-scolaire-delete-dialog.component';
import { anneeScolaireRoute } from './annee-scolaire.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(anneeScolaireRoute)],
  declarations: [AnneeScolaireComponent, AnneeScolaireDetailComponent, AnneeScolaireUpdateComponent, AnneeScolaireDeleteDialogComponent],
  entryComponents: [AnneeScolaireDeleteDialogComponent],
})
export class InscriptionAnneeScolaireModule {}
