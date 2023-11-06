  <script setup>
  
  import { computed } from 'vue';
  import { useFetchObject } from '@/composables/useFetchObject';
  import Representation from '@/components/parts/Representation.vue';
  
  const props = defineProps({
    exhibitContent: Object,
    textColorStyle: String,
    context: String,
  })
  const { data, isFetching, error, url } = useFetchObject(props.exhibitContent.object);
  

  const object = computed(() => {
    return data.value.data.attributes
  })

  </script>

<template>
  <div class="display" v-if="data">
    <div class="exhibit" :class="[props.textColorStyle, props.context]">
      <div class="exhibit-header">
        <h3>{{ exhibitContent.title }}</h3>
      </div>
      <div class="exhibit-body">
        <div class="exhibit-content">
          <div v-html="exhibitContent.text" />
        </div>
        <template v-if="object.representation.url">
          <div class="medium">
              <Representation
                :data="object"
                :textColorStyle="textColorStyle"
                :context="context"
              />
          </div>
        </template>
        <template v-if="object.video.url">
          <div>
            <video class="video-player" controls preload="auto" >
              <source :src="object.video.url" type='video/mp4'>
              <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a web browser that
                <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
              </p>
            </video>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.display {
  min-height: calc(100vh - var(--header-height) - calc( 2 * var(--component-gap)));
  padding: var(--component-y-padding) 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .exhibit {
    padding: 0 2rem;
    &.light  {
      color: var(--color-text-inverse);
    }
    &.dark, &.light.slider {
      color: var(--color-text);
    }
    .exhibit-header {
        margin-bottom: 4rem;
        h3 {
          text-align: center;
        }
      }
      .exhibit-body {
        display: flex;
        flex-direction: column;
        gap: 3.5rem;
        font-size: var(--font-size-normal);
        line-height: var(--line-height-normal);
        &>div {
          flex: 1;
        }
        .video-player {
          max-width: 100%;
        }
      }
  }
}


@media (min-width: 1200px) {
  .display {

    .exhibit {

      .exhibit-header {
          h3 {

          }
        }
        .exhibit-body {
          flex-direction: row;
          &>div {

          }
          .video-player {

          }
        }
    }
  }
}
@media (min-width: 1600px) {
  .display {

    .exhibit {

      .exhibit-header {
          h3 {

          }
        }
        .exhibit-body {


          &>div {
          }
          .video-player {

          }
        }
    }
  }
}
</style>






