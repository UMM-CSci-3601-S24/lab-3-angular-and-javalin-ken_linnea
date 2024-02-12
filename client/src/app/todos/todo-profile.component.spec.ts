import { ComponentFixture, waitForAsync, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRouteStub } from "src/testing/activated-route-stub";
import { MockTodoService } from "src/testing/todo.service.mock";
import { TodoCardComponent } from "./todo-card.component";
import { TodoProfileComponent } from "./todo-profile.component";
import { TodoService } from "./todo.service";
import { Todo } from "./todo";
import { throwError } from "rxjs";



describe('TodoProfileComponent', () => {
  let component: TodoProfileComponent;
  let fixture: ComponentFixture<TodoProfileComponent>;
  const mockTodoService = new MockTodoService();
  const todoId = 'chris_id';
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub({
    id: todoId
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [
        RouterTestingModule,
        MatCardModule,
        TodoProfileComponent, TodoCardComponent
    ],
    providers: [
        { provide: TodoService, useValue: mockTodoService },
        { provide: ActivatedRoute, useValue: activatedRoute }
    ]
  })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to a specific todo profile', () => {
    const expectedTodo: Todo = MockTodoService.testTodos[0];
    // Setting this should cause anyone subscribing to the paramMap
    // to update. Our `TodoProfileComponent` subscribes to that, so
    // it should update right away.
    activatedRoute.setParamMap({ id: expectedTodo._id });
    expect(component.todo).toEqual(expectedTodo);
  });

  it('should navigate to correct todo when the id parameter changes', () => {
    let expectedTodo: Todo = MockTodoService.testTodos[0];
    // Setting this should cause anyone subscribing to the paramMap
    // to update. Our `TodoProfileComponent` subscribes to that, so
    // it should update right away.
    activatedRoute.setParamMap({ id: expectedTodo._id });
    expect(component.todo).toEqual(expectedTodo);
    expectedTodo = MockTodoService.testTodos[1];
    activatedRoute.setParamMap({ id: expectedTodo._id });
    expect(component.todo).toEqual(expectedTodo);
  });

  it('should have "null" for the todo with a bad ID', () => {
    activatedRoute.setParamMap({ id: 'badID' });
    expect(component.todo).toBeNull();
  });

  it('should set error data on observable error', () => {
    activatedRoute.setParamMap({ id: 'chrisId' });

    const mockError = { message: 'Test Error', error: { title: 'Error Title' } };

    const getTodoSpy = spyOn(mockTodoService, 'getTodoById')
    .and
    .returnValue(throwError(() => mockError));

    component.ngOnInit();

    expect(component.error).toEqual({
      help: 'Error fetching todo',
      httpResponse: mockError.message,
      message: mockError.error.title
    });
    expect(getTodoSpy).toHaveBeenCalledWith(todoId);
  });
});
