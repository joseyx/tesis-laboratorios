import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  public users: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  public fetchUsers() {
    this.http.get('http://127.0.0.1:8000/api/users').subscribe((res:any) => {
      console.log(res);
      this.users = res;
    });
  }
}
