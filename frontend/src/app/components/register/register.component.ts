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
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loading: boolean = true;
  passwordMismatch: boolean = false;
  selectedRole: string = '';
  roles: string[] = ['Investor', 'Startup', 'Organization'];
  passwordStrength: string = '';
  passwordCriteria: { [key: string]: boolean } = {
    length: false,
    lowercase: false,
    uppercase: false,
    numeric: false
  };

  constructor() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  onRegister(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      this.passwordMismatch = true;
    } else if (this.passwordStrength === 'weak') {
      this.showNotification("Password too weak!");
    } else {
      this.passwordMismatch = false;
    }
  }

  selectRole(role: string) {
    this.selectedRole = role;
  }

  evaluatePasswordStrength(password: string) {
    this.passwordCriteria['length'] = password.length >= 8;
    this.passwordCriteria['lowercase'] = /[a-z]/.test(password);
    this.passwordCriteria['uppercase'] = /[A-Z]/.test(password);
    this.passwordCriteria['numeric'] = /[0-9]/.test(password);

    const strength = Object.values(this.passwordCriteria).filter(v => v).length;

    if (password.length === 0) {
      this.passwordStrength = '';
    } else if (strength <= 2) {
      this.passwordStrength = 'weak';
    } else if (strength === 3) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'strong';
    }
  }

  showNotification(message: string) {
    alert(message);
  }
}