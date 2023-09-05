import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FetchApiService } from './services/fetch-api.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  const fetchDataServiceSpy = jasmine.createSpyObj('FetchApiService', ['fetchData', 'getValue']);
  fetchDataServiceSpy.getValue.and.returnValue('real value');

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: FetchApiService, useValue: fetchDataServiceSpy }]
    });

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('Test create the app', () => {
    expect(app).toBeTruthy();
  });

  //test ngOnInit
  it('Test call ngOnInit', () => {
    spyOn(app, 'ngOnInit');
    app.ngOnInit();
    expect(app.ngOnInit).toHaveBeenCalled();
  });

  //test service
  it('Test service', () => {
    expect(fetchDataServiceSpy.getValue()).toBe('real value');
  });

  //class testing
  it('#clicked() test open off', () => {
    expect(app.isOn)
      .withContext('off at first')
      .toBe(false);
    app.onClick();
    expect(app.isOn)
      .withContext('on after click')
      .toBe(true);
    app.onClick();
    expect(app.isOn)
      .withContext('off after second click')
      .toBe(false);
  });

  it('#clicked() test open on', () => {
    expect(app.message)
      .withContext('off at first')
      .toMatch(/is off/i);
    app.onClick();
    expect(app.message)
      .withContext('on after clicked')
      .toMatch(/is on/i);
  });

  //dom testing
  it('Dom Testing', () => {
    expect(app).toBeDefined();
  });


});
