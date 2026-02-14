import { Component, input, output } from '@angular/core';
import { Todo } from '../../models/todo.types';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  imports: [UpperCasePipe],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  todo = input<Todo>();
  toggleTodo = output<Todo>();
}
