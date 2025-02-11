import { Component, OnInit } from '@angular/core';
import { ServiceForAPIService } from 'src/app/service-for-api.service';

@Component({
  selector: 'app-viewunit',
  templateUrl: './viewunit.component.html',
  styleUrls: ['./viewunit.component.css']
})
export class ViewunitComponent implements OnInit {
  searchCriteria!: string;
  screenLoader: boolean = true;
  data: any = {
    units: {
      units: [],
      location: [],
      amenities: [],
      images: []
    },
    userData: []
  };

  constructor(private http: ServiceForAPIService) { }

  ngOnInit() {
    this.getUnitData();
    this.onWaitForContentToLoad()
  }
  onWaitForContentToLoad(){
    setTimeout(() => {
      this.screenLoader = false; // Hide the loader after 10 seconds
    }, 3000); // 10000ms = 10 seconds
  }
  

  getUnitData() {
    this.http.getUnit().subscribe((res: any) => {
      this.data.units.units = res.units.units;
      this.data.units.location = res.units.location;
      this.data.units.amenities = res.units.amenities;
      this.data.units.images = res.units.images;
      this.data.userData = res.userData; // Corrected to use res.userData
      console.log(res)
    }, error => {
      console.error('Error fetching unit data:', error);
      
    });
  }
}
