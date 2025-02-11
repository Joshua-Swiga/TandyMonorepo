import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceForAPIService } from 'src/app/service-for-api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-each-unit',
  templateUrl: './view-each-unit.component.html',
  styleUrls: ['./view-each-unit.component.css'],
  providers: [DatePipe]
})
export class ViewEachUnitComponent implements OnInit {
  unitID: any;
  unitData: any = {};
  locationData: any = null;
  userData: any = {};
  imageData: any[] = [];
  amenityData: any = null;
  loading: boolean = true;
  similarUnits: any[] = [];

  constructor(
    private snapshot: ActivatedRoute,
    private http: ServiceForAPIService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit() {
    this.unitID = this.snapshot.snapshot.paramMap.get('id');
    this.getUnitData();
    this.getSimilarUnits();
  }

  getUnitData() {
    this.http.getSingleUnit(this.unitID).subscribe(
      (res: any) => {
        this.unitData = res.unit;
        this.locationData = res.location; // Assign location data if available
        this.userData = res.user; // Assign user data
        this.imageData = res.images || []; // Assign image data if available
        this.amenityData = res.amenity; // Assign amenity data if available
        this.loading = false;
        console.log(res)
        this.checkBoxes(); // Check again after data is loaded
      },
      (error: any) => {
        console.error('Error fetching unit data', error);
        this.loading = false;
      }
    );
  }

  getSimilarUnits() {
    this.http.getUnit().subscribe(
      (res: any) => {
        const allUnits = res.units;
        // Select the last 5 units from the response
        if (allUnits.length > 1){
          this.similarUnits = allUnits.units.slice(-5).reverse();
        }else{
          this.similarUnits = allUnits.units
        }
        console.log('Similar Units:', this.similarUnits);
      },
      (error: any) => {
        console.error('Error fetching similar units', error);
      }
    );
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkBoxes();
  }

  checkBoxes() {
    const boxes = document.querySelectorAll('.box');
    const triggerBottom = window.innerHeight / 5 * 4;

    boxes.forEach((box: Element) => {
      const boxTop = box.getBoundingClientRect().top;

      if (boxTop < triggerBottom) {
        box.classList.add('show');
      } else {
        box.classList.remove('show');
      }
    });
  }

  navigateToUnit(unitId: number | string) {
    this.router.navigate([`/book-unit/${unitId}`]);
  }

  redirectToWhatsApp(unitId: number | string) {
    const phonenumber = '254757422260';
    const message = `https://cityhomeskenya.co.ke/book-unit/${unitId} \n\n\nHi there! Could you please provide more details about the unit mentioned above? Thank you!`;
    const url = `https://wa.me/${phonenumber}?text=${encodeURIComponent(message)}`;
    window.location.href = url;
  }
}
