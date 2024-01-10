  <script setup>
  
  import { computed, ref } from 'vue';
  import { useFetchSlider } from '@/composables/useFetchSlider';
  import { useGetDerivate } from '@/composables/utils';
  import CloseIcon from '@/components/icons/CloseIcon.vue';


  import Exhibit from '@/components/Exhibit.vue';

  const props = defineProps({
    sliderContent: Object,
    textColorStyle: String,
  });

  const sliderIndex = ref(0);
  const carouselMode = ref(false);

  function closeSlider() {
    carouselMode.value = false;
    sliderIndex.value = 0;
  }

  function moveSlides(dir) {
    if (!dir) {
      carouselMode.value = true;
      return
    }
    let newIndex = sliderIndex.value + dir;
    if (newIndex < 0) {
      sliderIndex.value = 0;
      carouselMode.value = false;
      return
    }
    if (newIndex >= slider.value.exhibits.length) {
      sliderIndex.value = 0;
      carouselMode.value = false;
      return
    }
    sliderIndex.value = newIndex;
  }

  const range = computed(() => {
    return [sliderIndex.value];
  });

  const { data, isFetching, error } = useFetchSlider(props.sliderContent.slider);

  const slider = computed(() => {
    return data.value.data.attributes
  });
  
  </script>

<template>
  <div class="slider" v-if="data">
    <!-- Controlls > 768px -->
    <CloseIcon @click="closeSlider()" class="close-icon icon" v-if="carouselMode"/>
        <div class="slider-control back" v-if="sliderIndex !== 0 && carouselMode" 
          @click="moveSlides(-1)"

        >
          <img class="icon" src="../assets/arrow_back.svg" alt="" >
        </div>
        <div class="slider-control forward" v-if="sliderIndex < slider.exhibits.length - 1 && carouselMode" 
          @click="moveSlides(1)"
        >
          <img class="icon" src="../assets/arrow_back.svg" alt="">
        </div>  
    <div class="slider-preview" v-if="!carouselMode" :class="props.textColorStyle">
      <div class="slider-preview-header">
        <h3>{{ props.sliderContent.title }}</h3>
      </div>
      <div class="slider-preview-body" >
        <div class="slider-preview-content">
          <div v-html="props.sliderContent.text" />
        </div>
        <div class="slider-preview-image" @click="moveSlides()">
          <template v-if="slider.representation?.url">
            <img :src="useGetDerivate(
              slider.representation?.url,
              600, 600
            )" />
          </template>
          <template v-else>
            <img src="@/assets/images/placeholder_image_stack.png" />
          </template>
        </div>
      </div>
    </div>
    <div class="slider-carousel"
        v-if="carouselMode"
      >
        
        <div class="slider-exhibit"
          v-for="(exhibit, index) in slider.exhibits"
          :key="`slider-exhibit-${index}`"
        >
        <template v-if="range.includes(index)">
          <Exhibit
            :exhibitContent="exhibit"
            context="slider"
            textColorStyle="dark"
          />
        </template>
      </div>
    </div>
    <div class="controls-mobile" v-if="carouselMode">
      <div class="pagination">
        <div class="slider-control back" v-if="sliderIndex !== 0" 
          @click="moveSlides(-1)"

        >
          <img class="icon" src="../assets/arrow_back.svg" alt="" >
        </div>
        <div class="slider-control forward" 
          @click="moveSlides(1)"
        >
          <img class="icon" src="../assets/arrow_back.svg" alt="">
        </div>  
      </div>
      <div class="close">
        <CloseIcon @click="closeSlider()" class="close-icon icon " />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slider {
  min-height: calc(100vh - var(--header-height) - calc( 2 * var(--component-gap)));
  .controls-mobile {
    position: fixed;
    display: flex;
    align-items: center;

    bottom: 0;
    left: 0;
    width: 100vw;
    height: 4rem;
    padding: .25rem .25rem;
    border-top: 2px solid hsl(0, 0%, 90%);
    background-color: hsl(0, 0%, 100%);
    z-index: 10000;
    .close {
      padding: 0 .5rem;
      .close-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--color-text);
        border-radius: 50%;
        width: 2rem;
        height: 2rem;

        background-color: rgba(255,255,255,.1);
      }

    }
    .pagination {
      flex: 1;
      display: flex;
      padding: 0 3rem;
      align-items: center;
      font-size: var(--font-size-small);
      line-height: var(--line-height-small);
      color: var(--color-text);
      .slider-control{
        width: 2rem;
        padding: .5rem;
        background: rgba(200,200,200,.25);
        border-radius: .5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        .icon {
          display: block;
          width: 3rem;
        }
        &.forward {
          margin-left: auto;
          padding-right: 1rem;

          .icon {
            transform: rotate(180deg);
          }
        }
        &.back {
          margin-right: auto;
          padding-left: 1rem;
        }
  
      }
    }
  }
  .close-icon, .slider-control {
    display: none;
  }
  .slider-preview {
    // min-height: calc(100vh - var(--header-height) );
    height: 100%;
    max-width: 100%;
    padding: 0 2rem;
    &.light {
      color: var(--color-text-inverse);
    }
    &.dark {
      color: var(--color-text);
    }
    .slider-preview-header {
        margin-bottom: 4rem;
      h3 {
        text-align: center;
      }
    }
    .slider-preview-body {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
      font-size: var(--font-size-normal);
      line-height: var(--line-height-normal);
      .slider-preview-content {
      }
      .slider-preview-image {
        max-height: 60vh;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          display: block;
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
  .slider-carousel {
    position: fixed;
    top: calc(var(--header-height) + 2px);
    height: calc(100vh - var(--header-height) );
    overflow-y: scroll;
    left: 0;
    right: 0;
    background-color: #fff;
    color: black;
    z-index: 1000;
    padding: 2rem 2rem;
    padding-bottom: 2rem;
    .slider-exhibit {
      position: relative;
    }
  }
  
}

@media screen and (min-width: 768px) {
  .slider {
    
    .controls-mobile {
      display: none;
    }
    .close-icon {
      position: fixed;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid var(--color-text);
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      right: 3rem;
      top: calc(var(--header-height) + 2rem);
      background-color: rgba(255,255,255,.1);
      z-index: 10000;
    }
    .close-icon:hover {
        background-color: rgba(0,0,0,.25);
    }
    .slider-control {
      position: fixed;
      top: calc((100vh - var(--header-height)) / 2 + 4rem);
      transform: translateY(-50%);
      z-index: 10000;
      width: 4rem;
      padding: .5rem;
      background: rgba(200,200,200,.25);
      border-radius: .5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .icon {
        display: block;
        width: 3rem;
      }
      &.forward {
        right: 1.5rem;
        padding-right: 1rem;
        .icon {
          transform: rotate(180deg);
        }
      }
      &.back {
        padding-left: 1rem;
        left: 1.5rem;
      }

    }
    .slider-preview {

      &.light {
      }
      &.dark {
      }
      .slider-preview-header {
        h3 {
        }
      }
      .slider-preview-body {

        .slider-preview-content {
        }
        .slider-preview-image {

          img {

          }
        }
      }
    }
    .slider-carousel {

      .slider-exhibit {
      }
    }
    
  }
  
}


</style>






