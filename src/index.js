/**
 * A Type representing a tag for a todo item
 * @typedef {Object} TagItem
 * @property {number} id - The unique ID for the tag
 * @property {string} content - The content of the tag
 */

/**
 * A Type representing a todo item
 * @typedef {Object} TodoItem
 * @property {number} id - The unique ID for the todo item
 * @property {string} content - The content of the todo item
 * @property {boolean} isDone - Whether the todo item is completed or not
 * @property {string} category - The category the todo item belongs to
 * @property {TagItem[]} tags - An array of tags for the todo item
 */

/**
 * A class for managing a list of todo items
 * @class TodoService
 */
class TodoService {
  /**
   * Creates an instance of TodoService.
   */
  constructor() {
    /**
     * The todo list.
     * @private
     * @type {TodoItem[]}
     */
    this.todoList = [];
    /**
     * The next available todo id.
     * @private
     * @type {number}
     */
    this.todoId = Date.now();
    /**
     * The next available tag id.
     * @private
     * @type {number}
     */
    this.tagId = Date.now();
  }

  /**
   * Create a new Todo item.
   * @param {string} [content=''] - The content of the Todo item.
   * @throws {Error} If the content is empty.
   * @returns {TodoItem} The created Todo item.
   */
  createTodo(content) {}

  /**
   * Read the Todo items.
   * @returns {TodoItem[]} The Todo items.
   */
  readTodos() {}

  /**
   * Update the content of a Todo item.
   * @param {number} todoId - The id of the Todo item.
   * @param {string} content - The new content of the Todo item.
   * @throws {Error} If the Todo item with the specified id is not found.
   * @returns {TodoItem} The updated Todo item.
   */
  updateTodoContent(todoId, content) {}

  /**
   * Toggle the `isDone` property of a Todo item.
   * @param {number} todoId - The id of the Todo item.
   * @throws {Error} If the Todo item with the specified id is not found.
   * @returns {TodoItem} The updated Todo item.
   */
  updateTodoIsDone(todoId) {}

  /**
   * Update the category of a todo item by its id.
   * @param {number} todoId - The id of the todo item.
   * @param {string} [category=''] - The new category of the todo item.
   * @returns {TodoItem} - The updated todo item.
   * @throws {Error} If the todo item with the given id is not found.
   * @throws {Error} If the category parameter is empty.
   */
  updateTodoCategoryById(todoId, category = '') {}

  /**
   * Create tags for a todo item by its id.
   * @param {number} todoId - The id of the todo item.
   * @param {...string} tags - The tags to be added to the todo item.
   * @returns {TodoItem} - The updated todo item.
   * @throws {Error} If the todo item with the given id is not found.
   */
  createTodoTagById(todoId, ...tags) {}

  /**
   * Update a tag for a todo item by its id and tag id.
   * @param {number} todoId - The id of the todo item.
   * @param {number} tagId - The id of the tag to be updated.
   * @param {string} tagContent - The new content of the tag.
   * @returns {TodoItem} - The updated todo item.
   * @throws {Error} If the todo item with the given id is not found.
   * @throws {Error} If the tag with the given id is not found.
   */
  updateTodoTagById(todoId, tagId, tagContent) {
    return {};
  }

  /**
   * Deletes a todo item from the todoList by its id.
   * @param {number} todoId - The id of the todo item to delete.
   * @returns {TodoItem[]} - The updated todoList.
   * @throws {Error} If the todo item with the specified id is not found.
   */
  deleteTodoById(todoId) {}

  /**
   * Deletes all todo items in the todoList.
   * @returns {TodoItem[]} - The updated todoList (now empty).
   */
  deleteAllTodo() {}

  /**
   * Deletes all tags from a todo item.
   * @param {number} todoId - The id of the todo item to remove tags from.
   * @returns {TodoItem} - The updated todo item with its tags removed.
   * @throws {Error} If the todo item with the specified id is not found.
   */
  deleteAllTagsById(todoId) {}

  /**
   * Deletes a specific tag from a todo item.
   * @param {number} todoId - The id of the todo item.
   * @param {number} tagId - The id of the tag to delete.
   * @returns {TodoItem} - The updated todo item with the specified tag removed.
   * @throws {Error} If the todo item or tag with the specified id is not found.
   */
  deleteTagById(todoId, tagId) {}
}
