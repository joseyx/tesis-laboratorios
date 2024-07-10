import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  focus = false;
  email = '';
  password = '';

  setFocus(hasFocus: boolean) {
    this.focus = hasFocus;
  }

  onSubmit(): void {
    console.log('Form submitted');
  }
}
