import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, PasswordModule, DividerModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      password: '',
    })
  }

  submit(): void {
    console.log(this.form.getRawValue());
    this.http.post('http://localhost:8000/api/register', this.form.getRawValue()).subscribe((response) => {
      console.log(response);
      this.router.navigate(['login']);
    });
  }
}
