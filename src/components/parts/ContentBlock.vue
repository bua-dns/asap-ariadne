<script setup>
import { useGetDerivate } from '@/composables/utils.js'

const props = defineProps({
    blockContent: Object
});
        
</script>

<template>
    <div class="block-element">
        <div class="dev-out" v-if="false">{{ blockContent.caption }}</div>
        <template v-if="props.blockContent._block === 'textsection'">
            <div class="text-section">
                <div class="content" v-html="props.blockContent.content" />
            </div>
        </template>
        <template v-if="props.blockContent._block === 'textwithimagesection'">
            <div class="block-container">
                <div class="block-image-container">
                    <div class="block-image">
                        <img :src="useGetDerivate(props.blockContent.image.url, '800', '800')" alt="">
                        <div class="caption" v-if="blockContent.caption" v-html="blockContent.caption" />
                    </div>
                </div>
                <div class="block-text">
                    <div class="content" v-html="props.blockContent.content" />
                </div>
            </div>
        </template>
        <template v-if="props.blockContent._block === 'imagesection'">
            <div class="block-image">
                <img :src="props.blockContent.image.url" alt=""> 
                <div class="caption" v-if="blockContent.caption" v-html="blockContent.caption" />
            </div>
        </template>     
    </div>
</template>



<style lang="scss">
.block-element {
    margin: 0 auto;
    max-width: var(--content-width);
    min-height: calc(100vh - 96px);
    display: flex;
    align-items: center;
    line-height: var(--line-height-normal);
    .text-section {
        max-width: 48rem;
        margin: 0 auto;
        padding: 2rem;
        font-size: var(--font-size-large);

    }
    .block-container {
        display: block;

        padding: 1rem;
        .block-image-container {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 1rem;
            .block-image {
                img {
                    display: block;
                    max-width: 100%;
                    max-height: calc(100vh - 320px);
                }
                .caption {
                    font-size: var(--font-size-extra-small);
                    text-align: center;
                    padding: 1rem;
                }
            }
        }
        .block-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: var(--font-size-large);
            .content {
                
            }
        }
    }
}

@media (min-width: 768px) {
        .block-element {

        .text-section {

        }
        .block-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
            padding: 2rem;
        }
    }
}
</style>