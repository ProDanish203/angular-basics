import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Todo } from '../types/todo.type';

type TodoApi = { userId: number; id: number; title: string; completed: boolean };

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

  getTodos() {
    return this.http
      .get<TodoApi[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(
        map((list) =>
          list.map((t) => ({
            userId: String(t.userId),
            id: String(t.id),
            title: t.title,
            completed: t.completed,
          }))
        )
      );
  }
}
