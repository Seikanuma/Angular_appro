import { Component } from '@angular/core';
import { AbstractFormComponent } from '../../tools/abstract-form';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent extends AbstractFormComponent {

  passwordControl: FormControl = new FormControl("", { validators: [Validators.required, Validators.minLength(6)] })

  confirmPasswordControl: FormControl = new FormControl<any>("", { validators: [Validators.required, this.mustMatch(this.passwordControl)] });

  form: FormGroup = new FormGroup<any>({
    id: new FormControl(0),
    email: new FormControl("", { validators: [Validators.required, Validators.email] }),
    password: this.passwordControl,
    firstName: new FormControl("", { validators: [Validators.required] }),
    lastName: new FormControl("", { validators: [Validators.required] }),
    phoneNumber: new FormControl("", { validators: [Validators.required] }),
    entreprise: new FormControl("", { validators: [Validators.required] }),
  });

  constructor(private http: HttpClient) {
    super();
  }

  onSubmit$(): void {
    this.http.post("http://localhost:3000/register", this.form.value).subscribe();
  }

}
export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  entreprise: string;
}