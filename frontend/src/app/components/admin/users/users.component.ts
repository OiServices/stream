import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { RouterLink } from '@angular/router';
import { User } from '../../../interfaces/user';
import { NotificationComponent } from '../../../components/notification/notification.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink, NotificationComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  displayUserModal: boolean = false;

  // Notification properties
  notificationMessage: string = '';
  notificationType: 'success' | 'error' = 'success';
  showNotification: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        this.users = users.filter(user => !user.isDeleted);
      },
      (error) => {
        this.showError('Failed to load users');
      }
    );
  }

  viewUser(user: User): void {
    this.selectedUser = user;
    this.displayUserModal = true;
  }

  closeModal(): void {
    this.displayUserModal = false;
  }

  toggleUserStatus(user: User): void {
    const newStatus = !user.isActivated;
    this.userService.setAccountStatus(user.id, newStatus).subscribe(
      () => {
        user.isActivated = newStatus;
        this.showSuccess(`User ${newStatus ? 'activated' : 'deactivated'} successfully`);
      },
      (error) => {
        this.showError('Failed to update user status');
      }
    );
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.users = this.users.filter((user) => user.id !== userId);
        this.showSuccess('User deleted successfully');
      },
      (error) => {
        this.showError('Failed to delete user');
      }
    );
  }

  // Show success notification
  showSuccess(message: string): void {
    this.notificationMessage = message;
    this.notificationType = 'success';
    this.showNotification = true;
  }

  // Show error notification
  showError(message: string): void {
    this.notificationMessage = message;
    this.notificationType = 'error';
    this.showNotification = true;
  }

  // Close notification
  closeNotification(): void {
    this.showNotification = false;
  }
}

