import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ParentUpdateComponent } from 'app/entities/inscription/parent/parent-update.component';
import { ParentService } from 'app/entities/inscription/parent/parent.service';
import { Parent } from 'app/shared/model/inscription/parent.model';

describe('Component Tests', () => {
  describe('Parent Management Update Component', () => {
    let comp: ParentUpdateComponent;
    let fixture: ComponentFixture<ParentUpdateComponent>;
    let service: ParentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ParentUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ParentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ParentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ParentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Parent(123);
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
        const entity = new Parent();
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
