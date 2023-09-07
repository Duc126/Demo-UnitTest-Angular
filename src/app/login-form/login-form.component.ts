import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersInterface } from '../interface/users.interface';
import { UserService } from '../services/user-api.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  userForm!: FormGroup;
  userData: UsersInterface[] = [];
  selectedUserId: number | null = null;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.userService.getAllUserData().subscribe((data) => {
      this.userData = data;
    });
  }
  onUserIdChange() {
    if (this.selectedUserId !== null) {
      const selectedUser = this.userData.find(user => user.id === this.selectedUserId);

      if (selectedUser) {
        this.userForm.patchValue({
          name: selectedUser.name,
          email: selectedUser.email
        });
      }
    } else {
      this.userForm.reset();
    }
  }
  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      const isUserValid = this.userData.some(user => user.name === formData.name && user.email === formData.email);

      if (isUserValid) {
        this.errorMessage = 'Valid Data';
      } else {
        this.errorMessage = 'Invalid Data';
      }
    }
  }

}
