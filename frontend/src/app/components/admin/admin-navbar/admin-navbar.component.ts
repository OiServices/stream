import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  avatarUrl: string = 'assets/profile.jpg';
  userId: string = '';

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const token = this.authService.getToken();
    const decodedToken = this.authService.decodeToken(token || '');
    this.userId = decodedToken?.userId;

    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (user) => {
          this.avatarUrl = user.profile?.avatar || 'assets/profile.jpg';
        },
        (error) => {
          console.error('Failed to load user profile', error);
        }
      );
    }
  }
}