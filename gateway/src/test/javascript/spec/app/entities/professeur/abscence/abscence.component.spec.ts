import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { AbscenceComponent } from 'app/entities/professeur/abscence/abscence.component';
import { AbscenceService } from 'app/entities/professeur/abscence/abscence.service';
import { Abscence } from 'app/shared/model/professeur/abscence.model';

describe('Component Tests', () => {
  describe('Abscence Management Component', () => {
    let comp: AbscenceComponent;
    let fixture: ComponentFixture<AbscenceComponent>;
    let service: AbscenceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AbscenceComponent],
      })
        .overrideTemplate(AbscenceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AbscenceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AbscenceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Abscence(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.abscences && comp.abscences[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
