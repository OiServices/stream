import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { CoreComponent } from './components/core/core.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { RoleGuard } from './guards/role/role.guard';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UsersComponent } from './components/admin/users/users.component';
import { InvestorsComponent } from './components/admin/investors/investors.component';
import { OrganizationsComponent } from './components/admin/organizations/organizations.component';
import { StartupsComponent } from './components/admin/startups/startups.component';
import { ProjectsComponent } from './components/admin/projects/projects.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'contact-us', component: ContactComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },  
    { path: 'home', component: CoreComponent, canActivate: [AuthGuard] },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard, RoleGuard],
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'users', component: UsersComponent },
          { path: 'investors', component: InvestorsComponent },
          { path: 'organizations', component: OrganizationsComponent },
          { path: 'startups', component: StartupsComponent },
          { path: 'projects', component: ProjectsComponent },
          { path: 'profile', component: ProfileComponent }
        ]
      }
];
