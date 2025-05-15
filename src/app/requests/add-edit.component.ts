import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../_services/request.service';
import { EmployeeService } from '../_services/employee.service';

@Component({
    selector: 'app-request-add-edit',
    templateUrl: './add-edit.component.html',
})
export class AddEditComponent implements OnInit {
    id: number | null = null;
    request: any = {
        type: 'Equipment',
        employeeId: '',
        items: [],
        status: 'Pending'
    };
    employees: any[] = [];
    errorMessage: string = '';

    constructor(
        private requestService: RequestService,
        private employeeService: EmployeeService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;

        this.employeeService.getAll().subscribe((employees) => (this.employees = employees));

        if (this.id) {
            this.requestService.getById(this.id).subscribe({
                next: (data) => {
                    this.request = data;
                },
                error: (err) => (this.errorMessage = err.message),
            });
        } else {
            this.addItem(); // Start with at least one item field
        }
    }

    addItem(): void {
        this.request.items.push({ name: '', quantity: 1 });
    }

    removeItem(index: number): void {
        this.request.items.splice(index, 1);
    }

    save(): void {
        const payload = { ...this.request };

        const request$ = this.id
            ? this.requestService.update(this.id, payload)
            : this.requestService.create(payload);

        request$.subscribe({
            next: () => this.router.navigate(['/requests']),
            error: (err) => (this.errorMessage = err.message),
        });
    }

    cancel(): void {
        this.router.navigate(['/requests']);
    }
}
