
<script setup>
import { computed } from 'vue';
import { useFetchHomepage } from '../composables/useFetchHomepage';
import ContentBlock from '@/components/parts/ContentBlock.vue';
import Ariadne from '@/components/parts/Ariadne.vue';
import { useFetchTheme } from '@/composables/useFetchTheme.js';


const { themeData, themeIsFetching, themeError } = useFetchTheme();
const { data, isFetching, error } = useFetchHomepage();
const hint = computed(() => {
    return themeData.value.data[0].attributes.navi_hint
})
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
        <div class="apparatus">
          <div class="instructions">
              <p v-if="themeData">{{ hint }}</p>
          </div>
          <div class="apparatus-links">
            <a 
              href="https://abguss-sammlung-berlin.de/kontakt/" 
              alt="Impressum und Kontakt"
              target="_blank"
            >Impressum</a> |
            <a 
              href="https://abguss-sammlung-berlin.de/datenschutzhinweise/"
              alt="Datenschutzhinweise"
              target="_blank"
            >Datenschutzhinweise</a>
          </div>
        </div>
        </div>
      </div>

      
    </template>
  </div>
</template>

<style lang="scss">
.exhibition {
  .intro {
    padding: 0 .5rem;
    background-color: #000;
    min-height: var(--tile-min-height);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--font-size-large);
    .title-content {
      color: var(--color-text-inverse);
      max-width: var(--content-width);
      text-align: center;
      margin: 0 auto;
      h1, h2, h3 {
        color: var(--text-color-inverse);
      }
      h1 {
        font-size: var(--font-size-h1-front);
      }
      h2 {
        font-size: var(--font-size-h2-front);
      }
      h3 {
        font-size: var(--font-size-h3-front);
      }
    }
  }
  .content-block {

  }
  .nav-footer {
    background-color: var(--color-background-dark);
    min-height: calc(100vh - var(--header-height));
    display: flex;
    flex-direction: column;
    justify-content: center;
    .exhibition-nav {
      margin: 0 auto;
      padding: 2.5rem 0;
    }
    .apparatus {
      margin: 4rem 0;
      color: var(--color-text-inverse);
      .instructions {
        max-width: 24rem;
        text-align: center;
        margin: 4rem auto;
      }
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

@media (min-width: 480px) {
  .exhibition {
    .intro {

      .title-content {
        h1, h2, h3 {
          }
        h1 {
        }
        h2 {
        }      
      }
    }
    .content-block {

    }
    .nav-footer {

      .exhibition-nav {
        
        }

    }
  }
}
@media (min-width: 768px) {
  .exhibition {
    .intro {

      .title-content {

        h1, h2, h3 {
        }
        h1 {

        }
        h2 {
        }      
        
      }
    }
    .content-block {

    }
    .nav-footer {

      .exhibition-nav {

      }
    }
  }
}
@media (min-width: 1024px) {
  .exhibition {
    .intro {

      .title-content {

        h1, h2, h3 {
        }
        h1 {

        }
        h2 {
        }      
      }
    }
    .content-block {

    }
    .nav-footer {

      .exhibition-nav {

      }
    }
  }
}
@media (min-width: 1200px) {
  .exhibition {
    .intro {

      .title-content {

        h1, h2, h3 {
        }
        h1 {
          font-weight: 700;
        }
        h2 {
        }
      }
    }
    .content-block {

    }
    .nav-footer {

      .exhibition-nav {

      }
    }
  }
}
</style>
