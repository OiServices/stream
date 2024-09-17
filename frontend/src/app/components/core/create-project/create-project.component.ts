import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project/project.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  createProjectForm: FormGroup;
  uploadedImages: File[] = [];
  uploadedImageUrls: string[] = [];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.createProjectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      targetAmount: [0, [Validators.required, Validators.min(1)]],
      type: ['', Validators.required],
      category: ['', Validators.required],
      githubLink: [''],
      landingPageLink: [''],
      images: [null]
    });
  }

  onFileChange(event: any) {
    if (event.target.files) {
      this.uploadedImages = Array.from(event.target.files);
    }
  }

  uploadImageToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 't2gtalks');
    formData.append('cloud_name', 'dtn9kzx2v');

    return fetch('https://api.cloudinary.com/v1_1/dtn9kzx2v/image/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => data.secure_url)
    .catch(() => {
      throw new Error('Failed to upload image');
    });
  }

  async onSubmit() {
    if (this.createProjectForm.invalid) {
      return;
    }

    this.isLoading = true;

    // Upload all selected images to Cloudinary and get the secure URLs
    try {
      const imageUploadPromises = this.uploadedImages.map(file => this.uploadImageToCloudinary(file));
      this.uploadedImageUrls = await Promise.all(imageUploadPromises);
    } catch (error) {
      console.error('Error uploading images to Cloudinary:', error);
      this.isLoading = false;
      return;
    }

    // After image upload, submit the project form with image URLs
    const projectData = {
      ...this.createProjectForm.value,
      images: this.uploadedImageUrls.map(url => ({ url }))
    };

    this.projectService.createProject(projectData).subscribe(
      (response) => {
        console.log('Project created successfully:', response);
        this.isLoading = false;
        this.router.navigate(['/home/projects']);
      },
      (error) => {
        console.error('Error creating project:', error);
        this.isLoading = false;
      }
    );
  }
}
