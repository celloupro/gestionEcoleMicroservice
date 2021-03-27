import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DiplomeUpdateComponent } from 'app/entities/professeur/diplome/diplome-update.component';
import { DiplomeService } from 'app/entities/professeur/diplome/diplome.service';
import { Diplome } from 'app/shared/model/professeur/diplome.model';

describe('Component Tests', () => {
  describe('Diplome Management Update Component', () => {
    let comp: DiplomeUpdateComponent;
    let fixture: ComponentFixture<DiplomeUpdateComponent>;
    let service: DiplomeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DiplomeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DiplomeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiplomeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DiplomeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Diplome(123);
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
        const entity = new Diplome();
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
