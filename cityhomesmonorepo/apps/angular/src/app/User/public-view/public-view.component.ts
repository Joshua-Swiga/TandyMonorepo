import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceForAPIService } from 'src/app/service-for-api.service';

@Component({
  selector: 'app-public-view',
  templateUrl: './public-view.component.html',
  styleUrls: ['./public-view.component.css']
})
export class PublicViewComponent {
  unitsData: any[] = [];
  userData: any = {};
  profilePicture: any;
  username!: number | string | any;
  loading: boolean = true;
  activeUser!: any;

  constructor(private router: Router, private http: ServiceForAPIService, private snapshot: ActivatedRoute) {}

  ngOnInit(): void {
    this.authenticate();
    this.publicView();
    this.getUsername();

  }
  
  getUsername(){
    this.username = this.snapshot.snapshot.paramMap.get('user-name');
    localStorage.setItem('publicViewName', this.username);
    this.getUserDataForProfile()

  }

  getUserDataForProfile(): void {
    this.loading = true;
    this.http.publicView().subscribe((res: any) => {
      console.log('Response from backend:', res);
      this.unitsData = res.units;
      this.userData = res.user;
      // this.profilePicture = 'storage/images/' + this.userData.profile_photo;
      // console.log(this.profilePicture);
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
  publicView(): void {
    
  }


}
