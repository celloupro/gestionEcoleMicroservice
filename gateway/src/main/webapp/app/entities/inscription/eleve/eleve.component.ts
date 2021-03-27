import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEleve } from 'app/shared/model/inscription/eleve.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { EleveService } from './eleve.service';
import { EleveDeleteDialogComponent } from './eleve-delete-dialog.component';

@Component({
  selector: 'jhi-eleve',
  templateUrl: './eleve.component.html',
})
export class EleveComponent implements OnInit, OnDestroy {
  eleves: IEleve[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected eleveService: EleveService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.eleves = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.eleveService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IEleve[]>) => this.paginateEleves(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.eleves = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEleves();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEleve): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInEleves(): void {
    this.eventSubscriber = this.eventManager.subscribe('eleveListModification', () => this.reset());
  }

  delete(eleve: IEleve): void {
    const modalRef = this.modalService.open(EleveDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.eleve = eleve;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateEleves(data: IEleve[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.eleves.push(data[i]);
      }
    }
  }
}
