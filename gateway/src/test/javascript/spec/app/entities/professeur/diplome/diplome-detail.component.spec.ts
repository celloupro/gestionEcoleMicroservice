import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DiplomeDetailComponent } from 'app/entities/professeur/diplome/diplome-detail.component';
import { Diplome } from 'app/shared/model/professeur/diplome.model';

describe('Component Tests', () => {
  describe('Diplome Management Detail Component', () => {
    let comp: DiplomeDetailComponent;
    let fixture: ComponentFixture<DiplomeDetailComponent>;
    const route = ({ data: of({ diplome: new Diplome(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DiplomeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DiplomeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DiplomeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load diplome on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.diplome).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
