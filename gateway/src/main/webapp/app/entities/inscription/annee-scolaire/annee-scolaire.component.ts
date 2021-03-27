import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAnneeScolaire } from 'app/shared/model/inscription/annee-scolaire.model';
import { AnneeScolaireService } from './annee-scolaire.service';
import { AnneeScolaireDeleteDialogComponent } from './annee-scolaire-delete-dialog.component';

@Component({
  selector: 'jhi-annee-scolaire',
  templateUrl: './annee-scolaire.component.html',
})
export class AnneeScolaireComponent implements OnInit, OnDestroy {
  anneeScolaires?: IAnneeScolaire[];
  eventSubscriber?: Subscription;

  constructor(
    protected anneeScolaireService: AnneeScolaireService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.anneeScolaireService.query().subscribe((res: HttpResponse<IAnneeScolaire[]>) => (this.anneeScolaires = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAnneeScolaires();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAnneeScolaire): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAnneeScolaires(): void {
    this.eventSubscriber = this.eventManager.subscribe('anneeScolaireListModification', () => this.loadAll());
  }

  delete(anneeScolaire: IAnneeScolaire): void {
    const modalRef = this.modalService.open(AnneeScolaireDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.anneeScolaire = anneeScolaire;
  }
}
