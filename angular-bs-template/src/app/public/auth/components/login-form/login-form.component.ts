import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestStatus } from 'src/app/models/request-status.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });

  status: RequestStatus = 'init';

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router){

  }

  doLogin() {
    console.log("Ingresando", this.form)
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      this.authService.login(email, password)
      .subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/secured/']);
        },
        error: () => {
          this.status = 'failed';
          console.log("Error")
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

}
