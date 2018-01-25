import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { DashboardUsersComponent } from './users/dashboard-users.component';
import { DashboardUsersHomeComponent } from './users/dashboard-users-home.component';
import { DashboardUserDetailComponent } from './users/dashboard-user-detail.component';
import { AuthGuard } from '../shared/guards/auth-guard.service';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate-guard.service';

const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                component: DashboardComponent
            },
            {
                path: 'users',
                canActivateChild: [AuthGuard],
                component: DashboardUsersComponent,
                children: [
                    {
                        path: '',
                        component:DashboardUsersHomeComponent
                    },
                    {
                        path: ':firstName',
                        component: DashboardUserDetailComponent,
                        canDeactivate: [CanDeactivateGuard]                    
                    }
                ]
            }
        ]
    }
];

export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);