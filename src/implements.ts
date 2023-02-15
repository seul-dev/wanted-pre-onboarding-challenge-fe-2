import type { TagItem, TodoItem, TodoService } from './index';

class TodoServiceImpl implements TodoService {
  private todoList: TodoItem[] = [];
  private todoId = 0;
  private tagId = 0;

  private inputValidator(input: string) {
    if (input === '') {
      throw new Error('Cannot add Item without content');
    }
    return input;
  }

  private findTodoIndex(todoId: number) {
    const todoIndex = this.todoList.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) {
      throw new Error(`Todo item with id: ${todoId} not found`);
    }
    return todoIndex;
  }

  createTodo(content: string) {
    const newTodo: TodoItem = {
      id: this.todoId,
      content: this.inputValidator(content),
      isDone: false,
      category: '',
      tags: [],
    };
    this.todoList.push(newTodo);
    this.todoId++;
  }
  readTodos(): TodoItem[] {
    console.dir(this.todoList, { color: true, depth: 3 });
    return this.todoList;
  }

  readTodoById(todoId: number): TodoItem {
    const todoIndex = this.findTodoIndex(todoId);

    console.dir(this.todoList[todoIndex], { color: true, depth: 3 });
    return this.todoList[todoIndex];
  }

  createTodoTagById(todoId: number, ...tags: string[]) {
    const todoIndex = this.findTodoIndex(todoId);
    const todo = this.todoList[todoIndex];
    const newTags: TagItem[] = tags.map((tag) => ({
      id: this.tagId++,
      content: this.inputValidator(tag),
    }));
    this.todoList[todoIndex] = { ...todo, tags: [...todo.tags, ...newTags] };
  }
  updateTodoContentById(todoId: number, content: string) {
    const todoIndex = this.findTodoIndex(todoId);
    const todo = this.todoList[todoIndex];
    this.todoList[todoIndex] = {
      ...todo,
      ...{ content: this.inputValidator(content) },
    };
  }

  updateTodoIsDoneById(todoId: number) {
    const todoIndex = this.findTodoIndex(todoId);
    const todo = this.todoList[todoIndex];
    this.todoList[todoIndex] = { ...todo, ...{ isDone: !todo.isDone } };
  }

  updateTodoCategoryById(todoId: number, category: string) {
    const todoIndex = this.findTodoIndex(todoId);
    const todo = this.todoList[todoIndex];

    this.todoList[todoIndex] = {
      ...todo,
      ...{ category: this.inputValidator(category) },
    };
  }

  updateTodoTagById(todoId: number, tagId: number, tagContent: string) {
    const todoIndex = this.findTodoIndex(todoId);
    const todo = this.todoList[todoIndex];
    const tagIndex = todo.tags.findIndex((tag) => tag.id === tagId);
    if (tagIndex === -1) {
      throw new Error(`Tag Item with id: ${tagId} not found`);
    }
    this.todoList[todoIndex].tags[tagIndex] = {
      id: tagId,
      content: this.inputValidator(tagContent),
    };
  }

  deleteTodoById(todoId: number) {
    const todoIndex = this.findTodoIndex(todoId);
    const copiedTodoList = this.todoList.filter(
      (todo) => todo.id !== todoIndex
    );
    this.todoList = copiedTodoList;
  }

  deleteAllTodos() {
    this.todoList = [];
  }

  deleteAllTagsById(todoId: number) {
    const todoIndex = this.findTodoIndex(todoId);
    const todo = this.todoList[todoIndex];
    const newTags: TagItem[] = [];
    this.todoList[todoIndex] = { ...todo, ...{ tags: newTags } };
  }
}

const todoService = new TodoServiceImpl();
todoService.createTodo('hi');
todoService.createTodo('hello');
todoService.createTodoTagById(0, 'tag1', 'tag2');
todoService.createTodoTagById(0, 'tag3', 'tag4');
todoService.updateTodoContentById(0, 'content');
todoService.updateTodoIsDoneById(0);
todoService.updateTodoCategoryById(0, 'category');
todoService.updateTodoTagById(0, 3, 'update-tag4');
todoService.readTodos();
todoService.deleteAllTagsById(0);
todoService.readTodos();

todoService.deleteTodoById(0);
console.clear();
todoService.readTodos();
todoService.deleteAllTodos();
todoService.readTodos();
