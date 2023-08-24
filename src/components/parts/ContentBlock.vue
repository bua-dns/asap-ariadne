<script setup>
import { useGetDerivate } from '@/composables/utils.js'

const props = defineProps({
    blockContent: Object
});
        
</script>

<template>
    <div class="block-element">
        <template v-if="props.blockContent._block === 'textsection'">
            <div class="text-section">
                <div class="content" v-html="props.blockContent.content" />
            </div>
        </template>
        <template v-if="props.blockContent._block === 'textwithimagesection'">
            <div class="block-container">
                <div class="block-image">
                    <img :src="useGetDerivate(props.blockContent.image.url, '800', '800')" alt="">
                </div>
                <div class="block-text">
                    <div class="content" v-html="props.blockContent.content" />
                </div>
            </div>
        </template>
        <template v-if="props.blockContent._block === 'imagesection'">
            <img :src="props.blockContent.image.url" alt="">
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
    line-height: 1.6;
    .text-section {
        max-width: 48rem;
        margin: 0 auto;
        padding: 2rem;

    }
    .block-container {
        display: block;

        padding: 1rem;
        .block-image {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 1rem;
            img {
                display: block;
                max-width: 100%;
                max-height: calc(100vh - 320px);
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
@media (min-width: 480px) {
    .block-element {

        .text-section {

        }
        .block-container {

            .block-image {

                img {

                }
            }
            .block-text {

                .content {
                    
                }
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
            .block-image {

                img {

                }
            }
            .block-text {

                .content {
                    
                }
            }
        }
    }
}
@media (min-width: 1024px) {
        .block-element {

        .text-section {

        }
        .block-container {

            .block-image {

                img {

                }
            }
            .block-text {

                .content {
                    
                }
            }
        }
    }
}
@media (min-width: 1200px) {
    .block-element {

        .text-section {

        }
        .block-container {

            .block-image {

                img {

                }
            }
            .block-text {

                .content {
                    
                }
            }
        }
    }
}



</style>