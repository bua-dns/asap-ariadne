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
        <Identity />
        <div class="exhibition-title">
          <RouterLink to="/" @click="closeMobileNav()">
            <h1>Eine Schlafende Ariadne in Berlin</h1>
            <h2>Sieben Fragen und ein roter Faden</h2>
          </RouterLink>
        </div>
        <Navigation />
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
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  font-size: 1.2rem;
  .exhibition-title {
    display: none;

    a {
      color: var(--secondary-normal);
      text-decoration: none;
      h1 {
        font-size: 1.25rem;
        margin: 0 0 .25rem 0;
        font-weight: 700;
      }
      h2 {
        font-size: 1.5rem;
        margin: 0;
      }
    }      
  }
}


@media (min-width: 480px) {
  .header {

    .exhibition-title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      a {

        h1 {
          font-size: 1.75rem;
          margin: 0 0 .25rem 0;
        }
        h2 {
          font-size: 1.5rem;

        }
      }      
    }
  }
}
@media (min-width: 768px) {
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