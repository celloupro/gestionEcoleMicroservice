import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RetardUpdateComponent } from 'app/entities/professeur/retard/retard-update.component';
import { RetardService } from 'app/entities/professeur/retard/retard.service';
import { Retard } from 'app/shared/model/professeur/retard.model';

describe('Component Tests', () => {
  describe('Retard Management Update Component', () => {
    let comp: RetardUpdateComponent;
    let fixture: ComponentFixture<RetardUpdateComponent>;
    let service: RetardService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RetardUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RetardUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RetardUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RetardService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Retard(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Retard();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
