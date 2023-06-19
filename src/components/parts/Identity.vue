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
    min-width: 14rem;
    height: var(--header-height);
    padding: 0 2rem;
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    .logo {
        display: block;
        height: calc(var(--header-height) - 2rem);
        margin-right: auto;
    }
    &.desktop {
    display: none;
    }
    &.mobile {
    display: flex;
    }
}
// RESPONSIVITY
@media (min-width: var(--break-point-tablet)) {
    .identity {

        &.desktop {
            display: flex;
        }
        &.mobile {
            display: none;
        }
    }
}
</style>
