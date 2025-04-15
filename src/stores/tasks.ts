import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [] as Array<{
      id: number | string;
      title: string;
      done: boolean;
    }>,
  }),

  actions: {
    loadItems() {
      const storedItems = localStorage.getItem("tasks");
      if (storedItems) {
        try {
          this.tasks = JSON.parse(storedItems);
        } catch (error) {
          console.error("Ошибка при загрузке данных из localStorage:", error);
        }
      }
    },

    addItem(title: string) {
      const newTask = {
        id: Date.now(),
        title,
        done: false,
      };
      this.tasks.push(newTask);
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },

    removeItem(id: string | number) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      this.saveToLocalStorage();
    },

    toggleTask(id: string | number) {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.done = !task.done;
        this.saveToLocalStorage();
      }
    },
  },
});
