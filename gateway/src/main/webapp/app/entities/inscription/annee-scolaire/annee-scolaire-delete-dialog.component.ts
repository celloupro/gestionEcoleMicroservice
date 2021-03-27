import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAnneeScolaire } from 'app/shared/model/inscription/annee-scolaire.model';
import { AnneeScolaireService } from './annee-scolaire.service';

@Component({
  templateUrl: './annee-scolaire-delete-dialog.component.html',
})
export class AnneeScolaireDeleteDialogComponent {
  anneeScolaire?: IAnneeScolaire;

  constructor(
    protected anneeScolaireService: AnneeScolaireService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.anneeScolaireService.delete(id).subscribe(() => {
      this.eventManager.broadcast('anneeScolaireListModification');
      this.activeModal.close();
    });
  }
}
