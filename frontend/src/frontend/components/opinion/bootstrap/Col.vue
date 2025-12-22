<!-- Copyright 2024-2025 Vincent Jacques <vincent@vincent-jacques.net> -->

<script setup lang="ts">
import { computed } from 'vue'


const props = defineProps<{
  w?: number,
}>()

const class_ = computed(() => props.w ? `col-${props.w}` : 'col')
</script>

<template>
  <div :class="class_">
    <slot></slot>
  </div>
</template>
