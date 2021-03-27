import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RetardDetailComponent } from 'app/entities/professeur/retard/retard-detail.component';
import { Retard } from 'app/shared/model/professeur/retard.model';

describe('Component Tests', () => {
  describe('Retard Management Detail Component', () => {
    let comp: RetardDetailComponent;
    let fixture: ComponentFixture<RetardDetailComponent>;
    const route = ({ data: of({ retard: new Retard(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RetardDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RetardDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RetardDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load retard on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.retard).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
