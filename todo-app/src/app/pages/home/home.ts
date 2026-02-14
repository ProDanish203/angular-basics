import {
  Component,
  inject,
  OnInit,
  signal,
  viewChild,
  ElementRef,
} from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../types/todo.type';
import { FilterTodoPipe } from '../../pipes/filter-todo.pipe';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [FilterTodoPipe],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private todoService = inject(TodoService);
  todoInput = viewChild<ElementRef<HTMLInputElement>>('todoInput');
  todos = signal<Todo[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  searchTerm = signal('');
  editingId = signal<string | null>(null);
  editValue = signal('');

  ngOnInit(): void {
    this.loading.set(true);
    this.error.set(null);
    this.todoService
      .getTodos()
      .pipe(
        catchError((err) => {
          this.error.set(err?.message ?? 'Failed to load todos');
          return of([]);
        })
      )
      .subscribe((todos) => {
        this.todos.set(todos);
        this.loading.set(false);
      });
  }

  addTodo(event: Event): void {
    event.preventDefault();
    const el = this.todoInput()?.nativeElement;
    const title = el?.value?.trim();
    if (!title) return;
    const newTodo: Todo = {
      userId: '1',
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
    this.todos.update((list) => [newTodo, ...list]);
    if (el) el.value = '';
  }

  updateTodo(id: string, title: string): void {
    const trimmed = title?.trim();
    if (trimmed === undefined || trimmed === '') return;
    this.todos.update((list) =>
      list.map((t) => (t.id === id ? { ...t, title: trimmed } : t))
    );
    this.editingId.set(null);
    this.editValue.set('');
  }

  deleteTodo(id: string): void {
    this.todos.update((list) => list.filter((t) => t.id !== id));
    if (this.editingId() === id) {
      this.editingId.set(null);
      this.editValue.set('');
    }
  }

  toggleTodo(todo: Todo): void {
    this.todos.update((list) =>
      list.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  startEdit(todo: Todo): void {
    this.editingId.set(todo.id);
    this.editValue.set(todo.title);
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.editValue.set('');
  }
}
