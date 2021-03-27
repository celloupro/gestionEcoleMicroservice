import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAbscence } from 'app/shared/model/professeur/abscence.model';
import { AbscenceService } from './abscence.service';
import { AbscenceDeleteDialogComponent } from './abscence-delete-dialog.component';

@Component({
  selector: 'jhi-abscence',
  templateUrl: './abscence.component.html',
})
export class AbscenceComponent implements OnInit, OnDestroy {
  abscences?: IAbscence[];
  eventSubscriber?: Subscription;

  constructor(protected abscenceService: AbscenceService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.abscenceService.query().subscribe((res: HttpResponse<IAbscence[]>) => (this.abscences = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAbscences();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAbscence): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAbscences(): void {
    this.eventSubscriber = this.eventManager.subscribe('abscenceListModification', () => this.loadAll());
  }

  delete(abscence: IAbscence): void {
    const modalRef = this.modalService.open(AbscenceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.abscence = abscence;
  }
}
