<template>
  <button class="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded" @click="$emit('click')">
    <span v-if="icon" class="text-lg hidden  md:block">{{ icon }}</span>
    <span>{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: "TabButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
/* Add any specific styles for TabButton here */
</style>
