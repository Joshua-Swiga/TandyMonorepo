import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceForAPIService } from 'src/app/service-for-api.service';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})
export class AddUnitComponent {
  unitValidaters: FormGroup;
  locationValidater: FormGroup;
  amenitiesValidatrt: FormGroup;
  imageValidater: FormGroup;
  currentStep: number = 1;
  loading: boolean = false;

  constructor(private http: ServiceForAPIService, private router: Router) {
    this.unitValidaters = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      subtitle: new FormControl('', [Validators.required, Validators.minLength(5)]),
      category: new FormControl('', [Validators.required]),
      accomodationInformation: new FormControl('', [Validators.required]),
      numberOfBedrooms: new FormControl('', [Validators.required]),
      numberOfBathrooms: new FormControl('', [Validators.required]),
      priceInformation: new FormControl('', [Validators.required])
    });

    this.locationValidater = new FormGroup({
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required])
    });

    this.amenitiesValidatrt = new FormGroup({
      amenities: new FormControl('', [Validators.required])
    });

    this.imageValidater = new FormGroup({
      image: new FormControl('', [Validators.required]),
    });
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.currentStep++;
      }, 1000); // Simulate a short delay for the spinner
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.currentStep--;
      }, 500); // Simulate a short delay for the spinner
    }
  }

  CreateUnit() {
    if (this.unitValidaters.valid && this.imageValidater.valid && this.locationValidater.valid && this.amenitiesValidatrt.valid) {
      this.loading = true;
      let collectedData = {
        'title': this.unitValidaters.get('title')?.value || '',
        'subtitle': this.unitValidaters.get('subtitle')?.value || '',
        'category': this.unitValidaters.get('category')?.value || '',
        'accomodation_information': this.unitValidaters.get('accomodationInformation')?.value || '',
        'number_of_bedrooms': this.unitValidaters.get('numberOfBedrooms')?.value || '',
        'number_of_bathrooms': this.unitValidaters.get('numberOfBathrooms')?.value || '',
        'price_information': this.unitValidaters.get('priceInformation')?.value || '',
        'image': this.imageValidater.get('image')?.value || '',
        'amenities': this.amenitiesValidatrt.get('amenities')?.value || '',
        'city': this.locationValidater.get('city')?.value || '',
        'state': this.locationValidater.get('state')?.value || '',
        'country': this.locationValidater.get('country')?.value || ''
      };

      this.http.createUnit(collectedData).subscribe({
        next: (res: any) => {
          this.loading = false;
          if (res.status === 200) {
            this.router.navigate(['/user-profile']);
            alert('Unit Created!');
          } else {
            alert('Failed to create the unit. Please try again.');
          }
        },
        error: () => {
          this.loading = false;
          alert('An error occurred. Please try again later.');
        }
      });
    }
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageValidater.patchValue({
          image: reader.result as string
        });
      };
    }
  }
}
