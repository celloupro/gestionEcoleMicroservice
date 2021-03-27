import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AbscenceDetailComponent } from 'app/entities/professeur/abscence/abscence-detail.component';
import { Abscence } from 'app/shared/model/professeur/abscence.model';

describe('Component Tests', () => {
  describe('Abscence Management Detail Component', () => {
    let comp: AbscenceDetailComponent;
    let fixture: ComponentFixture<AbscenceDetailComponent>;
    const route = ({ data: of({ abscence: new Abscence(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AbscenceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AbscenceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AbscenceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load abscence on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.abscence).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
