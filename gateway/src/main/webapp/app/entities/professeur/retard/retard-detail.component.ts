import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRetard } from 'app/shared/model/professeur/retard.model';

@Component({
  selector: 'jhi-retard-detail',
  templateUrl: './retard-detail.component.html',
})
export class RetardDetailComponent implements OnInit {
  retard: IRetard | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ retard }) => (this.retard = retard));
  }

  previousState(): void {
    window.history.back();
  }
}
