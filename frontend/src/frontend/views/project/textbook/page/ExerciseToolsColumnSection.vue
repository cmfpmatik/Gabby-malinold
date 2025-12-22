<!-- Copyright 2024-2025 Vincent Jacques <vincent@vincent-jacques.net> -->

<template>
  <hr />
  <div @mousedown.stop="">
    <slot></slot>
  </div>
</template>

<style scoped>
div {
  cursor: initial;
}
</style>
