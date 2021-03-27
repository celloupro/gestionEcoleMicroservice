import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AbscenceService } from 'app/entities/professeur/abscence/abscence.service';
import { IAbscence, Abscence } from 'app/shared/model/professeur/abscence.model';

describe('Service Tests', () => {
  describe('Abscence Service', () => {
    let injector: TestBed;
    let service: AbscenceService;
    let httpMock: HttpTestingController;
    let elemDefault: IAbscence;
    let expectedResult: IAbscence | IAbscence[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AbscenceService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Abscence(0, currentDate, currentDate, 0, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            heureDebut: currentDate.format(DATE_TIME_FORMAT),
            heureFin: currentDate.format(DATE_TIME_FORMAT),
            dateAbsence: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Abscence', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            heureDebut: currentDate.format(DATE_TIME_FORMAT),
            heureFin: currentDate.format(DATE_TIME_FORMAT),
            dateAbsence: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            heureDebut: currentDate,
            heureFin: currentDate,
            dateAbsence: currentDate,
          },
          returnedFromService
        );

        service.create(new Abscence()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Abscence', () => {
        const returnedFromService = Object.assign(
          {
            heureDebut: currentDate.format(DATE_TIME_FORMAT),
            heureFin: currentDate.format(DATE_TIME_FORMAT),
            nombreHeure: 'BBBBBB',
            dateAbsence: currentDate.format(DATE_FORMAT),
            motif: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            heureDebut: currentDate,
            heureFin: currentDate,
            dateAbsence: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Abscence', () => {
        const returnedFromService = Object.assign(
          {
            heureDebut: currentDate.format(DATE_TIME_FORMAT),
            heureFin: currentDate.format(DATE_TIME_FORMAT),
            nombreHeure: 'BBBBBB',
            dateAbsence: currentDate.format(DATE_FORMAT),
            motif: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            heureDebut: currentDate,
            heureFin: currentDate,
            dateAbsence: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Abscence', () => {
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
