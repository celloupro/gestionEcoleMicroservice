import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { RetardService } from 'app/entities/professeur/retard/retard.service';
import { IRetard, Retard } from 'app/shared/model/professeur/retard.model';

describe('Service Tests', () => {
  describe('Retard Service', () => {
    let injector: TestBed;
    let service: RetardService;
    let httpMock: HttpTestingController;
    let elemDefault: IRetard;
    let expectedResult: IRetard | IRetard[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RetardService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Retard(0, currentDate, currentDate, 0, currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            heureDebut: currentDate.format(DATE_TIME_FORMAT),
            heureFin: currentDate.format(DATE_TIME_FORMAT),
            dateRetard: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Retard', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            heureDebut: currentDate.format(DATE_TIME_FORMAT),
            heureFin: currentDate.format(DATE_TIME_FORMAT),
            dateRetard: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            heureDebut: currentDate,
            heureFin: currentDate,
            dateRetard: currentDate,
          },
          returnedFromService
        );

        service.create(new Retard()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Retard', () => {
        const returnedFromService = Object.assign(
          {
            heureDebut: currentDate.format(DATE_TIME_FORMAT),
            heureFin: currentDate.format(DATE_TIME_FORMAT),
            nombreHeure: 'BBBBBB',
            dateRetard: currentDate.format(DATE_FORMAT),
            motif: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            heureDebut: currentDate,
            heureFin: currentDate,
            dateRetard: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Retard', () => {
        const returnedFromService = Object.assign(
          {
            heureDebut: currentDate.format(DATE_TIME_FORMAT),
            heureFin: currentDate.format(DATE_TIME_FORMAT),
            nombreHeure: 'BBBBBB',
            dateRetard: currentDate.format(DATE_FORMAT),
            motif: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            heureDebut: currentDate,
            heureFin: currentDate,
            dateRetard: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Retard', () => {
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
