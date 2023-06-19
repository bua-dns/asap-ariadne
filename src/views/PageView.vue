
<script setup>
import { computed, ref } from 'vue';
import { useFetchPage} from '@/composables/useFetchPage.js';
import { useRouteParams } from '@vueuse/router';


const slug = useRouteParams('slug');

const { data, isFetching, error } = useFetchPage(slug.value);

const page = computed(() => {
    return data.value.data.attributes
})

</script>

<template>
    <div class="page" v-if="data">
        <h1>{{ page.title }}</h1>
        <div class="content" v-html="page.body"/>
    </div>
</template>

<style lang="scss">
.page {
    padding-top: var(--header-height);

}
</style>
