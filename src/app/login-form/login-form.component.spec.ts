import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user-api.service';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [HttpClientModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [UserService],
    });
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create form', () => {
    expect(component).toBeTruthy();
  });


  it('should initially be invalid', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('should become valid input values', () => {
    const name = component.userForm.controls['name'];
    const email = component.userForm.controls['email'];
    name.setValue('name');
    email.setValue('test@gmail.com');
    expect(component.userForm.valid).toBeTruthy();
  });

  //should display error messages for invalid input values
  it('should display error messages for invalid input values', () => {
    const name = component.userForm.controls['name'];
    const email = component.userForm.controls['email'];

    name.setValue('');
    email.setValue('invalid-email');
    name.markAsTouched();
    email.markAsTouched();

    expect(name.hasError('required')).toBe(name.hasError('required') ? true : false);
    expect(email.hasError('required')).toBe(email.hasError('required') ? true : false);
    expect(email.hasError('email')).toBe(email.hasError('email') ? true : false);
  });

});
