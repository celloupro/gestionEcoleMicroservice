import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { DiplomeService } from 'app/entities/professeur/diplome/diplome.service';
import { IDiplome, Diplome } from 'app/shared/model/professeur/diplome.model';

describe('Service Tests', () => {
  describe('Diplome Service', () => {
    let injector: TestBed;
    let service: DiplomeService;
    let httpMock: HttpTestingController;
    let elemDefault: IDiplome;
    let expectedResult: IDiplome | IDiplome[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DiplomeService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Diplome(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateObtention: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Diplome', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateObtention: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateObtention: currentDate,
          },
          returnedFromService
        );

        service.create(new Diplome()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Diplome', () => {
        const returnedFromService = Object.assign(
          {
            intitule: 'BBBBBB',
            ecole: 'BBBBBB',
            specialite: 'BBBBBB',
            niveau: 'BBBBBB',
            dateObtention: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateObtention: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Diplome', () => {
        const returnedFromService = Object.assign(
          {
            intitule: 'BBBBBB',
            ecole: 'BBBBBB',
            specialite: 'BBBBBB',
            niveau: 'BBBBBB',
            dateObtention: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateObtention: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Diplome', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
