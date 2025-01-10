<template>
  <div class="relative max-w-lg mx-auto">
    <input v-model="searchQuery" @input="onSearch" type="text" placeholder="Search..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none" />
    <div v-if="searchQuery" class="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer hover:text-red-500 transition-all duration-200 ease-in-out" @click="clearSearch">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 text-gray-500">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup(props, { emit }) {
    const searchQuery = ref("");

    // Emit search event
    const onSearch = () => {
      emit("search", searchQuery.value);
    };

    // Clear search query
    const clearSearch = () => {
      searchQuery.value = "";
      emit("search", "");
    };

    return {
      searchQuery,
      onSearch,
      clearSearch,
    };
  },
};
</script>

<style scoped>
/* Tùy chỉnh thêm hiệu ứng và màu sắc */
</style>
