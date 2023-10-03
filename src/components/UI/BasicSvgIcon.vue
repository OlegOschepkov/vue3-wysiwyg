<script setup>
import { defineProps, defineAsyncComponent } from 'vue';
import { computed } from 'vue';

const props = defineProps({
  name: String
});

const dynamicComponent = computed(() => defineAsyncComponent(() => import(`@/assets/svg/${props.name}.vue`)));
</script>

<template>
  <component
    :is="dynamicComponent"
    class="svg-icon"
  />
</template>
