<script setup>
import Navigation from '@/components/parts/Navigation.vue';
import Identity from '@/components/parts/Identity.vue';
import { useNavStateStore } from '@/stores/nav-state.js';
import { storeToRefs } from 'pinia';


const store = useNavStateStore();
const { state } = storeToRefs(store);
const { toggleState } = store;
const { closeMobileNav } = store;

</script>

<template>
    <div class="header">
      <div class="large">
        <Identity />
        <div class="exhibition-title">
          <RouterLink to="/" @click="closeMobileNav()">
            <h1>Eine Schlafende Ariadne in Berlin</h1>
            <h2>Sieben Fragen und ein roter Faden</h2>
          </RouterLink>
        </div>
        <Navigation />
      </div>
      <div class="small">
        <div class="upper">
          <Identity />
          <Navigation />
        </div>
        <div class="exhibition-title">
          <RouterLink to="/" @click="closeMobileNav()">
            <h1>Eine Schlafende Ariadne in Berlin - Sieben Fragen und ein roter Faden</h1>
          </RouterLink>
        </div>
      </div>
    </div>
    
</template>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 12;
  background-color: var(--header-color);
  border-bottom: 2px solid var(--secondary-normal);
  .large {
    display: none;
  }
  .small {
    .upper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 .5rem;
    }
      .exhibition-title {
        border: 1px solid var(--secondary-normal);
        text-align: center;
        a {
          color: var(--secondary-normal);
          text-decoration: none;
          h1 {
            font-size: 1rem;
            margin: 0 0 .25rem 0;
            font-weight: 700;
          }
        }      
      }
  }
  
}


@media (min-width: 480px) {
  .header {

    .exhibition-title {

      a {

        h1 {
          // font-size: 1.75rem;
          // margin: 0 0 .25rem 0;
        }
        h2 {
          // font-size: 1.5rem;

        }
      }      
    }
  }
}
@media (min-width: 768px) {
  .header {
    .small {
      display: none;
    }
    .large {
      display: flex;
      justify-content: space-between;
      .exhibition-title {
        border: 1px solid var(--secondary-normal);
        display: flex;
        flex-direction: column;
        justify-content: center;
        a {
          color: var(--secondary-normal);
          text-decoration: none;
          h1 {
            font-size: .75rem;
            margin: 0 0 .25rem 0;
            font-weight: 700;
          }
          h2 {
            font-size: .6rem;
            margin: 0;
          }
        }      
      }
    }
  }
}
@media (min-width: 1024px) {
  .header {

    .exhibition-title {

      a {

        h1 {

        }
        h2 {

        }
      }      
    }
  }
}
@media (min-width: 1200px) {
  .header {

    .exhibition-title {

      a {

        h1 {

        }
        h2 {

        }
      }      
    }
  }
}
</style>