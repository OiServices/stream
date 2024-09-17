import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Import Router
import { ProjectService } from '../../../services/project/project.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../footer/footer.component';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-single-project',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css']
})
export class SingleProjectComponent implements OnInit {
  project: any = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router  // Inject Router
  ) {}

  ngOnInit(): void {
    // Get project ID from the route
    const projectId = this.route.snapshot.paramMap.get('id');

    if (projectId) {
      // Fetch the project by ID
      this.projectService.getProjectById(projectId).subscribe({
        next: (data) => {
          this.project = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching project:', error);
          this.loading = false;
        }
      });
    }
  }

  // Add a method to handle navigation
  supportProject() {
    this.router.navigate(['/home/transact'], { queryParams: { projectId: this.project.id } });
  }
}