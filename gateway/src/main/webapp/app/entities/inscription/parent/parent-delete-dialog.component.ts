import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParent } from 'app/shared/model/inscription/parent.model';
import { ParentService } from './parent.service';

@Component({
  templateUrl: './parent-delete-dialog.component.html',
})
export class ParentDeleteDialogComponent {
  parent?: IParent;

  constructor(protected parentService: ParentService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.parentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('parentListModification');
      this.activeModal.close();
    });
  }
}
