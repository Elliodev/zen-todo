import { Component, computed, signal } from '@angular/core';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('zen-todo');

  todoText = signal('');
  todos = signal<Todo[]>([]);

  remainingCount = computed(() => {
    return this.todos().filter((t) => !t.completed).length;
  });

  addTodo() {
    // .trim() pour ignorer les espaces inutiles
    if (this.todoText().trim() != '') {
      let todoDetails: Todo = {
        id: Date.now(),
        text: this.todoText(),
        completed: false,
      };
      this.todos.update((a) => [...a, todoDetails]);

      this.todoText.set('');
    }
  }

  toggleTodo(id: number) {
    this.todos.update((liste) =>
      liste.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }

  removeTodo(id: number) {
    this.todos.update((liste) => liste.filter((t) => t.id !== id));
  }
}
