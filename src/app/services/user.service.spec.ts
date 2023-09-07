import { TestBed, inject } from '@angular/core/testing';
import { UserService } from './user-api.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, throwError } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let id = 1;
  let baseURL = 'http://localhost:3000/';
  const getData = [{ id: id, name: 'name', description: 'description', email: 'email@gmail.com' }];
  const updateUserData = { id: id, name: 'Update name', description: 'Update description', email: 'email@gmail.com' };
  const deleteUserData = { id: id, name: 'Delete name', description: 'Delete description', email: 'email@gmail.com' };
  const errorResponses: { [key: string]: HttpErrorResponse } = {
    '500': new HttpErrorResponse({ error: 'Internal Server Error', status: 500, statusText: 'Internal Server Error' }),
    '404': new HttpErrorResponse({ error: 'Not Found', status: 404, statusText: 'Not Found' }),
    '403': new HttpErrorResponse({ error: 'Forbidden', status: 403, statusText: 'Forbidden' })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [UserService],

    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  //Write a test to check if the service is instantiated correctly.
  it('should Test created service', () => {
    expect(service).toBeTruthy();
  });

  //function testMethodDataBackEnd general
  function testMethodDataBackEnd(method: Observable<any>, url: string, requestData: any, requestMethod: string) {
    method.subscribe((data) => {
      expect(data).toEqual(requestData);
    });

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe(requestMethod);
    req.flush(requestData);
  }

  it('should Test getAllUserData', () => {
    testMethodDataBackEnd(service.getAllUserData(), baseURL + 'users', getData, 'GET');
  });

  it('should get user data from Backend', () => {
    testMethodDataBackEnd(service.getUser(id), baseURL + 'users/' + id, getData, 'GET');
  });

  it('should update user data', () => {
    testMethodDataBackEnd(service.updateUser(updateUserData), baseURL + 'users/' + id, updateUserData, 'PUT');
  });

  it('should delete user data', () => {
    testMethodDataBackEnd(service.deleteUser(id), baseURL + 'users/' + id, deleteUserData, 'DELETE');
  });

  //function test errorHandlingForMethod general

  function errorHandlingForMethod(method: Observable<any>, url: string, errorResponses: { [key: string]: HttpErrorResponse }) {
    Object.keys(errorResponses).forEach(errorCode => {
      const errorResponse = errorResponses[errorCode];

      method.subscribe(
        data => fail('Expected an error, but received data'),
        error => {
          expect(error.status).toBe(errorResponse.status);
          expect(error.statusText).toBe(errorResponse.statusText);
        }
      );

      const req = httpMock.expectOne(url);
      req.flush(null, errorResponse);
    });

    httpMock.verify();
  }

  it('should handle errors for getAllUserData', () => {
    errorHandlingForMethod(service.getAllUserData(), baseURL + 'users', errorResponses);
  });

  it('should handle errors for getUser', () => {
    errorHandlingForMethod(service.getUser(id), baseURL + 'users/' + id, errorResponses);
  });

  it('should handle errors for updateUser', () => {
    errorHandlingForMethod(service.updateUser(updateUserData), baseURL + 'users/' + id, errorResponses);
  });

  it('should handle errors for deleteUser', () => {
    errorHandlingForMethod(service.deleteUser(id), baseURL + 'users/' + id, errorResponses);
  });
});
