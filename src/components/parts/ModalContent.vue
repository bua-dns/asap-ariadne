<script setup>

import { computed, ref } from 'vue';

const props = defineProps({
  data: Object
});
</script>


<template>
    <div class="modal-content">
        <div class="image-frame">
            <img :src="data.representation.url">
        </div>
        <div class="caption" v-if="data.caption" v-html="data.caption" />
        <div class="credits" v-if="data.credits" v-html="data.credits" />
        <pre v-if="false">{{ data  }}</pre>
    </div>
</template>

<style lang="scss">
.modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    a {
        color: inherit;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
    .image-frame {
        max-height: 85vh;
        max-width: 85vw;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            display: block;
            max-width: 100%;
            max-height: 85vh;
        }  
    }
    .credits {
        margin-top: 1rem;
        font-size: .8rem;
        text-align: center;
    }   
}
</style>