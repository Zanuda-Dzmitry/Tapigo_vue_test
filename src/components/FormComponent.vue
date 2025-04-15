<template>
  <div class="wrapper">
    <form class="form" @submit.prevent="handleSubmit">
      <input type="text" v-model.trim="inputValue" />
      <button type="submit">Добавить</button>
    </form>
    <div class="list">
      <div class="item" v-for="(task, index) in store.tasks" :key="index">
        <div class="item_title">
          <input
            type="checkbox"
            :checked="task.done"
            @change="store.toggleTask(task.id)"
          />
          <span :class="{ completed: task.done }">{{ task.title }}</span>
        </div>

        <button @click="store.removeItem(task.id)">Delete</button>
      </div>
      <p v-if="store.tasks.length === 0">Нет задач</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTasksStore } from "@/stores/tasks";

const store = useTasksStore();
const inputValue = ref();

onMounted(() => {
  loadItems();
});

const loadItems = async () => {
  try {
    await store.loadItems();
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }
};

const handleSubmit = () => {
  if (inputValue.value) {
    store.addItem(inputValue.value);
    inputValue.value = "";
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 375px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid var(--vt-c-green);
  border-radius: 10px;

  .form {
    display: flex;
    justify-content: space-between;
    padding: 1rem;

    button {
      background-color: var(--vt-c-green);
      border: none;
      border-radius: 10px;
      padding: 0 5px;
      color: var(--vt-c-white);
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 1rem;
    border-top: 1px solid var(--vt-c-green);

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .item_title {
        display: flex;
        gap: 10px;

        .completed {
          text-decoration-line: line-through;
        }
      }

      button {
        background-color: var(--vt-c-red);
        color: var(--vt-c-white);
        border: none;
        border-radius: 10px;
        padding: 0 5px;
      }
    }
  }
}
</style>
