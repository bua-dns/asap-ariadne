<script setup>

import { computed, ref } from 'vue';
import Representation from '@/components/parts/Representation.vue';
import ModalContent from '@/components/parts/ModalContent.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import { useGetDerivate } from '@/composables/utils';
import { useElementBounding } from '@vueuse/core';
import { useWindowSize } from '@vueuse/core'


const props = defineProps({
  data: Object,
  textColorStyle: String,
  context: String,
});

const el = ref(null);

const imageProportion = computed(() => {
  const { x, y, top, right, bottom, left, width, height } = useElementBounding(el);
  return height.value / width.value
});
const windowProportion = computed(() => {
  const { width, height } = useWindowSize();
  return (height.value / width.value )
});


const modalState = ref(false);

const toggleModalState = () => {
    modalState.value = !modalState.value;
}

</script>

<template>
  <div class="representation" @click="toggleModalState()" :class="`context-${props.context}`">
    <img :src="useGetDerivate(props.data.representation.url,800,800)" ref="el">
    <div class="caption" :class="textColorStyle">
      <div class="credits" v-html="props.data.credits" />
    </div>
  </div>
  <div class="modal"
        :class="{ 'show': modalState }"
        @wheel.prevent
        @touchmove.prevent
        @scroll.prevent
    >
        <div class="modal-backdrop" @click.self="toggleModalState()">
          <ModalContent :data="props.data"/>
          
        </div>
        <CloseIcon @click="toggleModalState()" class="icon close-icon" />
    </div>
</template>

<style lang="scss">
  .representation {
      cursor: pointer;
      img {
        display: block;
        max-width: 100%;
        max-height: 60vh;
        margin: 0 auto;
        
      }
      &.context-slider {
        img {
          max-height: 50vh;
        }
      }
      .caption {
        &.light {
              color: var(--color-text-inverse);
            }
            &.dark {
              color: var(--color-text);
            }
        .credits {
          margin-top: .5rem;
          text-align: right;
          font-size: .75rem;
          opacity: .75;
        }
      }
  }
  .modal {
    display: none;
    position: relative;
    &.show {
      display: block;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      color: #fff;
      .close-icon {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(255,255,255,.95);
          border-radius: 50%;
          width: 3rem;
          height: 3rem;
          right: 2rem;
          top: 2rem;
          background-color: rgba(255,255,255,.1);
      }
      .close-icon:hover {
          background-color: rgba(255,255,255,.25);
      }
      .modal-backdrop {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: hsla(0,0%,5%,96%);
          cursor: pointer;
      }
    }
  }
@media (min-width: 1200px) {
.representation {
  img {
    max-width: 100%;
    max-height: 60vh;
    margin-left: auto;
}
}

}
</style>






