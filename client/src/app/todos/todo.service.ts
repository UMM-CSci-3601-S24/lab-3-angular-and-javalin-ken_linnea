import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';

/**
 * Service that provides the interface for getting information
 * about `Todos` from the server.
 */
@Injectable()
export class TodoService {
  // The URL for the todos part of the server API.
  readonly todoUrl: string = environment.apiUrl + 'todos';

  constructor(private httpClient: HttpClient) {
  }

  getTodos(): Observable<Todo[]> {

    return this.httpClient.get<Todo[]>(this.todoUrl);
  }
}
