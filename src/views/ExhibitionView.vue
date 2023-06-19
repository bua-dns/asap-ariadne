
<script setup>
import { computed } from 'vue';
import { useFetchHomepage } from '../composables/useFetchHomepage';
import ContentBlock from '@/components/parts/ContentBlock.vue';
import Ariadne from '@/components/parts/Ariadne.vue';

const { data, isFetching, error } = useFetchHomepage();

// const exhibitionData = computed(() => {
//   return useMapRoomData(data.value.data[0]['attributes']);
// });

const colorScheme = {
  4: {
    background: [10, 20, 20, 10],
    text: [90, 100, 100, 90]
  }
}

const page = computed(() => {
  return data.value.data[0].attributes
})


const contentBlocks = computed(() => {
  
  const getColorScheme = (index) => {
    const backgroundColorValue = colorScheme[4]['background'][index];
    const backgroundColor = `hsl(0,0%,${backgroundColorValue}%)`
    const textColorValue = colorScheme[4]['text'][index];
    const textColor = `hsl(0,0%,${textColorValue}%)`
    return `background-color: ${backgroundColor}; color: ${textColor};`
  }

  return data.value.data[0].attributes.contentblocks
    .map((block, index) => {
      return {
        content: block,
        colorScheme: getColorScheme(index)
      }
    })
})



</script>

<template>
  <div class="exhibition" v-if="data">
    <template v-if="error">{{ error }}</template>
    <template v-if="isFetching">Fetching ...</template>
    <template v-if="data">
      <div class="intro">
        <div class="title-content"
          v-html="page.title"
        />
      </div>
      <div class="content-block"
        v-for="(block, index) in contentBlocks"
        :key="`block-${index}`"
        :style="block.colorScheme"
      >
        <ContentBlock :blockContent="block.content"/>
      </div>
      <div class="nav-footer">
        <div class="exhibition-nav" id="ariadne">
          <Ariadne mode="nav"/>
        </div>
      </div>

      
    </template>
  </div>
</template>

<style lang="scss">
.intro {
  background-color: #000;
  min-height: calc(100vh - var(--header-height));
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  .title-content {
    color: var(--color-text-inverse);
    width: var(--content-base-width);
    margin: 0 auto;
    h1, h2, h3 {
      color: var(--text-color-inverse);
    }
    h1 {
      font-size: 4rem;
      font-weight: 700;

    }
    h2 {
      font-size: 2rem;
    }
  }
}
.content-block {

}


.nav-footer {
  background-color: var(--bc-night);
  min-height: calc(100vh - var(--header-height));
  display: flex;
  flex-direction: column;
  justify-content: center;
  .exhibition-nav {
    max-width: 50rem;
    margin: 0 auto;
    padding: 2.5rem 0;
  }
}


@media (min-width: 1024px) {
  
}
</style>
