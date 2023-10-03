<script setup>

</script>

<template>
  <button class="btn">
    <slot />
  </button>
</template>

<style lang="scss">
@import "@/assets/scss/variables.scss";

.btn {
  margin: 0;
  align-self: flex-end;
  padding: 3px;
  border: none;
  cursor: pointer;
  color: $color-malibu;
  background-color: $color-mine-shaft;
  opacity: 1;
  transition: all 0.3s;
  text-decoration: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 42px;
  min-height: 38px;

  &:hover {
    opacity: 0.7
  }

  &--transparent {
    background-color: $color-transparent;
  }

  &.disabled {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
