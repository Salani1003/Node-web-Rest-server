import {Request, Response} from "express";

const todos = [
  {id: 1, text: "Encontrar la piedra del infinito", completedAt: new Date()},
  {id: 2, text: "Encontrar la piedra del Poder", completedAt: null},
];

export class TodoController {
  //*DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id))
      return res.status(400).json({error: "ID argument must be a number"});
    const todo = todos.find((todo) => todo.id === id);

    todo
      ? res.json(todo)
      : res.status(404).json({error: `TODO with id ${id} not found`});
  };

  public createTodo = (req: Request, res: Response) => {
    const {text} = req.body;
    if (!text) return res.status(400).json({error: "TODO text is required"});
    const todo = {id: todos.length + 1, text, completedAt: null};
    todos.push(todo);

    res.status(201).json({
      ok: true,
      message: "TODO was added successfully",
    });
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const {text, completedAt} = req.body;

    if (isNaN(id))
      return res.status(400).json({error: "ID argument must be a number"});

    const todo = todos.find((todo) => todo.id === id);

    if (!todo)
      return res.status(404).json({error: `TODO with id ${id} not found`});

    todo.text = text || todo.text;
    completedAt === "null"
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));

    res.json({
      ok: true,
      message: `TODO with id ${id} was successfully updated`,
    });
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({error: "ID argument must be a number"});

    const todo = todos.find((todo) => todo.id === id);

    if (!todo)
      return res.status(404).json({error: `TODO with id ${id} not found`});

    todos.splice(todos.indexOf(todo), 1);

    res.json({
      ok: true,
      message: `TODO with id ${id} was successfully deleted`,
    });
  };
}
