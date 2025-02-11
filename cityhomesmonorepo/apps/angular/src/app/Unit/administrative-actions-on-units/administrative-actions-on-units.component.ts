import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceForAPIService } from 'src/app/service-for-api.service';

@Component({
  selector: 'app-administrative-actions-on-units',
  templateUrl: './administrative-actions-on-units.component.html',
  styleUrls: ['./administrative-actions-on-units.component.css']
})
export class AdministrativeActionsOnUnitsComponent implements OnInit {

  unitId!: number | any;
  locationId!: number | any;
  amenityId!: number | any;
  unitValidationForm!: FormGroup;
  locationValidationForm!: FormGroup;
  amenityValidationForm!: FormGroup;
  activeUser: any;
  imageData: string | any;
  registeringData: string | any;
  unit: any;  // Property to hold the unit data including images

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: ServiceForAPIService
  ) { }

  ngOnInit(): void {
    this.authenticate();
    this.unitId = Number(this.route.snapshot.paramMap.get('id'));
    this.initializeForms();
    this.getUnitData(this.unitId);
  }

  initializeForms(): void {
    this.unitValidationForm = new FormGroup({
      title: new FormControl('', Validators.required),
      subtitle: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      price_information: new FormControl('', Validators.required),
      number_of_bathrooms: new FormControl('', Validators.required),
      number_of_bedrooms: new FormControl('', Validators.required),
      accomodation_information: new FormControl('', Validators.required),
      is_booked: new FormControl(false),
      image: new FormControl('', Validators.required), // Add this line
    });

    this.locationValidationForm = new FormGroup({
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });

    this.amenityValidationForm = new FormGroup({
      amenities: new FormControl('', Validators.required),
    });
  }

  getUnitData(unitId: number): void {
    this.http.getSingleUnit(unitId).subscribe((res: any) => {
      this.unitValidationForm.patchValue(res.unit);
      this.locationValidationForm.patchValue(res.location);
      this.locationId = res.location.id;
      this.amenityValidationForm.patchValue(res.amenity);
      this.amenityId = res.amenity.id;

      // Assign the unit data including images to a property
      this.unit = res.unit;
    });
  }

  authenticate(): void {
    this.activeUser = localStorage.getItem('user-name');
    if (!this.activeUser) {
      this.router.navigate(['/']);
    }
  } 

  editUnit(): void {
    this.registeringData = true;

     
    this.http.editUnit(this.unitValidationForm.value, this.unitId).subscribe((res: any)=>{
      console.log(res)
      if (res.status === 200){
        alert("Unit Edited!")
        this.router.navigate(['/user-profile'])
      }else{
        alert("There was an issue with the request!");
        this.router.navigate(['/user-profile'])
      }
      this.registeringData = false
    })
    
  }

  editLocationData(): void {
    this.registeringData = true;
    localStorage.setItem('unitId', this.unitId);

    if (this.locationValidationForm.valid) {
      this.http.editLocation(this.locationId, this.locationValidationForm.value).subscribe({
        next: (res: any) => {
          if (res.status === 200) {
            this.router.navigate(['/user-profile']);
            alert('Location Data Edited!');
          } else {
            alert('Process failed!');
          }
        },
        error: (err) => {
          console.error(err);
          alert('An error occurred while editing the location.');
        },
        complete: () => {
          this.registeringData = false;
        }
      });
    }
  }

  convertToBase64(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = () => {
        this.unitValidationForm.patchValue({
          image: reader.result as string 
        });
      };
    }
  }

  editAmenityFunction(): void {
    if (this.amenityValidationForm.valid) {
      this.registeringData = true;
      this.http.editAmenityService(this.amenityId, this.amenityValidationForm.value).subscribe({
        next: (res: any) => {
          if (res.status === 200) {
            this.router.navigate(['/user-profile']);
            alert('Amenity Edited!');
          } else {
            alert('Process failed!');
          }
        },
        error: (err: any) => {
          console.error(err);
          alert('An error occurred while editing the amenity.');
        },
        complete: () => {
          this.registeringData = false;
        }
      });
    }
  }

  uploadImage(): void {
    this.registeringData = true;
    const imageData = this.unitValidationForm.get('image')?.value;

    if (imageData) {
      const payload = {
        image: imageData,
        unitId: this.unitId,
      };

      this.http.addImage(payload).subscribe({
        next: (res: any) => {
          console.log('Image uploaded successfully:');
          alert('Image uploaded successfully!');
          this.router.navigate(['/user-profile']);
        },
        error: (err) => {
          console.error('Error uploading image:', err);
          alert('Failed to upload the image. Please try again.');
        },
        complete: () => {
          this.registeringData = false;
        }
      });
    } else {
      console.warn('No image data found to upload.');
      this.registeringData = false;
    }
  }

  deleteUnit(unitId: number): void {
    if (confirm('Are you sure you want to delete this unit? This action cannot be undone.')) {
      this.registeringData = true;
      this.http.deleteUnit(unitId).subscribe({
        next: (res: any) => {
          if (res.status === 200) {
            alert('Unit Removed!');
            this.router.navigate(['/user-profile']);
          } else {
            alert('Failed to remove unit! Please try again.');
          }
        },
        error: (err) => {
          console.error(err);
          alert('An error occurred while deleting the unit.');
        },
        complete: () => {
          this.registeringData = false;
        }
      });
    }
  }
}
