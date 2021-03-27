import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAnneeScolaire, AnneeScolaire } from 'app/shared/model/inscription/annee-scolaire.model';
import { AnneeScolaireService } from './annee-scolaire.service';
import { IEleve } from 'app/shared/model/inscription/eleve.model';
import { EleveService } from 'app/entities/inscription/eleve/eleve.service';
import { IClasse } from 'app/shared/model/inscription/classe.model';
import { ClasseService } from 'app/entities/inscription/classe/classe.service';

type SelectableEntity = IEleve | IClasse;

@Component({
  selector: 'jhi-annee-scolaire-update',
  templateUrl: './annee-scolaire-update.component.html',
})
export class AnneeScolaireUpdateComponent implements OnInit {
  isSaving = false;
  eleves: IEleve[] = [];
  classes: IClasse[] = [];
  dateDebutDp: any;
  dateFinDp: any;

  editForm = this.fb.group({
    id: [],
    dateDebut: [null, [Validators.required]],
    dateFin: [null, [Validators.required]],
    eleves: [],
    classes: [],
  });

  constructor(
    protected anneeScolaireService: AnneeScolaireService,
    protected eleveService: EleveService,
    protected classeService: ClasseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ anneeScolaire }) => {
      this.updateForm(anneeScolaire);

      this.eleveService.query().subscribe((res: HttpResponse<IEleve[]>) => (this.eleves = res.body || []));

      this.classeService.query().subscribe((res: HttpResponse<IClasse[]>) => (this.classes = res.body || []));
    });
  }

  updateForm(anneeScolaire: IAnneeScolaire): void {
    this.editForm.patchValue({
      id: anneeScolaire.id,
      dateDebut: anneeScolaire.dateDebut,
      dateFin: anneeScolaire.dateFin,
      eleves: anneeScolaire.eleves,
      classes: anneeScolaire.classes,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const anneeScolaire = this.createFromForm();
    if (anneeScolaire.id !== undefined) {
      this.subscribeToSaveResponse(this.anneeScolaireService.update(anneeScolaire));
    } else {
      this.subscribeToSaveResponse(this.anneeScolaireService.create(anneeScolaire));
    }
  }

  private createFromForm(): IAnneeScolaire {
    return {
      ...new AnneeScolaire(),
      id: this.editForm.get(['id'])!.value,
      dateDebut: this.editForm.get(['dateDebut'])!.value,
      dateFin: this.editForm.get(['dateFin'])!.value,
      eleves: this.editForm.get(['eleves'])!.value,
      classes: this.editForm.get(['classes'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnneeScolaire>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: SelectableEntity[], option: SelectableEntity): SelectableEntity {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
