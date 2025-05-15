import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../_services/request.service';
import { AccountService } from '../_services/account.service';

@Component({
    selector: 'app-request-list',
    templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
    requests: any[] = [];
    errorMessage: string = '';

    constructor(
        private requestService: RequestService,
        private accountService: AccountService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadRequests();
    }

    loadRequests(): void {
        this.requestService.getAll().subscribe({
            next: (data) => (this.requests = data),
            error: (err) => (this.errorMessage = err.message),
        });
    }

    add(): void {
        this.router.navigate(['/requests/add']);
    }

    edit(id: number): void {
        this.router.navigate(['/requests/edit', id]);
    }

    delete(id: number): void {
        if (confirm('Are you sure you want to delete this request?')) {
            this.requestService.delete(id).subscribe({
                next: () => this.loadRequests(),
                error: (err) => (this.errorMessage = err.message),
            });
        }
    }

    account() {
        return this.accountService.accountValue;
    }
}
