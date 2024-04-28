import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../../types/common';

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: []
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    reorderTasks(state, action: PayloadAction<{tasks: Task[], status: string}>) {
      const { tasks, status } = action.payload;
      // Filter out the tasks of the specified status
      state.tasks = state.tasks.filter(task => task.status !== status);
      // Add the new ordered tasks with updated 'order' fields
      tasks.forEach(task => {
        state.tasks.push({ ...task, status: status });
      });
    },
    markTaskAsDone(state, action: PayloadAction<string>) {
      const index = state.tasks.findIndex(task => task.id === action.payload);
      if (index !== -1) {
        state.tasks[index].status = 'done';
      }
    },
  }
});

export const { addTask, updateTask, reorderTasks, deleteTask, markTaskAsDone } = tasksSlice.actions;
export default tasksSlice.reducer;