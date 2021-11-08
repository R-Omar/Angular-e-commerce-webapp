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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email = '';
  password = '';

  matcher = new MyErrorStateMatcher();
  isLoadingResults = false;
  errormessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
    //supprimer le localstorage
    localStorage.clear();
  }
  //recupération des données utilisateurs dans le localstorage
  onFormSubmit(form: NgForm) {
    //1ére étape réception du token
    this.authService.login(form).subscribe(
      (res) => {
        localStorage.setItem('token', res);
        //2éme extraction des données de user à partir du token envoyé
        this.authService.getProfile().subscribe((data) => {
          localStorage.setItem('email', data.email);
          localStorage.setItem('role', data.role);
          localStorage.setItem('name', data.name);
          localStorage.setItem('user', data._id);
          this.router.navigate(['/']);
        });
      },
      (err) => {}
    );
  }

  register() {
    this.router.navigate(['register']);
  }
}