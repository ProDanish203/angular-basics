import { Component, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.types';
import { TodoItem } from '../components/todo-item/todo-item';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-todos',
  imports: [TodoItem],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos implements OnInit {
  todoService = inject(TodoService);
  todoInput = viewChild<ElementRef<HTMLInputElement>>('todo');
  todos = signal<Todo[]>([]);

  ngOnInit(): void {
    this.todoService.getTodos()
      .pipe(catchError((err) => {
        console.error(err);
        return of([]);
      }))
      .subscribe((todos) => {
        this.todos.set(todos);
      });
  }

  addTodo(event: Event) {
    event.preventDefault();
    const inputEl = this.todoInput()?.nativeElement;
    const title = inputEl?.value?.trim();
    if (!title) return;

    const newTodo: Todo = {
      userId: Math.random().toString(36).substring(2, 15),
      id: Math.random().toString(36).substring(2, 15),
      title,
      completed: false,
    };
    this.todos.update((todos) => [newTodo, ...todos]);
    if (inputEl) inputEl.value = '';
  }

  toggleTodo(todo: Todo) {
    this.todos.update((todos) => todos.map((t) => t.id === todo.id ? { ...t, completed: !t.completed } : t));
  }
}
