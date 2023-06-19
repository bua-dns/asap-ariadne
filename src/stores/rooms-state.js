import { ref } from "vue";
import { defineStore } from "pinia";

export const useRoomsStateStore = defineStore("roomsState", () => {
  const state = ref([]);

  function addRoom(room) {
    const newRoomsList = [...state.value, room]
    state.value = Array.from(new Set(newRoomsList));
  }


  return { state, addRoom };
});
