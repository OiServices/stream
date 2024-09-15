import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestorService } from '../../../services/investor/investor.service';
import { InvestorProfile } from '../../../interfaces/investor-profile';
import { User } from '../../../interfaces/user';
import { NotificationComponent } from '../../../components/notification/notification.component';

@Component({
  selector: 'app-investors',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './investors.component.html',
  styleUrls: ['./investors.component.css'],
})
export class InvestorsComponent implements OnInit {
  investors: User[] = [];
  selectedInvestor: User | null = null;
  displayInvestorModal: boolean = false;

  // Notification properties
  notificationMessage: string = '';
  notificationType: 'success' | 'error' = 'success';
  showNotification: boolean = false;

  constructor(private investorService: InvestorService) {}

  ngOnInit(): void {
    this.loadInvestors();
  }

  loadInvestors(): void {
    this.investorService.getAllInvestors().subscribe(
      (investors: User[]) => {
        // Filter out deleted investors
        this.investors = investors.filter((investor) => !investor.isDeleted);
      },
      (error) => {
        this.showError('Failed to load investors');
      }
    );
  }

  viewInvestor(investor: User): void {
    this.selectedInvestor = investor;
    this.displayInvestorModal = true;
  }

  closeModal(): void {
    this.displayInvestorModal = false;
  }

  showSuccess(message: string): void {
    this.notificationMessage = message;
    this.notificationType = 'success';
    this.showNotification = true;
  }

  showError(message: string): void {
    this.notificationMessage = message;
    this.notificationType = 'error';
    this.showNotification = true;
  }

  closeNotification(): void {
    this.showNotification = false;
  }
}