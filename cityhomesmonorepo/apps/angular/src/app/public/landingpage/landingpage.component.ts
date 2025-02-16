import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceForAPIService } from 'src/app/service-for-api.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingPageComponent {
  name: string = '';
  email: string = '';
  phone_number: string = '';
  message: string = '';
  processingMessage: boolean = false;
  screenLoader: boolean = true;

  constructor(private http: ServiceForAPIService, private router: Router) {}

  ngOnInit(){
    this.onWaitForContentToLoad();
  }

  onLocationClick(location: string){
    let picked_location =localStorage.setItem('premLoc', location);
    this.router.navigate(['/good-option']);
    console.log(picked_location)
  }

  onWaitForContentToLoad(){
    setTimeout(() => {
      this.screenLoader = false; // Hide the loader after 10 seconds
    }, 1000); // 10000ms = 10 seconds
  }
  
  onSubmit() {
    const dataToSubmit = {
      name: this.name,
      email: this.email,
      phone_number: this.phone_number,
      message: this.message
    };

    // Show the spinner
    this.processingMessage = true;

    this.http.sendContactInformation(dataToSubmit).subscribe(
      (res: any) => {
        console.log(res)
        if (res.status === 201) {
          alert('Message Sent! You will be contacted');
          this.router.navigate(['/view-unit']);
        } else {
          alert("There was an issue with the request!");
        }
        // Hide the spinner
        this.processingMessage = false;
      },
      (err: any) => {
        console.error('Error sending message:', err);
        alert('An error occurred. Please try again later.');
        // Hide the spinner
        this.processingMessage = false;
      }
    );
  }
}
