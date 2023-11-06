
<script setup>
import { computed, ref, onMounted, onUpdated } from 'vue';
import { useFetchRoom } from '@/composables/useFetchRoom.js';
import { useFetchRoomsInfo } from '@/composables/useFetchRoomsInfo.js';
import { useMapRoomData } from '@/composables/useDataMappings.js';
import { useRouteParams } from '@vueuse/router';
import { useRoomsStateStore } from '@/stores/rooms-state';

import NavIcon from '@/components/icons/NavIcon.vue';
import Ariadne from '@/components/parts/Ariadne.vue';

import Exhibit from '@/components/Exhibit.vue';
import Slider from '@/components/Slider.vue';

const number = useRouteParams('number');

const roomsStore = useRoomsStateStore();

onMounted(() => {
    roomsStore.addRoom(parseInt(number.value));
  })
  

const { data, isFetching, error } = useFetchRoom(number);
const { data:roomsInfoData } = useFetchRoomsInfo();

const roomsNavi = computed(() => {
  const rooms = roomsInfoData.value.data.map(roomInfo => roomInfo.attributes)
  let previousNumber = (parseInt(number.value) - 1).toString();
  let nextNumber = (parseInt(number.value) + 1).toString();
  const previousRoom = rooms.find(room => room.position === previousNumber);
  const nextRoom = rooms.find(room => room.position === nextNumber);
  return { previousRoom, nextRoom };
})

const roomData = computed(() => {
  const response = useMapRoomData(data.value.data[0]['attributes']);
  return response;
});
const exhibits = computed(() => {
  return roomData.value?.exhibits
});

const baseHue = 0;
const baseSaturation = 0;
const baseLightness = 0;
const maxLightness = 100;
const currentBackgroundLightness = ref(baseLightness);
const scrollLimit = 700;
const lightDarkLimit = 65;

const textColorStyle = computed(() => {
  if(currentBackgroundLightness.value < lightDarkLimit) return 'light';
  else return 'dark'; 
})
const currentScrollY = ref(null);
const roomHeight = ref(null);
const navHeight = ref(null);
const fadeOutRatio = ref(null);

const roomBackgroundStyle = computed(() => {
  const baseStyle = `background-color: hsl(${baseHue}, ${baseSaturation}%, ${baseLightness}%);`;
  let style = baseStyle;
  let relScroll = null;
  const fadeOut = roomHeight.value - scrollLimit - navHeight.value;
  if (!currentScrollY.value) return style;
  if (currentScrollY.value < scrollLimit) { 
     relScroll = currentScrollY.value / scrollLimit;
    currentBackgroundLightness.value = relScroll
    ? baseLightness + ((maxLightness - baseLightness) * relScroll)
    : undefined
    if (currentBackgroundLightness.value > 100) currentBackgroundLightness.value = 100;
    
  } 
  if (currentScrollY.value >= scrollLimit) {
    style = `background-color: hsl(${baseHue}, ${baseSaturation}%, ${maxLightness}%);`;
  }
  if (currentScrollY.value - fadeOut >= 1) {
      fadeOutRatio.value = ((scrollLimit) - (currentScrollY.value - fadeOut)) / scrollLimit;
      currentBackgroundLightness.value = baseLightness + ((maxLightness - baseLightness) * fadeOutRatio.value)
      if (currentBackgroundLightness.value < 0) currentBackgroundLightness.value = 0;
      if(fadeOutRatio.value < 0) fadeOutRatio.value = 0;
  }
  style = `background-color: hsl(${baseHue}, ${baseSaturation}%, ${currentBackgroundLightness.value}%);`
  return style
})


function trackScroll() {
  window.addEventListener('scroll', (e) => {
    const page = document.querySelector('.room');
    const pageNav = document.querySelector('.page-nav');
    roomHeight.value = pageNav?.scrollHeight
      ? page.scrollHeight - pageNav.scrollHeight
      : 0;
    navHeight.value = pageNav?.scrollHeight;
    currentScrollY.value = window.scrollY;
  })
}
trackScroll();
</script>

<template>
  <div class="room" id="room"
    :style="roomBackgroundStyle"
  >
    <template v-if="error">{{ error }}</template>
    <template v-if="isFetching">Fetching ...</template>
    <template v-if="data">
      <div class="output" v-if="false">
        {{ currentBackgroundLightness }}<br>
        {{ fadeOutRatio }}
      </div>
      <div class="room-title" :class="textColorStyle">
        <h2 :class="textColorStyle">{{ roomData.title }}</h2>
      </div>
      <div class="exhibits">
        <div class="component"
          v-for="(component, index) in exhibits"
          :key="`component-${index}`"
          
          >
            <template v-if="component.object">
              <Exhibit
                :exhibitContent="component"
                :textColorStyle="textColorStyle"
                context="room"
              />
            </template>
            <template v-if="component.slider">
              <Slider
                :sliderContent="component"
                :textColorStyle="textColorStyle"
              />
            </template>
        </div>
      </div>
    </template>
    <div class="page-nav" v-if="roomsInfoData">
      <div class="pagination">
        <div class="image-map-nav">
          <Ariadne mode="back"/>
        </div>
        <div class="textual-nav">
          <div class="nav-prev pagination-control" v-if="true">
            <RouterLink
            :to="`/room/${roomsNavi.previousRoom.position}`" 
              v-if="roomsNavi.previousRoom" 
              class="nav-element"
            >
              <div class="icon"><NavIcon dir="left"/></div>
              <div class="position">
                  {{ roomsNavi.previousRoom.position }}
              </div>  
              <div class="title">
                {{ roomsNavi.previousRoom.title }}
              </div>
            </RouterLink>
            <div class="placeholder" v-if="!roomsNavi.previousRoom" ></div>
          </div>
          <div class="nav-next pagination-control" v-if="true">
            <RouterLink 
              :to="`/room/${roomsNavi.nextRoom.position}`" 
              v-if="roomsNavi.nextRoom" 
              class="nav-element"
            >
              <div class="title">
                {{ roomsNavi.nextRoom.title }}
              </div>
              <div class="position">
                {{ roomsNavi.nextRoom.position }}
              </div>
              <div class="icon"><NavIcon dir="right"/></div>
            </RouterLink>
            <div class="placeholder" v-if="!roomsNavi.nextRoom" ></div>

          </div>
        </div>
      </div>
      <div class="apparatus">
        <div v-if="mode === 'nav'" class="instructions">
            <p v-if="themeData">{{ hint }}</p>
        </div>
        <div v-if="mode === 'back'" class="instructions">
            <RouterLink to="/#ariadne">Startseite</RouterLink>
        </div>
        <div class="apparatus-links">
            <router-link to="/page/impressum">Impressum</router-link> |
            <router-link to="/page/datenschutz">Datenschutz</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.output {
  position: fixed;
  top: 300px;
  right: 0;
  background-color: sandybrown;
  z-index: 1000;
}

.room {
  padding-top: var(--header-height);
  .room-title {
    // display: flex;
    // align-items: center;
    // justify-content: center;
    min-height: calc(100vw * .75);
    text-align: center;
    h2 {
      &.light {
        color: var(--color-text-inverse);
      }
      &.dark {
        color: var(--color-text);
      }
    }
  } 
  .component {
    margin-bottom: var(--component-gap);
    &.light {
      color: var(--color-text-inverse);
    }
    &.dark {
      color: var(--color-text);
    }
  }

  .exhibits {
    margin: 0 auto;
    max-width: var(--exhibits-width);
    
  }
  .page-nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - var(--header-height));
    background-color: black;
    color: var(--color-text-inverse);
    .pagination {
      display: block;
      max-width: 42rem;
      .image-map-nav {
        
      }
      .textual-nav {
        margin-top: 4rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: space-between;
        gap: 4rem;
        .pagination-control {
          display: flex;
          align-items: center;
          .nav-element {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            color: inherit;
            text-decoration: none;
            .title {
              flex-basis: 12rem;
            }
            .position {
              min-height: 2rem;
              padding: 0 1rem;
            }
            .icon {
              flex-basis: 2rem;
              color: var(--color-text-inverse);
              &:hover {
                color: var(--color-text-inverse-highlighted);
              }
            }
          }
          &.nav-prev {
            text-align: left;
            margin-left: auto;
            .nav-element .position {
              border-right: 2px solid var(--color-text-inverse);
            }
          }
          &.nav-next {
            text-align: right;
            margin-right: auto;
              .nav-element .position {
                padding: 0 1rem;
                border-left: 2px solid var(--color-text-inverse);
              }
          }
        }
      }
    }
    .apparatus {
      margin: 4rem 0;
      .apparatus-links {
        display: flex;
        justify-content: center;
        gap: 1rem;
        a {
          color: var(--color-text-inverse);
        }
      }
    }
  }
}


@media (min-width: 1024px) {
  .room {
    .room-title {
      min-height: calc(100vh - var(--header-height));
    }
  }
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.output {
  position: fixed;
  top: 20rem;
  right: 4rem;
}
</style>
