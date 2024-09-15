import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userName: string = 'John Doe';
  avatarUrl: string = 'assets/profile.jpg';

  constructor(
    private authService: AuthService, 
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const token = this.authService.getToken();
    const decodedToken = this.authService.decodeToken(token || '');
    const userId = decodedToken?.userId;

    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (user) => {
          this.userName = `${user.profile?.firstName || 'John'} ${user.profile?.lastName || 'Doe'}`;
          this.avatarUrl = user.profile?.avatar || 'assets/profile.jpg';
        },
        (error) => {
          console.error('Failed to load user profile', error);
        }
      );
    }
  }

  onLogout(): void {
    this.authService.logout();
  }
}