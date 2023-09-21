<template>
  <ul class="checkerboard">
    <li
      class="checker-item"
      v-for="item of store.chesses"
      :key="item.id"
      @click="tap(item.id)"
    >
      {{ item.mark }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useGameStore } from "@/store/game";
import { usePlayer } from "./player";
const store = useGameStore();
const { tap } = usePlayer();
</script>

<style lang="scss" scoped>
html,
body,
#app {
  margin: 0;
  padding: 0;
}

ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.checkerboard {
  width: 330px;
  height: 330px;
  display: grid;
  grid-template-columns: 30% 30% 30%;
  grid-template-rows: 30% 30% 30%;
  grid-gap: 5%;
  border: 1px solid #eee;
  box-sizing: border-box;
  padding: 10px;
  cursor: pointer;
  .checker-item {
    border: 1px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
