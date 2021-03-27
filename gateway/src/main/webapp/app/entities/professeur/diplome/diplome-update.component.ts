import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDiplome, Diplome } from 'app/shared/model/professeur/diplome.model';
import { DiplomeService } from './diplome.service';
import { IProfesseur } from 'app/shared/model/professeur/professeur.model';
import { ProfesseurService } from 'app/entities/professeur/professeur/professeur.service';

@Component({
  selector: 'jhi-diplome-update',
  templateUrl: './diplome-update.component.html',
})
export class DiplomeUpdateComponent implements OnInit {
  isSaving = false;
  professeurs: IProfesseur[] = [];
  dateObtentionDp: any;

  editForm = this.fb.group({
    id: [],
    intitule: [null, [Validators.required]],
    ecole: [null, [Validators.required]],
    specialite: [null, [Validators.required]],
    niveau: [null, [Validators.required]],
    dateObtention: [],
    professeur: [],
  });

  constructor(
    protected diplomeService: DiplomeService,
    protected professeurService: ProfesseurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ diplome }) => {
      this.updateForm(diplome);

      this.professeurService.query().subscribe((res: HttpResponse<IProfesseur[]>) => (this.professeurs = res.body || []));
    });
  }

  updateForm(diplome: IDiplome): void {
    this.editForm.patchValue({
      id: diplome.id,
      intitule: diplome.intitule,
      ecole: diplome.ecole,
      specialite: diplome.specialite,
      niveau: diplome.niveau,
      dateObtention: diplome.dateObtention,
      professeur: diplome.professeur,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const diplome = this.createFromForm();
    if (diplome.id !== undefined) {
      this.subscribeToSaveResponse(this.diplomeService.update(diplome));
    } else {
      this.subscribeToSaveResponse(this.diplomeService.create(diplome));
    }
  }

  private createFromForm(): IDiplome {
    return {
      ...new Diplome(),
      id: this.editForm.get(['id'])!.value,
      intitule: this.editForm.get(['intitule'])!.value,
      ecole: this.editForm.get(['ecole'])!.value,
      specialite: this.editForm.get(['specialite'])!.value,
      niveau: this.editForm.get(['niveau'])!.value,
      dateObtention: this.editForm.get(['dateObtention'])!.value,
      professeur: this.editForm.get(['professeur'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiplome>>): void {
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
