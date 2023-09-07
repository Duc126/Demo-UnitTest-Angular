import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user-api.service';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let name: AbstractControl;
  let email: AbstractControl;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
      imports: [HttpClientModule, HttpClientTestingModule, ReactiveFormsModule],
      providers: [UserService],
    });
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    name = component.userForm.controls['name'];
    email = component.userForm.controls['email'];
  });

  it('should create form', () => {
    expect(component).toBeTruthy();
  });


  it('should initially be invalid', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('should become valid input values', () => {
    name.setValue('name');
    email.setValue('test@gmail.com');
    expect(component.userForm.valid).toBeTruthy();
  });

  //function test error email general
  function testEmailErrors(emailValue: string, expectedRequired: boolean, expectedEmail: boolean) {
    email.setValue(emailValue);
    email.markAsTouched();
    name.setValue('');
    name.markAsTouched();

    expect(name.hasError('required')).toBe(true);
    expect(email.hasError('required')).toBe(expectedRequired);
    expect(email.hasError('email')).toBe(expectedEmail);
  }

  //should Check if the email is formatted correctly
  it('should display error messages for invalid input values', () => {
    testEmailErrors('invalid-email', false, true);
  });

  //should check if email is required
  it('should check if email is required', () => {
    testEmailErrors('', true, false);
  });

});
