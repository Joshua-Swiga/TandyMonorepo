import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceForAPIService } from 'src/app/service-for-api.service';

@Component({
  selector: 'app-custom-request',
  templateUrl: './custom-request.component.html',
  styleUrls: ['./custom-request.component.css']
})
export class CustomRequestComponent implements OnInit {
  queryData: any[] = [];
  processingRequest: boolean = false;
  screenLoader: boolean = true;

  constructor(private router: Router, private http: ServiceForAPIService) {}

  ngOnInit() {
    this.authenticateActiveUser();
    this.getUserQueries();
    this.onWaitForContentToLoad()
  }

  onWaitForContentToLoad(){
    setTimeout(() => {
      this.screenLoader = false; // Hide the loader after 10 seconds
    }, 10000); // 10000ms = 10 seconds
  }
  
  authenticateActiveUser(): void {
    const user = localStorage.getItem('user-name');
    if (!user) {
      this.router.navigate(['']);
    }
  }

  getUserQueries(): void {
    this.processingRequest = true;
    this.http.getQueryData().subscribe({
      next: (res: any) => {
        this.queryData = res.message;
        this.processingRequest = false;
      },
      error: () => {
        alert('Failed to load queries. Please try again later.');
        this.processingRequest = false;
      }
    });
  }

  deleteUserQueryById(queryId: number): void {
    if (confirm('Are you sure you want to delete this query?')) {
      this.processingRequest = true;
      this.http.deleteUserQuery(queryId).subscribe({
        next: () => {
          this.queryData = this.queryData.filter(query => query.id !== queryId);
          this.processingRequest = false;
        },
        error: () => {
          alert('Failed to delete the query. Please try again later.');
          this.processingRequest = false;
        }
      });
    }
  }
}
