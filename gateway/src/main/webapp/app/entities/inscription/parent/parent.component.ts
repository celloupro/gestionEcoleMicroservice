import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IParent } from 'app/shared/model/inscription/parent.model';
import { ParentService } from './parent.service';
import { ParentDeleteDialogComponent } from './parent-delete-dialog.component';

@Component({
  selector: 'jhi-parent',
  templateUrl: './parent.component.html',
})
export class ParentComponent implements OnInit, OnDestroy {
  parents?: IParent[];
  eventSubscriber?: Subscription;

  constructor(protected parentService: ParentService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.parentService.query().subscribe((res: HttpResponse<IParent[]>) => (this.parents = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInParents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IParent): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInParents(): void {
    this.eventSubscriber = this.eventManager.subscribe('parentListModification', () => this.loadAll());
  }

  delete(parent: IParent): void {
    const modalRef = this.modalService.open(ParentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.parent = parent;
  }
}
