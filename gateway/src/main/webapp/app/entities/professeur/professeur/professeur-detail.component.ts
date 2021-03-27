import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProfesseur } from 'app/shared/model/professeur/professeur.model';

@Component({
  selector: 'jhi-professeur-detail',
  templateUrl: './professeur-detail.component.html',
})
export class ProfesseurDetailComponent implements OnInit {
  professeur: IProfesseur | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ professeur }) => (this.professeur = professeur));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
