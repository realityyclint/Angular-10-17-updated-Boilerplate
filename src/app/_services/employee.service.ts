import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    private baseUrl = '/accounts/employees'; // Adjust this if your API route differs

    constructor(private http: HttpClient) { }

    getAll(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl);
    }

    getById(id: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${id}`);
    }

    create(employee: any): Observable<any> {
        return this.http.post<any>(this.baseUrl, employee);
    }

    update(id: number, employee: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/${id}`, employee);
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${id}`);
    }

    transfer(id: number, departmentId: number): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${id}/transfer`, { departmentId });
    }
}
