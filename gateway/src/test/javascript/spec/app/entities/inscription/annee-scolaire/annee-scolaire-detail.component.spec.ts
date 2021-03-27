import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AnneeScolaireDetailComponent } from 'app/entities/inscription/annee-scolaire/annee-scolaire-detail.component';
import { AnneeScolaire } from 'app/shared/model/inscription/annee-scolaire.model';

describe('Component Tests', () => {
  describe('AnneeScolaire Management Detail Component', () => {
    let comp: AnneeScolaireDetailComponent;
    let fixture: ComponentFixture<AnneeScolaireDetailComponent>;
    const route = ({ data: of({ anneeScolaire: new AnneeScolaire(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AnneeScolaireDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AnneeScolaireDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AnneeScolaireDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load anneeScolaire on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.anneeScolaire).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
