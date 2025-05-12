import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../_services/employee.service';
import { DepartmentService } from '../_services/department.service';
import { UserService } from '../_services/user.service';
import { AccountService } from '../_services/account.service'; // ✅ Import AccountService

@Component({
    selector: 'app-employee-add-edit',
    templateUrl: './add-edit.component.html',
})
export class AddEditComponent implements OnInit {
    id: number | null = null;
    employee: any = {
        employeeId: '',
        accountId: '',
        userId: '',
        position: '',
        departmentId: '',
        hireDate: '',
        status: 'Active',
    };
    users: any[] = [];
    departments: any[] = [];
    accounts: any[] = []; // ✅ Add this line
    errorMessage: string = '';

    constructor(
        private employeeService: EmployeeService,
        private userService: UserService,
        private departmentService: DepartmentService,
        private accountService: AccountService, // ✅ Inject here
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;

        this.userService.getAll().subscribe(users => this.users = users);
        this.departmentService.getAll().subscribe(depts => this.departments = depts);
        this.accountService.getAll().subscribe(accs => this.accounts = accs); // ✅ Load accounts

        if (this.id) {
            this.employeeService.getById(this.id).subscribe({
                next: (data) => {
                    if (data.hireDate) {
                        const hireDate = new Date(data.hireDate);
                        data.hireDate = hireDate.toISOString().split('T')[0]; // format to yyyy-MM-dd
                    }
                    this.employee = data;
                },

                error: (err) => (this.errorMessage = err.message),
            });
        }
    }

    save(): void {
        const payload = { ...this.employee };
        if (!this.id) delete payload.hireDate;

        const request = this.id
            ? this.employeeService.update(this.id, this.employee)
            : this.employeeService.create(this.employee);

        request.subscribe({
            next: () => this.router.navigate(['/employees']),
            error: (err) => (this.errorMessage = err.message),
        });
    }

    cancel(): void {
        this.router.navigate(['/employees']);
    }
}
