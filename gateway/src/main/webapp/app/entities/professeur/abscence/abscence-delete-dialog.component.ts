import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAbscence } from 'app/shared/model/professeur/abscence.model';
import { AbscenceService } from './abscence.service';

@Component({
  templateUrl: './abscence-delete-dialog.component.html',
})
export class AbscenceDeleteDialogComponent {
  abscence?: IAbscence;

  constructor(protected abscenceService: AbscenceService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.abscenceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('abscenceListModification');
      this.activeModal.close();
    });
  }
}
