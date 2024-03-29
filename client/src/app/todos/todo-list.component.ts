import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SortBy, Todo } from './todo';
import { TodoService } from './todo.service';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatNavList, MatListSubheaderCssMatStyler, MatListItem, MatListItemAvatar, MatListItemTitle, MatListItemLine } from '@angular/material/list';

import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatHint, MatError } from '@angular/material/form-field';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { TodoCardComponent } from "./todo-card.component";

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [],
  standalone: true,
  imports: [MatCard, MatCardTitle, MatCardContent, MatFormField, MatLabel, MatInput, FormsModule, MatHint, MatSelect, MatOption, MatRadioGroup, MatRadioButton, MatNavList, MatListSubheaderCssMatStyler, MatListItem, RouterLink, MatListItemAvatar, MatListItemTitle, MatListItemLine, MatError, TodoCardComponent]
})
export class TodoListComponent implements OnInit, OnDestroy {
  public serverFilteredTodos: Todo[];
  public todos: Todo[];

  public todoOwner: string;
  public todoStatus: boolean;
  public todoCategory: string;
  public todoBody: string;
  public viewType: 'list' | 'card' = 'list';
  public todoSortBy: SortBy;
  public limit: number;

  errMsg = '';
  private ngUnsubscribe = new Subject<void>();


  /**
   * This constructor injects both an instance of `TodoService`
   * and an instance of `MatSnackBar` into this component.
   *
   * @param todoService the `TodoService` used to get todos from the server
   * @param snackBar the `MatSnackBar` used to display feedback
   */
  constructor(private todoService: TodoService, private snackBar: MatSnackBar) {
    // Nothing here – everything is in the injection parameters.
  }

  /**
   * Get the todos from the server, filtered by the role and age specified
   * in the GUI.
   */
  getTodosFromServer() {
    this.todoService.getTodos({
      // Filter the users by category
      category: this.todoCategory
    }).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: (returnedTodos) => {
        this.serverFilteredTodos = returnedTodos;
        this.updateFilter();
        this.serverFilteredTodos = this.todos;
        this.updateSorting();
      },
      error: (err) => {
        if (err.error instanceof ErrorEvent) {
          this.errMsg = `Problem in the client – Error: ${err.error.message}`;
        } else {
          this.errMsg = `Problem contacting the server – Error Code: ${err.status}\nMessage: ${err.message}`;
        }
      },
    })
  }

  public updateFilter() {
    this.todos = this.todoService.filterTodos(
      this.serverFilteredTodos, { body: this.todoBody, owner: this.todoOwner, status: this.todoStatus, limit: this.limit }
    )
  }

  public updateSorting() {
    this.todos = this.todoService.sortTodos(this.serverFilteredTodos, this.todoSortBy)
  }

  /**
 * Starts an asynchronous operation to update the users list
 */
  ngOnInit(): void {
    this.getTodosFromServer();
  }

  /**
* When this component is destroyed, we should unsubscribe to any
* outstanding requests.
*/
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
