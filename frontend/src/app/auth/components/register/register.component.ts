import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  name = '';
  email = '';
  password = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  sexs: string[] = ['Male', 'Female'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      password: [null, Validators.required],
    });
  }

  onFormSubmit(form: NgForm) {
    this.authService.register(form).subscribe(
      (res) => {
        this.router.navigate(['login']);
      },
      (err) => {
        alert(err.error);
      }
    );
  }
}
