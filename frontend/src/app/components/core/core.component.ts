import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-core',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent],
  templateUrl: './core.component.html',
  styleUrl: './core.component.css'
})
export class CoreComponent {

}
