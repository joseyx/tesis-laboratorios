import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  userLogIn: boolean = false;
  message = '';

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
      (response: any) => {
        console.log(response);
        this.userLogIn = true;
        this.message = 'Bienvenido ' + response['name'] + '!';
      },
      error => {
        console.log(error);
        this.userLogIn = false;
        this.message = 'Aun no ha iniciado sesión!';
      }
    );
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.http.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
    .subscribe(() => this.userLogIn = false);
    this.router.navigate(['login']);
  }
}
