import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { DiplomeComponent } from 'app/entities/professeur/diplome/diplome.component';
import { DiplomeService } from 'app/entities/professeur/diplome/diplome.service';
import { Diplome } from 'app/shared/model/professeur/diplome.model';

describe('Component Tests', () => {
  describe('Diplome Management Component', () => {
    let comp: DiplomeComponent;
    let fixture: ComponentFixture<DiplomeComponent>;
    let service: DiplomeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DiplomeComponent],
      })
        .overrideTemplate(DiplomeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiplomeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiplomeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Diplome(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.diplomes && comp.diplomes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
