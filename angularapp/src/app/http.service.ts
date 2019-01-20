import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class HttpService {

	constructor(private http: HttpClient) { }

	addTodo(nameAbc: string): Observable<any> {
		return this.http.post(`${environment.API_URL}/addTodo`, { name: nameAbc });
	}

	getTodos(): Observable<any> {
		return this.http.get(`${environment.API_URL}/getTodos`);
	}

	deleteTodo(todoId): Observable<any> {
		return this.http.delete(`${environment.API_URL}/deleteTodo/${todoId}`);
	}

	updateTodo(id: string, name: string): Observable<any> {
		return this.http.patch(`${environment.API_URL}/updateTodo`, { id: id, name: name });
	}

}
