<script setup>
import { computed } from 'vue';

</script>
<template>
    <div class="identity" v-if="true">
    <a href="https://abguss-sammlung-berlin.de/" target="_blank">
        <img class="logo" src="@/assets/AAP_Logo_2.png" >
    </a>
    </div>
</template>

<style lang="scss" scoped>
.identity {
    display: flex;
    padding: 0 .5rem;
    align-items: center;
    font-size: 1.4rem;
    .logo {
        display: block;
        width: var(--header-lateral-elements-width);
        padding: .5rem 0;
    }
}
// RESPONSIVITY

@media (min-width: 480px) {
    .identity {
        padding: 0 1rem;

        .logo {
        }
    }
}
@media (min-width: 768px) {
    .identity {
        padding: 0 1.5rem;
        min-height: var(--header-height);
        .logo {
        }
    }
}
@media (min-width: 1024px) {
    .identity {
        padding: 0 2rem;

        .logo {
        }
    }
}
@media (min-width: 1200px) {
    .identity {

        .logo {
        }
    }
}

</style>
