import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo, SortBy } from './todo'
import { TodoService } from './todo.service';



describe('TodoService', () => {
  // A small collection of test todos
  const testTodos: Todo[] = [
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
  let todoService: TodoService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let sorter: SortBy;
  let sortedTodos: Todo[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoService = new TodoService(httpClient);

  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  describe('getTodos()', () => {
    it('calls `api/todos` when `getUsers()` is called with no parameters', () => {
      todoService.getTodos().subscribe(
        todos => expect(todos).toBe(testTodos)
      );
      // Specify that (exactly) one request will be made to the specified URL.
      const req = httpTestingController.expectOne(todoService.todoUrl);
      // Check that the request made to that URL was a GET request.
      expect(req.request.method).toEqual('GET');
      // Check that the request had no query parameters.
      expect(req.request.params.keys().length).toBe(0);
      // Specify the content of the response to that request. This
      // triggers the subscribe above, which leads to that check
      // actually being performed.
      req.flush(testTodos);
    });

    describe('Calling getTodos() with parameters correctly forms the HTTP request', () =>{
      it('correctly calls api/todos with filter parameter \'category\'', () => {
        todoService.getTodos({ category: 'homework' }).subscribe(
          todos => expect(todos).toBe(testTodos)
        );

        // Specify that (exactly) one request will be made to the specified URL with the role parameter.
        const req = httpTestingController.expectOne(
          (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('category')
        );

        // Check that the request made to that URL was a GET request.
        expect(req.request.method).toEqual('GET');

        // Check that the role parameter was 'admin'
        expect(req.request.params.get('category')).toEqual('homework');

        req.flush(testTodos);
    });
  })
})

describe('testing sortTodos with different SortBy values', () => {
  it('sorts by owner', () => {
    sorter = 'owner'
    sortedTodos = todoService.sortTodos(testTodos, sorter)
    expect(sortedTodos[0].owner).toBe('Chris')
    expect(sortedTodos[1].owner).toBe('Jamie');
    expect(sortedTodos[2].owner).toBe('Pat');
  })

  it('sorts by category', () => {
    sorter = 'category'
    sortedTodos = todoService.sortTodos(testTodos, sorter)
    expect(sortedTodos[0].category).toBe('homework')
    expect(sortedTodos[1].category).toBe('software design');
    expect(sortedTodos[2].category).toBe('video games');
  })

  it('sorts by body', () => {
    sorter = 'body'
    sortedTodos = todoService.sortTodos(testTodos, sorter)
    expect(sortedTodos[0].body).toBe('Frogs, Inc.')
    expect(sortedTodos[1].body).toBe('IBM');
    expect(sortedTodos[2].body).toBe('UMM');
  })
})

describe('getTodoById()', () => {
  it('calls api/todos/id with the correct URL', () => {
    const targetTodo: Todo = testTodos[1];
    const targetId: string = targetTodo._id;
    todoService.getTodoById(targetId).subscribe(
      todo => expect(todo).toBe(targetTodo)
    );
    const expectedUrl: string = todoService.todoUrl + '/' + targetId;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(targetTodo);
  });
});

describe('filterTodos()', () => {
  it('filters by body', () => {
    const todoBody = 'UMM';
    const filteredTodos = todoService.filterTodos(testTodos, { body: todoBody});
    expect(filteredTodos.length).toBe(1);
    filteredTodos.forEach(todo => {
      expect(todo.body.indexOf(todoBody)).toBeGreaterThanOrEqual(0);
    });
  });
  it('filters by owner', () => {
    const todoOwner = 'Chris';
    const filteredTodos = todoService.filterTodos(testTodos, { owner: todoOwner });
    expect(filteredTodos.length).toBe(1);
    filteredTodos.forEach(todo => {
      expect(todo.owner).toBe(todoOwner);
    });
});
});
it('filters by status', () => {
  const todoStatus = true;
  const filteredTodos = todoService.filterTodos(testTodos, { status: todoStatus });
  expect(filteredTodos.length).toBe(2);
  filteredTodos.forEach(todo => {
    expect(todo.status).toBe(todoStatus);
  });
});
});
