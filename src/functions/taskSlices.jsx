import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task = {
        id: nanoid(),
        text: action.payload.text,
        isCompleted: false,
        description:
          action.payload.description !== undefined
            ? action.payload.description
            : undefined,
        priority: action.payload.priority,
        date:action.payload.due
      };
      state.tasks.push(task);
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const { id, text, description, priority,due } = action.payload;
      const existingTask = state.tasks.find((task) => task.id === id);

      if (existingTask) {
        existingTask.text = text !== "" ? text : existingTask.text;
        existingTask.description =
          description !== "" ? description : existingTask.description;
        existingTask.priority =
          priority !== "" ? priority : existingTask.priority;
          existingTask.date = due !== "" ? due : existingTask.date
      }
    },
    taskCheck: (state, action) => {
      const { id, isCompleted } = action.payload;
      const checkedTask = state.tasks.find((task) => task.id === id);
      checkedTask.isCompleted = !isCompleted;
    },
  },
});

export const { addTask, removeTask, editTask, taskCheck } = taskSlice.actions;
export default taskSlice.reducer;
