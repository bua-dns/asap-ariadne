<script setup>

import { computed, ref } from 'vue';

const props = defineProps({
  data: Object
});
</script>


<template>
    <div class="modal-content">
        <div class="left">
            <p></p>
          </div>
          <div class="center image-display">
            <img :src="props.data.representation.url">
          </div>
          <div class="right">
            <div class="caption" 
                v-if="props.data.comment" v-html="props.data.comment" />
            <div class="credits"
                v-if="props.data.credits" v-html="props.data.credits" />
          </div>
    </div>
</template>

<style lang="scss">
.modal-content {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    a {
        color: inherit;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
    &>div {
    }
    .left, .right {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        gap: 1.5rem;
        font-size: .85rem;
        padding: 1rem 1rem 0 1rem;
        .credits{
            
        }
    }
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            display: block;
            max-width: 100%;
            height: auto;
            max-height: 95vh;
        }
    }
    // max-height: 85vh;
    // max-width: 85vw;
    // cursor:default;
    // img {
    //     display: block;
    //     max-width: 100%;
    //     max-height: 85vh;
    // }
}
</style>