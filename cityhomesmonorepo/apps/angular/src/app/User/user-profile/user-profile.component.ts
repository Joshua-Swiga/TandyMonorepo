import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceForAPIService } from 'src/app/service-for-api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [DatePipe]
})
export class UserProfileComponent implements OnInit {
  unitsData: any[] = [];
  userData: any = {};
  profilePicture: any;
  loading: boolean = true;
  administrativename= 'superusermanu';
  activeUser: any;

  constructor(private router: Router, private http: ServiceForAPIService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.authenticate();
    this.getUserDataForProfile();
  }

  getUserDataForProfile(): void {
    this.loading = true;
    this.http.profileData().subscribe((res: any) => {
      this.unitsData = res.units;
      this.userData = res.user;
      this.profilePicture = this.userData.avatars.length > 0
        ? this.userData.avatars[0].original_url
        : '/assets/images/default-avatar.png';
      this.loading = false;
    }, error => {
      console.error('Error fetching profile data', error);
      this.loading = false;
    });
  }
  authenticate(){
    this.activeUser = localStorage.getItem('user-name');
    if (!this.activeUser){
      this.router.navigate(['/'])
    }
  }
  formatDate(date: string): string | null {
    return this.datePipe.transform(date, 'MMMM d, y, h:mm a');
  }
}
