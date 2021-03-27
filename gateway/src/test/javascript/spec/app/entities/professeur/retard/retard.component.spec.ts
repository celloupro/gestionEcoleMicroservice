import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { RetardComponent } from 'app/entities/professeur/retard/retard.component';
import { RetardService } from 'app/entities/professeur/retard/retard.service';
import { Retard } from 'app/shared/model/professeur/retard.model';

describe('Component Tests', () => {
  describe('Retard Management Component', () => {
    let comp: RetardComponent;
    let fixture: ComponentFixture<RetardComponent>;
    let service: RetardService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RetardComponent],
      })
        .overrideTemplate(RetardComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RetardComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RetardService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Retard(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.retards && comp.retards[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
