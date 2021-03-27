import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { AnneeScolaireComponent } from 'app/entities/inscription/annee-scolaire/annee-scolaire.component';
import { AnneeScolaireService } from 'app/entities/inscription/annee-scolaire/annee-scolaire.service';
import { AnneeScolaire } from 'app/shared/model/inscription/annee-scolaire.model';

describe('Component Tests', () => {
  describe('AnneeScolaire Management Component', () => {
    let comp: AnneeScolaireComponent;
    let fixture: ComponentFixture<AnneeScolaireComponent>;
    let service: AnneeScolaireService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AnneeScolaireComponent],
      })
        .overrideTemplate(AnneeScolaireComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnneeScolaireComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnneeScolaireService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AnneeScolaire(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.anneeScolaires && comp.anneeScolaires[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
