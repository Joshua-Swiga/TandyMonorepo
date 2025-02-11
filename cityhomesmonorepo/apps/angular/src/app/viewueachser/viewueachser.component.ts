import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceForAPIService } from '../service-for-api.service';

@Component({
  selector: 'app-viewueachser',
  templateUrl: './viewueachser.component.html',
  styleUrls: ['./viewueachser.component.css']
})
export class ViewueachserComponent implements OnInit {
  userId!: string | null;
  userData: any = {};
  activeUser!: string | null;
  processingRequest: boolean = false;

  constructor(private route: ActivatedRoute, private http: ServiceForAPIService, private router: Router) {}

  ngOnInit() {
    this.authenticate();
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.getData(this.userId);
    }
  }

  getData(id: any) {
    this.processingRequest = true;
    this.http.viewUser(id).subscribe({
      next: (res: any) => {
        console.log(res)
        this.userData = res.user;
        this.processingRequest = false;
      },
      error: () => {
        alert("Failed to load user data. Please try again later.");
        this.processingRequest = false;
      }
    });
  }

  authenticate() {
    this.activeUser = localStorage.getItem('user-name');
    if (!this.activeUser) {
      this.router.navigate(['/']);
    }
  }

  edituser(userId: any) {
    if (!this.userData) return;

    this.processingRequest = true;
    const editedData = {
      name: this.userData.name,
      email: this.userData.email,
      phone_number: this.userData.phone_number,
      password: this.userData.password,
      is_admin: this.userData.is_admin,
      profile_photo: this.userData.profile_photo,
      description: this.userData.description,
      general_property_overview: this.userData.general_property_overview,
      admin: localStorage.getItem('authentication-token') || ''
    };

    this.http.editUser(userId, editedData).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.status === 200) {
          alert('User Edited Successfully!');
          this.router.navigate(['/user-profile']);
        } else {
          alert('There was an issue with the request!');
        }
        this.processingRequest = false;
      },
      error: () => {
        alert("Failed to edit user. Please try again later.");
        this.processingRequest = false;
      }
    });
  }
}
