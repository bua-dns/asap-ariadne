<script setup>
const props = defineProps({
  dir: String,
});
</script>

<template>
<div class="icon-container" :class="props.dir">
    <svg 
            width="100%" 
            viewBox="0 0 119 70" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10.5462 69.5632L0.0297564 58.9873L59.1835 0.166441L118.004 59.3201L107.428 69.8366L59.1239 21.2589L10.5462 69.5632Z" 
            fill="currentColor"/>
    </svg>
</div>
</template>
<style lang="scss" scoped>
.icon-container {
    cursor: pointer;
    
    &.left {
        transform: rotate(-90deg);
    }
    &.right {
        transform: rotate(90deg);
    }
    &.up {
        transform: rotate(0deg);
    }
    &.down {
        transform: rotate(180deg);
    }
}
</style>