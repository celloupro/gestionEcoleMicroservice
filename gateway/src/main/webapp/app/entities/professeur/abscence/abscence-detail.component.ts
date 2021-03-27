import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAbscence } from 'app/shared/model/professeur/abscence.model';

@Component({
  selector: 'jhi-abscence-detail',
  templateUrl: './abscence-detail.component.html',
})
export class AbscenceDetailComponent implements OnInit {
  abscence: IAbscence | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ abscence }) => (this.abscence = abscence));
  }

  previousState(): void {
    window.history.back();
  }
}
