import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../app/todos/todo';
import { TodoService } from '../app/todos/todo.service';

/**
 * A "mock" version of the `TodoService` that can be used to test components
 * without having to create an actual service. It needs to be `Injectable` since
 * that's how services are typically provided to components.
 */
@Injectable()
export class MockTodoService extends TodoService {
  static testTodos: Todo[] = [
    {
      _id: 'chris_id',
      owner: 'Chris',
      status: true,
      body: 'UMM',
      category: 'homework',
      avatar: 'https://gravatar.com/avatar/8c9616d6cc5de638ea6920fb5d65fc6c?d=identicon'
    },
    {
      _id: 'pat_id',
      owner: 'Pat',
      status: true,
      body: 'IBM',
      category: 'video games',
      avatar: 'https://gravatar.com/avatar/b42a11826c3bde672bce7e06ad729d44?d=identicon'
    },
    {
      _id: 'jamie_id',
      owner: 'Jamie',
      status: false,
      body: 'Frogs, Inc.',
      category: 'software design',
      avatar: 'https://gravatar.com/avatar/d4a6c71dd9470ad4cf58f78c100258bf?d=identicon'
    }
  ];

  constructor() {
    super(null);
  }
// It's OK that the `_filters` argument isn't used here, so we'll disable
  // this warning for just his function.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTodos(_filters: { category?: string}): Observable<Todo[]> {

    //
    // The `of()` function converts a regular object or value into an
    // `Observable` of that object or value.
    return of(MockTodoService.testTodos);
  }

}
