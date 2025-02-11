import { Component, OnInit } from '@angular/core';
import { ServiceForAPIService } from '../service-for-api.service';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.css']
})
export class GallaryComponent implements OnInit {
  imageData!: any[];

  constructor(private http: ServiceForAPIService) {}

  ngOnInit(): void {
    this.getImageData();
  }

  getImageData(): void {
    this.http.getImageData().subscribe((res: any) => {
      this.imageData = res;
      console.log(this.imageData);
    });
  }
}
