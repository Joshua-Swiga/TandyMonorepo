import { Component } from '@angular/core';
import { ServiceForAPIService } from '../service-for-api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConnectableObservable, window } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInFormvalidation: FormGroup;
  processingMessage!: boolean;
  submittedUsername!: string;
  constructor(private http: ServiceForAPIService, private router: Router){
    this.signInFormvalidation = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  validateUser(){
    this.processingMessage = true;
    
    if (this.signInFormvalidation.valid) {
      const userData = {
        username: this.signInFormvalidation.get('username')?.value,
        password: this.signInFormvalidation.get('password')?.value
      };
      this.submittedUsername = this.signInFormvalidation.get('username')?.value;
      localStorage.setItem('user-name', this.signInFormvalidation.get('username')?.value)
      localStorage.setItem('authenticationLevel', 'true');
      localStorage.setItem('457fiyulwbf43cq','3h4-ptch3hophhnpqht43t');
      localStorage.setItem('kjbjbekvbeq-fqn;', '809410447979721-583123');
      this.http.signIn(userData).subscribe((res: any) => {
        this.processingMessage = false;
        if (res.status === 200) {
          
          this.router.navigate(['/user-profile']).then(() => {

          });
          
          alert('Welcome!');
          
        } else {
          this.processingMessage = false;
          alert('Invalid credentials');
        }
      });
    }
  }
}
