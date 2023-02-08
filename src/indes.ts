{
  interface TagItem {
    id: number;
    content: string;
  }

  interface TodoItem {
    id: number;
    content: string;
    isDone: boolean;
    category: string;
    tags: TagItem[];
  }

  interface TodoService {
    createTodo(content: string): void;
    createTodoTagById(todoId: number, ...tags: string[]): void;
    readTodoById(todoId: number): TodoItem;
    readTodos(): TodoItem[];
    updateTodoContentById(todoId: number, content: string): void;
    updateTodoIsDoneById(todoId: number): void;
    updateTodoCategoryById(todoId: number, category?: string): void;
    updateTodoTagById(todoId: number, tagId: number, tagContent: string): void;
    deleteTodoById(todoId: number): void;
    deleteAllTodo(): void;
    deleteAllTagsById(todoId: number): void;
  }
}
