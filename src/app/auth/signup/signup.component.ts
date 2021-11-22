import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading = false;
  error: string = "";

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  onSignUp(signupForm: NgForm) {
    if (!signupForm.valid) {
      return;
    }
    this.isLoading = true;
    this.authService.signUp(signupForm.value.email, signupForm.value.password).subscribe(
      () => {
        this.error = "";
        this.authService.loggedInChanged.next();
        this.router.navigateByUrl("/admin");
        this.isLoading = false;
      }, (error) => {
      this.error = error;
      this.isLoading = false;
      }
    );
    signupForm.reset();
  }

  onClose() {
    this.error = "";
  }
}
