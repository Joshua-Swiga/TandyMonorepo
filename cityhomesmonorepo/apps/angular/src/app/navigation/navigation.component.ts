import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  showLogoutBtn: boolean = false;
  is_authenticated!: string | any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check credentials on component initialization
    this.authenticate();
    let credentials = localStorage.getItem('stat');
    this.showLogoutBtn = credentials === 'loggedCityHomes';

    // Subscribe to router events to close menu on navigation
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.closeMenu();
      }
    });
  }

  authenticate(){
    this.is_authenticated = localStorage.getItem('user-name');
  }

  logOut(event: any): void {
    if (event) {
      localStorage.clear();
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }
  }
  

  // Method to close the menu
  closeMenu(): void {
    const menuCheckbox = document.getElementById('active') as HTMLInputElement;
    if (menuCheckbox) {
      menuCheckbox.checked = false;
    }
  }
}
