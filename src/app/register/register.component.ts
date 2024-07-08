import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  focus = false;
  email = '';
  name = '';
  password = '';

  setFocus(hasFocus: boolean) {
    this.focus = hasFocus;
  }

  onSubmit(): void {
    console.log('Form submitted');
  }

}
