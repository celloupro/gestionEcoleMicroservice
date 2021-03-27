import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDiplome } from 'app/shared/model/professeur/diplome.model';
import { DiplomeService } from './diplome.service';
import { DiplomeDeleteDialogComponent } from './diplome-delete-dialog.component';

@Component({
  selector: 'jhi-diplome',
  templateUrl: './diplome.component.html',
})
export class DiplomeComponent implements OnInit, OnDestroy {
  diplomes?: IDiplome[];
  eventSubscriber?: Subscription;

  constructor(protected diplomeService: DiplomeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.diplomeService.query().subscribe((res: HttpResponse<IDiplome[]>) => (this.diplomes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDiplomes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDiplome): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDiplomes(): void {
    this.eventSubscriber = this.eventManager.subscribe('diplomeListModification', () => this.loadAll());
  }

  delete(diplome: IDiplome): void {
    const modalRef = this.modalService.open(DiplomeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.diplome = diplome;
  }
}
