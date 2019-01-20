import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from './http.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'crud';
	todos: { _id: string, name: string, }[] = [];
	addTodoForm: FormGroup;
	selectedID = null;
	constructor(private httpService: HttpService) {
		this.createAddTodoForm();
	}

	createAddTodoForm() {
		this.addTodoForm = new FormGroup({
			todo : new FormControl('', Validators.compose([
				Validators.required
			]))
		});
	}

	ngOnInit() {
		this.getTodos();
	}

	getTodos() {
		this.httpService.getTodos()
		.subscribe(
			(response) => {
				if (response.error) {
					alert('Error in fetching Todos.');
				} else {
					this.todos = response.todo;
				}
			},
			(error) => {
				alert('Error in fetching Todos.');
			}
		);
	}

	addTodo() {
		if (this.addTodoForm.valid) {
			this.httpService.addTodo(this.addTodoForm.controls['todo'].value)
			.subscribe(
				(response) => {
					if (response.error) {
						alert('Error in Adding Todos.');
					} else {
						this.todos = response.todo;
					}
				},
				(error) => {
					alert('Error in Adding Todos.');
				}
			);
		}
	}

	deleteTodo(todoId) {
		this.httpService.deleteTodo(todoId)
		.subscribe(
			(response) => {
				if (response.error) {
					alert('Error in Deleting Todos.');
				} else {
					this.todos = response.todo;
				}
			},
			(error) => {
				alert('Error in Deleting Todos.');
			}
		);
	}

	selectTodo(todoId, todoName) {
		this.selectedID = (this.selectedID === null || this.selectedID !== todoId) ?  todoId : null;
		if (this.selectedID !== null) {
			this.addTodoForm.controls['todo'].setValue(todoName);
		} else {
			this.addTodoForm.controls['todo'].setValue('');
		}
	}

	updateTodo(todoId) {
		this.httpService.updateTodo(todoId, this.addTodoForm.controls['todo'].value)
		.subscribe(
			(response) => {
				if (response.error) {
					alert('Error in Updating Todos.');
				} else {
					this.todos = response.todo;
				}
			},
			(error) => {
				alert('Error in Updating Todos.');
			}
		);
	}
}
