import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRetard } from 'app/shared/model/professeur/retard.model';
import { RetardService } from './retard.service';

@Component({
  templateUrl: './retard-delete-dialog.component.html',
})
export class RetardDeleteDialogComponent {
  retard?: IRetard;

  constructor(protected retardService: RetardService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.retardService.delete(id).subscribe(() => {
      this.eventManager.broadcast('retardListModification');
      this.activeModal.close();
    });
  }
}
