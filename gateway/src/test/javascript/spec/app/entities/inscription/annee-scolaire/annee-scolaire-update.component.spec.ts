import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { AnneeScolaireUpdateComponent } from 'app/entities/inscription/annee-scolaire/annee-scolaire-update.component';
import { AnneeScolaireService } from 'app/entities/inscription/annee-scolaire/annee-scolaire.service';
import { AnneeScolaire } from 'app/shared/model/inscription/annee-scolaire.model';

describe('Component Tests', () => {
  describe('AnneeScolaire Management Update Component', () => {
    let comp: AnneeScolaireUpdateComponent;
    let fixture: ComponentFixture<AnneeScolaireUpdateComponent>;
    let service: AnneeScolaireService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [AnneeScolaireUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AnneeScolaireUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AnneeScolaireUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AnneeScolaireService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AnneeScolaire(123);
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
        const entity = new AnneeScolaire();
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
