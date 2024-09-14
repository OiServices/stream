import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  loading: boolean = true;
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  constructor() {
    // Simulate a loading delay
    setTimeout(() => {
      this.loading = false;
    }, 500); // Adjust the timeout duration (in ms) as per your preference
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }
}