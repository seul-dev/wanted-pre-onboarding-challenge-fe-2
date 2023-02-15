interface TodoType {
  id: number;
  content: string;
  completed: boolean;
  category: string;
  tags?: string[];
}

interface TodoList {
  todos: TodoType[];

  createTodo: (todo: TodoType) => void;
  findById: (id: number) => TodoType;
  updateTodo: (todo: TodoType) => void;
  updateTodoTag: (id: number, tagIndex: number, tag: string) => void;
  deleteTodo: (id: number) => void;
  resetTodo: () => void;
  deleteTag: (todoIndex: number, tagIndex: number) => void;
  deleteAllTag: (todoIndex: number) => void;
}

class TodoListImpl implements TodoList {
  private todoList: TodoType[] = [];

  get todos() {
    return this.todoList;
  }

  private findTodoIndex(id: number) {
    const todoIndex = this.todoList.findIndex((todo) => todo.id === id);
    return todoIndex;
  }

  private verifyContent(content: string) {
    if (content === '') {
      throw new Error('Content cannot be empty');
    }
  }

  createTodo(todo: TodoType) {
    this.verifyContent(todo.content);
    if (todo.content) {
      this.todos.push(todo);
    }
  }

  findById(id: number) {
    const todoIndex = this.findTodoIndex(id);
    return this.todoList[todoIndex];
  }

  updateTodo(todo: TodoType) {
    const todoIndex = this.findTodoIndex(todo.id);
    if (todoIndex === -1) {
      throw new Error('Not found Id');
    }
    this.verifyContent(todo.content);
    if (todo.content) {
      this.todoList[todoIndex] = { ...this.todoList[todoIndex], ...todo };
    }
  }

  updateTodoTag(id: number, tagIndex: number, tag: string) {
    const todoIndex = this.findTodoIndex(id);
    const tags = this.todoList[todoIndex].tags;
    if (!tags || !tags[tagIndex]) {
      return;
    }
    this.verifyContent(tag);
    const newTags = tags.map((originalTag, index) =>
      index === tagIndex ? tag : originalTag
    );
    this.todoList[todoIndex].tags = newTags;
  }

  deleteTodo(id: number) {
    const copiedTodo = this.todoList.filter((todo) => todo.id !== id);

    this.todoList = copiedTodo;
  }

  resetTodo() {
    const newTodo: TodoType[] = [];
    this.todoList = newTodo;
  }

  deleteTag(todoIndex: number, tagIndex: number) {
    const tags = this.todoList[todoIndex].tags;
    if (!tags || !tags[tagIndex]) {
      return;
    }
    const newTags = tags.filter((_, index) => index !== tagIndex);
    this.todoList[todoIndex].tags = newTags;
  }

  deleteAllTag(todoIndex: number) {
    this.todoList[todoIndex].tags = [];
  }
}
