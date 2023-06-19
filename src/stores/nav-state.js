import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useNavStateStore = defineStore("navState", () => {
  const state = ref('compact');

  function toggleState() {
      
    state.value = state.value === 'compact'
      ? 'extended'
      : 'compact';
  }
  function closeMobileNav() {
    state.value = 'compact';
  }

  return { state, toggleState, closeMobileNav };
});
