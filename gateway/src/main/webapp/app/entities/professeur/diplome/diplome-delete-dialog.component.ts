import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiplome } from 'app/shared/model/professeur/diplome.model';
import { DiplomeService } from './diplome.service';

@Component({
  templateUrl: './diplome-delete-dialog.component.html',
})
export class DiplomeDeleteDialogComponent {
  diplome?: IDiplome;

  constructor(protected diplomeService: DiplomeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.diplomeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('diplomeListModification');
      this.activeModal.close();
    });
  }
}
