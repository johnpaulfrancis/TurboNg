import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms'; //For verifying the user input
import { CommonModule } from '@angular/common'; //For *ngIf
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {

  //registrationForm :property of a class with FormGroup type
  //FormGroup is a type from Angular's Reactive Forms module. It is used to represent a collection of FormControl instances, which in turn represent individual form fields.
  //In this case, registrationForm will hold the form group that contains several form controls (like name, email, and password)
  registrationForm: FormGroup;

  //constructor is a special method that runs when the component is instantiated. In Angular, the constructor is typically used for dependency injection and initialization tasks
  constructor(private userService: UserServiceService) {

    //inject(FormBuilder) is used to inject the FormBuilder service into the constructor.
    //FormBuilder is an Angular service that helps to create FormGroup and FormControl instances more easily and concisely
    //The inject() function is part of Angular's standalone component system
    const fb = inject(FormBuilder);

    //The group() method from FormBuilder is used to create a FormGroup.
    //Inside the group(), you define the form controls (like name, email, and password), and their initial values and validation rules
    this.registrationForm = fb.group({

      //The initial value (in this case, an empty string '' for each control).
      //The validators that are applied to the control (e.g., Validators.required, Validators.minLength, etc.)
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      conPassword: ['',[Validators.required]]
    },
    {
      validators: this.passwordMatchValidator //custom validator to check whether the pw and confirm pw fields are same
    }
  );
  }

  passwordMatchValidator(group: FormGroup) {
    const pw = group.get('password')?.value;
    const conPw = group.get('conPassword')?.value;
    if (conPw != '') {
      return pw === conPw ? null : { 'pwMismatch': true };
    }
    else {
      return null;
    }
  }
  

  registerClick() {
    if (this.registrationForm.valid) {
      const userForm = this.registrationForm.value;
      this.userService.createUser(userForm).subscribe({
        next: (response) => {
          //DisplayToastMsg function wrote in index.html. window is used to making this function publically available
          (window as any).DisplayToastMsg('Account has been successfully created.', 'success', 'Created');
          this.registrationForm.reset();
        },
        error: (error) => {
          (window as any).DisplayToastMsg('Please try again.', 'danger', 'Something went wrong');
        },
      });
    }
    else {
      (window as any).DisplayToastMsg('Invalid form. Please make sure all fields are filled.', 'danger', 'Something went wrong');
    }
  }

}

