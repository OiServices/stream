import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  faqs = [
    {
      question: 'How do I invest in a project?',
      answer: `You can browse through available projects, and once you find one that interests you, click the 'Fund Now' button to proceed with your donation or investment.`,
      isExpanded: false
    },
    {
      question: 'Are there any fees for using the platform?',
      answer: `Our platform charges a small transaction fee on successful funding. However, browsing and displaying projects are completely free.`,
      isExpanded: false
    },
    {
      question: 'What type of projects can I find on this platform?',
      answer: `You will find a variety of startups and organizations across different industries such as tech, health, education, and more, all seeking funding to achieve their goals.`,
      isExpanded: false
    },
    {
      question: 'Can I track the progress of the projects I have funded?',
      answer: `Yes! We provide regular updates from project owners on their progress and milestones so you can see how your contributions are being utilized.`,
      isExpanded: false
    },
    {
      question: 'What is the minimum amount I can invest?',
      answer: `The minimum investment varies by project, but most projects allow contributions starting from as low as $10.`,
      isExpanded: false
    },
    {
      question: 'How can I contact the project owners directly?',
      answer: `You can use the built-in messaging feature to communicate with project owners and ask any questions before or after your investment.`,
      isExpanded: false
    }
  ];
  toggleFAQ(faq: any) {
    faq.isExpanded = !faq.isExpanded;
  }
}
