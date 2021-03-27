import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IParent, Parent } from 'app/shared/model/inscription/parent.model';
import { ParentService } from './parent.service';

@Component({
  selector: 'jhi-parent-update',
  templateUrl: './parent-update.component.html',
})
export class ParentUpdateComponent implements OnInit {
  isSaving = false;
  dateNaissanceDp: any;

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required]],
    prenom: [null, [Validators.required]],
    sexe: [null, [Validators.required]],
    dateNaissance: [],
    lieuNaissance: [null, [Validators.required]],
    typeParente: [null, [Validators.required]],
    tel: [null, [Validators.required]],
    adresse: [null, [Validators.required]],
    numCarteIdentite: [null, [Validators.required]],
  });

  constructor(protected parentService: ParentService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ parent }) => {
      this.updateForm(parent);
    });
  }

  updateForm(parent: IParent): void {
    this.editForm.patchValue({
      id: parent.id,
      nom: parent.nom,
      prenom: parent.prenom,
      sexe: parent.sexe,
      dateNaissance: parent.dateNaissance,
      lieuNaissance: parent.lieuNaissance,
      typeParente: parent.typeParente,
      tel: parent.tel,
      adresse: parent.adresse,
      numCarteIdentite: parent.numCarteIdentite,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const parent = this.createFromForm();
    if (parent.id !== undefined) {
      this.subscribeToSaveResponse(this.parentService.update(parent));
    } else {
      this.subscribeToSaveResponse(this.parentService.create(parent));
    }
  }

  private createFromForm(): IParent {
    return {
      ...new Parent(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      prenom: this.editForm.get(['prenom'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
      dateNaissance: this.editForm.get(['dateNaissance'])!.value,
      lieuNaissance: this.editForm.get(['lieuNaissance'])!.value,
      typeParente: this.editForm.get(['typeParente'])!.value,
      tel: this.editForm.get(['tel'])!.value,
      adresse: this.editForm.get(['adresse'])!.value,
      numCarteIdentite: this.editForm.get(['numCarteIdentite'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParent>>): void {
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
}
