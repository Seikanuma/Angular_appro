import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-control',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './form-control.component.html',
  styleUrl: './form-control.component.css'
})
export class FormControlComponent {

  control: FormControl = new FormControl<any>("", {
    validators: [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
    ],
    nonNullable: true
  });

  get invalid() {
    return (this.control.touched || this.control.dirty) && this.control.invalid
  }
}
