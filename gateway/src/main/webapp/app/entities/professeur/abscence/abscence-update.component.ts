import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAbscence, Abscence } from 'app/shared/model/professeur/abscence.model';
import { AbscenceService } from './abscence.service';
import { IProfesseur } from 'app/shared/model/professeur/professeur.model';
import { ProfesseurService } from 'app/entities/professeur/professeur/professeur.service';

@Component({
  selector: 'jhi-abscence-update',
  templateUrl: './abscence-update.component.html',
})
export class AbscenceUpdateComponent implements OnInit {
  isSaving = false;
  professeurs: IProfesseur[] = [];
  dateAbsenceDp: any;

  editForm = this.fb.group({
    id: [],
    heureDebut: [null, [Validators.required]],
    heureFin: [null, [Validators.required]],
    nombreHeure: [],
    dateAbsence: [],
    motif: [null, [Validators.required]],
    professeur: [],
  });

  constructor(
    protected abscenceService: AbscenceService,
    protected professeurService: ProfesseurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ abscence }) => {
      if (!abscence.id) {
        const today = moment().startOf('day');
        abscence.heureDebut = today;
        abscence.heureFin = today;
      }

      this.updateForm(abscence);

      this.professeurService.query().subscribe((res: HttpResponse<IProfesseur[]>) => (this.professeurs = res.body || []));
    });
  }

  updateForm(abscence: IAbscence): void {
    this.editForm.patchValue({
      id: abscence.id,
      heureDebut: abscence.heureDebut ? abscence.heureDebut.format(DATE_TIME_FORMAT) : null,
      heureFin: abscence.heureFin ? abscence.heureFin.format(DATE_TIME_FORMAT) : null,
      nombreHeure: abscence.nombreHeure,
      dateAbsence: abscence.dateAbsence,
      motif: abscence.motif,
      professeur: abscence.professeur,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const abscence = this.createFromForm();
    if (abscence.id !== undefined) {
      this.subscribeToSaveResponse(this.abscenceService.update(abscence));
    } else {
      this.subscribeToSaveResponse(this.abscenceService.create(abscence));
    }
  }

  private createFromForm(): IAbscence {
    return {
      ...new Abscence(),
      id: this.editForm.get(['id'])!.value,
      heureDebut: this.editForm.get(['heureDebut'])!.value ? moment(this.editForm.get(['heureDebut'])!.value, DATE_TIME_FORMAT) : undefined,
      heureFin: this.editForm.get(['heureFin'])!.value ? moment(this.editForm.get(['heureFin'])!.value, DATE_TIME_FORMAT) : undefined,
      nombreHeure: this.editForm.get(['nombreHeure'])!.value,
      dateAbsence: this.editForm.get(['dateAbsence'])!.value,
      motif: this.editForm.get(['motif'])!.value,
      professeur: this.editForm.get(['professeur'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAbscence>>): void {
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
