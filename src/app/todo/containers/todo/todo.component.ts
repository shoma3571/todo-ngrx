import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]>;
  constructor(private todoService: TodoService) {}
  ngOnInit() {
    this.todos$ = this.todoService.loadAll();
  }
  create(todo: Partial<Todo>) {
    const date = new Date();
    todo.checked = false;
    todo.createdAt = Math.floor(date.getTime() / 1000);
    todo.updatedAt = Math.floor(date.getTime() / 1000);
    this.todoService.create(todo).subscribe(_ => {
      this.todos$ = this.todoService.loadAll();
    });
  }
  update(todo: Todo) {
    this.todoService.update(todo).subscribe(_ => {
      this.todos$ = this.todoService.loadAll();
    });
  }
  remove(id: number) {
    this.todoService.remove(id).subscribe(_ => {
      this.todos$ = this.todoService.loadAll();
    });
  }
}