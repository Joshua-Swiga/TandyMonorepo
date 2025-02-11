import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceForAPIService } from 'src/app/service-for-api.service';

@Component({
  selector: 'app-user-query-information',
  templateUrl: './user-query-information.component.html',
  styleUrls: ['./user-query-information.component.css']
})
export class UserQueryInformationComponent implements OnInit {
  data: any|any[] = [];  // Typing as an array of any to store the `data` array from the response.
  activeUser!: any;
  constructor(private http: ServiceForAPIService, private router: Router) {}

  ngOnInit() {
    this.authenticate();
    this.getQueryInformation();
  }

  getQueryInformation() {
    this.http.getContactInformation().subscribe((res: any) => {
      this.data = res.data;  // Assigning the data array from the response to the data property.
    });
  }
  authenticate(){
    this.activeUser = localStorage.getItem('user-name');
    if (!this.activeUser){
      this.router.navigate(['/'])
    }
  }
  deleteQuery(id: number | any){
    this.http.deleteContactInformation(id).subscribe((res: any)=>{
      if (res.status === 200){
        alert('Query Removed');
        this.getQueryInformation()
      }
    })
  }
}
