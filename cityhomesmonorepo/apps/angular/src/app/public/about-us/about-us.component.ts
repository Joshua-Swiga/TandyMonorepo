import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  redirectToWhatsApp() {
    const phonenumber = '254757422260';
    const message = `Hi there! Im intrested in the jersies mentioned on your website. Can I get more information about them? Thank you!`;
    const url = `https://wa.me/${phonenumber}?text=${encodeURIComponent(message)}`;
    window.location.href = url;
}
}
