<script setup>
import { defineProps, ref, Teleport, onMounted } from 'vue';
import { useGetDerivate } from '@/composables/utils';


const props = defineProps({
    image: String,
    caption: String,
    credits: String,
    textColorStyle: String,
    context: String
});
const showLightbox = ref(false);

// close lightbox on escape key
const closeLightbox = (e) => {
  if (e.key === "Escape") {
    showLightbox.value = false;
  }
};
onMounted(() => {
  window.addEventListener('keydown', closeLightbox);
});
</script>

<template>
    <div class="representation" v-if="true">
        <img :src="useGetDerivate(image,800,800)" :class="`context-${props.context}`" @click="showLightbox = true">
        <div class="caption" :class="textColorStyle">
            <div class="credits" v-html="credits" />
        </div>
    </div>
    <Teleport to="body" v-if="true">
        <div v-if="showLightbox" class="lightbox">
            <div class="lightbox-close" @click="showLightbox = false">
                <svg class="icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
                </svg>
            </div>
            <div class="lightbox-content" style="color: white;">
                <div class="image-container">
                    <img :src="image">
                </div>
                <div class="image-caption">
                    <div class="caption" v-html="caption" />
                    <div class="credits" v-html="credits" />
                </div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
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
          font-size: var(--font-size-small);
          opacity: .75;
        }
      }
  }
</style>