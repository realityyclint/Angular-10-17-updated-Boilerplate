import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { Role } from './_models';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);
const departmentsModule = () => import('./departments/departments.module').then(x => x.DepartmentsModule); // Lazy load Departments module
const employeesModule = () => import('./employees/employees.module').then(x => x.EmployeesModule); // Lazy load Employees module
const workflowsModule = () => import('./workflows/workflows.module').then(x => x.WorkflowsModule); // Lazy load Workflows module



const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
    { path: 'departments', loadChildren: departmentsModule, canActivate: [AuthGuard] }, // Add Departments route
    { path: 'employees', loadChildren: employeesModule, canActivate: [AuthGuard] }, // Add Employees route
    { path: 'employees/:employeeId/workflows', loadChildren: workflowsModule, canActivate: [AuthGuard] },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }