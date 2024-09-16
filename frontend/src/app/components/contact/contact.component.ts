// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ContactService } from '../../services/contact/contact.service';
// import { NotificationComponent } from '../notification/notification.component';
// import { CommonModule } from '@angular/common';
// import { NavbarComponent } from '../navbar/navbar.component';

// @Component({
//   selector: 'app-contact',
//   standalone: true,
//   imports: [CommonModule, NotificationComponent, ReactiveFormsModule, NavbarComponent],
//   templateUrl: './contact.component.html',
//   styleUrls: ['./contact.component.css'],
// })
// export class ContactComponent {
//   contactForm: FormGroup;
//   showNotification: boolean = false;
//   notificationMessage: string = '';
//   notificationType: 'success' | 'error' = 'success';

//   constructor(private formBuilder: FormBuilder, private contactService: ContactService) {
//     this.contactForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       subject: ['', Validators.required],
//       message: ['', Validators.required]
//     });
//   }

//   onSubmit(): void {
//     if (this.contactForm.valid) {
//       const { name, email, subject, message } = this.contactForm.value;

//       this.contactService.submitContactForm(name, email, subject, message).subscribe(
//         () => {
//           this.showNotificationMessage('Thank you for reaching out, We will get back to you shortly', 'success');
//           this.contactForm.reset();
//         },
//         (error) => {
//           this.showNotificationMessage('Failed to submit the contact form. Please try again.', 'error');
//         }
//       );
//     }
//   }

//   showNotificationMessage(message: string, type: 'success' | 'error'): void {
//     this.notificationMessage = message;
//     this.notificationType = type;
//     this.showNotification = true;
//     setTimeout(() => this.showNotification = false, 3000);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact/contact.service';
import { NotificationComponent } from '../notification/notification.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, NotificationComponent, ReactiveFormsModule, NavbarComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  showNotification: boolean = false;
  notificationMessage: string = '';
  notificationType: 'success' | 'error' = 'success';
  isLoading: boolean = true; // Loading spinner on page load
  isSubmitting: boolean = false; // Loading spinner on submit

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false; // Stop loading after a delay
    }, 1000); // Simulate a loading effect of 1 second
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true; // Start button loading spinner
      const { name, email, subject, message } = this.contactForm.value;

      this.contactService.submitContactForm(name, email, subject, message).subscribe(
        () => {
          this.showNotificationMessage('Thank you for reaching out, We will get back to you shortly', 'success');
          this.contactForm.reset();
          this.isSubmitting = false; // Stop button loading spinner
        },
        (error) => {
          this.showNotificationMessage('Failed to submit the contact form. Please try again.', 'error');
          this.isSubmitting = false; // Stop button loading spinner
        }
      );
    }
  }

  showNotificationMessage(message: string, type: 'success' | 'error'): void {
    this.notificationMessage = message;
    this.notificationType = type;
    this.showNotification = true;
    setTimeout(() => this.showNotification = false, 3000);
  }
}
