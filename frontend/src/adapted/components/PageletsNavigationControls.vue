<!--
MALIN Platform https://malin.cahiersfantastiques.fr/
Copyright 2024-2025 Vincent Jacques <vincent@vincent-jacques.net> -

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

<script setup lang="ts">
defineProps<{
  pageletsCount: number,
}>()

const model = defineModel<number>({required: true})
</script>

<!-- Arrow characters copy-pasted from https://fsymbols.com/signs/arrow/ -->
<template>
  <div class="root">
    <div class="control" :class="{disabled: model === 0}" @click="model = Math.max(0, model - 1)"><div class="arrow arrowLeft"></div></div>
    <div style="overflow-x: hidden;"><slot></slot></div>
    <div class="control" :class="{disabled: model === pageletsCount - 1}" @click="model = Math.min(pageletsCount - 1, model + 1)"><div class="arrow"></div></div>
  </div>
</template>


<style scoped>
.root {
  --control-width: 35px;
  display: grid;
  grid-template-columns: var(--control-width) 1fr var(--control-width);
  height: 100%;
}

div.control {
  height: 100%;
  background: lightgrey;
  font-size: calc(.9 * var(--control-width));
  line-height: 0;
  font-family: Arial,sans-serif;
  font-weight: 400;
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

div.arrow {
  height: calc(2 * var(--control-width));
  width: 100%;
  background: grey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: black;
  border-top-left-radius: var(--control-width);
  border-bottom-left-radius: var(--control-width);
}

div.arrow::before {
  content: "⮕";
  text-align: center;
}

div.arrowLeft {
  transform: scaleX(-1);
}

div.control.disabled {
  cursor: not-allowed;
}

div.control.disabled div.arrow {
  color: lightgrey;
}
</style>
