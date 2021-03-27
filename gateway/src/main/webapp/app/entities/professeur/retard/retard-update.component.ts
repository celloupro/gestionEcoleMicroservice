import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IRetard, Retard } from 'app/shared/model/professeur/retard.model';
import { RetardService } from './retard.service';
import { IProfesseur } from 'app/shared/model/professeur/professeur.model';
import { ProfesseurService } from 'app/entities/professeur/professeur/professeur.service';

@Component({
  selector: 'jhi-retard-update',
  templateUrl: './retard-update.component.html',
})
export class RetardUpdateComponent implements OnInit {
  isSaving = false;
  professeurs: IProfesseur[] = [];
  dateRetardDp: any;

  editForm = this.fb.group({
    id: [],
    heureDebut: [null, [Validators.required]],
    heureFin: [null, [Validators.required]],
    nombreHeure: [],
    dateRetard: [],
    motif: [null, [Validators.required]],
    professeur: [],
  });

  constructor(
    protected retardService: RetardService,
    protected professeurService: ProfesseurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ retard }) => {
      if (!retard.id) {
        const today = moment().startOf('day');
        retard.heureDebut = today;
        retard.heureFin = today;
      }

      this.updateForm(retard);

      this.professeurService.query().subscribe((res: HttpResponse<IProfesseur[]>) => (this.professeurs = res.body || []));
    });
  }

  updateForm(retard: IRetard): void {
    this.editForm.patchValue({
      id: retard.id,
      heureDebut: retard.heureDebut ? retard.heureDebut.format(DATE_TIME_FORMAT) : null,
      heureFin: retard.heureFin ? retard.heureFin.format(DATE_TIME_FORMAT) : null,
      nombreHeure: retard.nombreHeure,
      dateRetard: retard.dateRetard,
      motif: retard.motif,
      professeur: retard.professeur,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const retard = this.createFromForm();
    if (retard.id !== undefined) {
      this.subscribeToSaveResponse(this.retardService.update(retard));
    } else {
      this.subscribeToSaveResponse(this.retardService.create(retard));
    }
  }

  private createFromForm(): IRetard {
    return {
      ...new Retard(),
      id: this.editForm.get(['id'])!.value,
      heureDebut: this.editForm.get(['heureDebut'])!.value ? moment(this.editForm.get(['heureDebut'])!.value, DATE_TIME_FORMAT) : undefined,
      heureFin: this.editForm.get(['heureFin'])!.value ? moment(this.editForm.get(['heureFin'])!.value, DATE_TIME_FORMAT) : undefined,
      nombreHeure: this.editForm.get(['nombreHeure'])!.value,
      dateRetard: this.editForm.get(['dateRetard'])!.value,
      motif: this.editForm.get(['motif'])!.value,
      professeur: this.editForm.get(['professeur'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRetard>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IProfesseur): any {
    return item.id;
  }
}
