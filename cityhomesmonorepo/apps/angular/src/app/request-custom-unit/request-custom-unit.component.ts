import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceForAPIService } from '../service-for-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-custom-unit',
  templateUrl: './request-custom-unit.component.html',
  styleUrls: ['./request-custom-unit.component.css']
})
export class RequestCustomUnitComponent {

  queryForm: FormGroup;
  processingRequest: boolean = false;

  constructor(private http: ServiceForAPIService, private router: Router) {
    this.queryForm = new FormGroup({
      curentUserName: new FormControl('', [Validators.required]),
      userPhoneNumber: new FormControl('', [Validators.required]),
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      categoryPreference: new FormControl('', [Validators.required]),
      unitPricing: new FormControl('', [Validators.required]),
      userEventType: new FormControl('', [Validators.required]),
      additionalRequirement: new FormControl('')
    });
  }

  onSubmitUserRequest() {
    if (this.queryForm.valid) {
      this.processingRequest = true;
      const dataSubmittedByUser = {
        name: this.queryForm.get('curentUserName')?.value || '',
        phone_number: this.queryForm.get('userPhoneNumber')?.value || '',
        email: this.queryForm.get('userEmail')?.value || '',
        category: this.queryForm.get('categoryPreference')?.value || '',
        priceRange: this.queryForm.get('unitPricing')?.value || '',
        evntType: this.queryForm.get('userEventType')?.value || '',
        additionalServiceRequirenent: this.queryForm.get('additionalRequirement')?.value || 'none',
      };

      this.http.customUnitQuery(dataSubmittedByUser).subscribe({
        next: (res: any) => {
          if (res.status === 200) {
            alert("Request failed. Please try again.");
          } else {
            alert("Request Submitted. You will be contacted soon!");
            this.router.navigate(['/view-unit']);
            
          }
          this.processingRequest = false;
        },
        error: () => {
          alert("An error occurred. Please try again later.");
          this.processingRequest = false;
        }
      });
    }
  }
}
