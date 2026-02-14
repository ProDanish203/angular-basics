import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../types/todo.type';

@Pipe({
  name: 'filterTodo',
  standalone: true,
})
export class FilterTodoPipe implements PipeTransform {
  transform(todos: Todo[] | null, searchTerm: string): Todo[] {
    if (!todos?.length) return [];
    const term = searchTerm?.trim().toLowerCase() ?? '';
    if (!term) return todos;
    return todos.filter((t) => t.title.toLowerCase().includes(term));
  }
}
