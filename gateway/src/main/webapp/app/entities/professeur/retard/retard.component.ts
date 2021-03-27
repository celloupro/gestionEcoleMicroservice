import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRetard } from 'app/shared/model/professeur/retard.model';
import { RetardService } from './retard.service';
import { RetardDeleteDialogComponent } from './retard-delete-dialog.component';

@Component({
  selector: 'jhi-retard',
  templateUrl: './retard.component.html',
})
export class RetardComponent implements OnInit, OnDestroy {
  retards?: IRetard[];
  eventSubscriber?: Subscription;

  constructor(protected retardService: RetardService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.retardService.query().subscribe((res: HttpResponse<IRetard[]>) => (this.retards = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRetards();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRetard): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRetards(): void {
    this.eventSubscriber = this.eventManager.subscribe('retardListModification', () => this.loadAll());
  }

  delete(retard: IRetard): void {
    const modalRef = this.modalService.open(RetardDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.retard = retard;
  }
}
