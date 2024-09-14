import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterLink, NotificationComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loading: boolean = true;
  passwordMismatch: boolean = false;
  selectedRole: string = '';
  notificationMessage: string = '';
  notificationType: 'success' | 'error' | 'warning' = 'success';
  showNotification: boolean = false;

  roles = [
    { displayName: 'Investor', value: 'INVESTOR' },
    { displayName: 'Startup', value: 'STARTUP' },
    { displayName: 'Organization', value: 'ORGANIZATION' }
  ];

  passwordStrength: string = '';
  passwordCriteria: { [key: string]: boolean } = {
    length: false,
    lowercase: false,
    uppercase: false,
    numeric: false
  };

  constructor(private authService: AuthService, private router: Router) {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  /**
   * Handles registration
   */
  onRegister(event: Event, password: string, confirmPassword: string) {
    event.preventDefault();

    const emailInput = (document.querySelector('input[name="email"]') as HTMLInputElement).value;

    
    if (!this.selectedRole || !emailInput || !password || !confirmPassword) {
      this.showNotificationMessage('All fields are required.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      this.showNotificationMessage('Passwords do not match.', 'error');
      this.passwordMismatch = true;
      return;
    }

    if (this.passwordStrength === 'weak') {
      this.showNotificationMessage('Password too weak!', 'error');
      return;
    }

    this.authService.register(emailInput, password, this.selectedRole).subscribe({
      next: (response) => {
        this.showNotificationMessage('Registration successful! Redirecting to login...', 'success');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error during registration', err);
        if (err.error?.message.includes('already registered')) {
          this.showNotificationMessage('User already registered. Please log in.', 'error');
        } else {
          this.showNotificationMessage('User already registered. Please log in.', 'error');
        }
      }
    });
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

  showNotificationMessage(message: string, type: 'success' | 'error' | 'warning') {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;

    setTimeout(() => {
      this.showNotification = false;
    }, 3000);
  }
}
