import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;
  isAuthenticated: boolean = false;
  userRole: string | null = null;
  profileImageUrl: string = 'assets/profile.jpg';

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userRole = this.authService.getUserRole();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  // Method to check if the user is an organization or startup
  isOrganizationOrStartup(): boolean {
    return this.userRole === 'ORGANIZATION' || this.userRole === 'STARTUP';
  }

  // Method to check if the user is an investor
  isInvestor(): boolean {
    return this.userRole === 'INVESTOR';
  }
}
