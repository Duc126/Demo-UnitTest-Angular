import { inject, TestBed } from '@angular/core/testing';
import { UserService } from './user-api.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
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

  //Test getAllUserData method data from the backend
  it('should Test getAllUserData', inject([UserService], (service: UserService) => {
    const getAllUserData = [{ id: 1, name: 'name', description: 'description' }];
    const baseURL = 'http://localhost:3000/';

    service.getAllUserData().subscribe((data) => {
      expect(data).toEqual(getAllUserData);
    });
    const req = httpMock.expectOne(baseURL + 'users');
    expect(req.request.method).toBe('GET');
    req.flush(getAllUserData);
  }));

  //Test a method that retrieves user data from the backend. You can use Angular's HttpClientTestingModule to mock the HTTP requests.
  it('should get user data from Backend', inject(
    [UserService],
    (userService: UserService) => {
      const id = 1;
      const baseURL = 'http://localhost:3000/';
      const getUserData = { id: id, name: 'name', description: 'description' };

      userService.getUser(id).subscribe((getData) => {
        expect(getData).toEqual(getUserData);
      });

      const req = httpMock.expectOne(baseURL + 'users/' + id);
      expect(req.request.method).toBe('GET');

      req.flush(getUserData);
    }
  ));

  //Test a method that updates user data. Verify that the correct data is sent to the backend.

  it('should update user data', inject([UserService], (userService: UserService) => {
    const id = 1;
    const baseURL = 'http://localhost:3000/';
    const updateUserData = { id: id, name: 'Update name', description: 'Update description' };

    userService.updateUser(updateUserData).subscribe((updateData) => {
      expect(updateData).toEqual(updateUserData);
    });
    const req = httpMock.expectOne(baseURL + 'users/' + id);
    expect(req.request.method).toBe('PUT');
    req.flush(updateUserData);

  }));

  //Test a method that deletes user data. Verify that the correct data is sent to the backend.\
  it('should delete user data', inject([UserService], (userService: UserService) => {
    const id = 1;
    const baseURL = 'http://localhost:3000/';
    const deleteUserData = { id: id, name: 'Delete name', description: 'Delete description' };

    userService.deleteUser(id).subscribe((deleteData) => {
      expect(deleteData).toEqual(deleteUserData);
    });
    const req = httpMock.expectOne(baseURL + 'users/' + id);
    expect(req.request.method).toBe('DELETE');
    req.flush(deleteUserData);

  }));
});
