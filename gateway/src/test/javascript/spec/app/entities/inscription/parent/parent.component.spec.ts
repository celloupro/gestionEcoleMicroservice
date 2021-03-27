import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { ParentComponent } from 'app/entities/inscription/parent/parent.component';
import { ParentService } from 'app/entities/inscription/parent/parent.service';
import { Parent } from 'app/shared/model/inscription/parent.model';

describe('Component Tests', () => {
  describe('Parent Management Component', () => {
    let comp: ParentComponent;
    let fixture: ComponentFixture<ParentComponent>;
    let service: ParentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ParentComponent],
      })
        .overrideTemplate(ParentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Parent(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.parents && comp.parents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
