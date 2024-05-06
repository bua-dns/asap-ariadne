<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useNavStateStore } from '@/stores/nav-state.js';


const store = useNavStateStore();
const { state } = storeToRefs(store);
const { toggleState } = store;

</script>

<template>
    <div class="hamburger-container" 
        @click="toggleState();"
        :class="state"
        >
            <div class="hamburger "></div>
    </div>
</template>

<style lang="scss" scoped>
.hamburger-container {
    position: relative;
    margin-left: auto;
    width: 3rem;
    height: 2.5rem;
    .hamburger {
        position: absolute;
        top:46%;
        right: .5rem;
        width: 32px;
        height: 4px;
        background: var(--secondary-dark);
        box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
        transition: 0.5s;
        &::before {
            top: -10px;
        }
        
        &::after {
            top: 10px;
        }
        &::before, &:after {
            content: '';
            position:absolute;
            width: 32px;
            height: 4px;
            background:var(--secondary-dark);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            transition:0.5s;
        }
    }

    &.extended {
        .hamburger {
            background:rgba(0,0,0,0);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0);
            &::before {
                top: 0;
                transform:rotate(45deg);
            }
            &::after {
                top: 0;
                transform:rotate(135deg);
                box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
            }
        }
    }

}
</style>