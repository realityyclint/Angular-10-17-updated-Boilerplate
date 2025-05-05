import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../_services/department.service';

@Component({
    selector: 'app-department-add-edit',
    templateUrl: './add-edit.component.html',
})
export class AddEditComponent implements OnInit {
    id: number | null = null;
    department: any = { name: '', description: '' };
    errorMessage: string = '';

    constructor(
        private departmentService: DepartmentService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
        if (this.id) {
            this.departmentService.getById(this.id).subscribe({
                next: (data) => (this.department = data),
                error: (err) => (this.errorMessage = err.message),
            });
        }
    }

    save(): void {
        if (this.id) {
            this.departmentService.update(this.id, this.department).subscribe({
                next: () => this.router.navigate(['/departments']),
                error: (err) => (this.errorMessage = err.message),
            });
        } else {
            this.departmentService.create(this.department).subscribe({
                next: () => this.router.navigate(['/departments']),
                error: (err) => (this.errorMessage = err.message),
            });
        }
    }

    cancel(): void {
        this.router.navigate(['/departments']);
    }
}