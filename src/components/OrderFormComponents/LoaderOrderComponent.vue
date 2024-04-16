<template>
    <div class="preloader">
        <Vue3Lottie :animationData="loader" :height="200" :width="200" />
    </div>
</template>
  
<script>
import { Vue3Lottie } from 'vue3-lottie';
import loader from '../../../public/animation/loader_animation.json'

    export default {
        name: 'LoaderOrderComponent',
        components: {
            Vue3Lottie
        },
        data() {
            return {
                loader,
            }
        }
    };
</script>
  
<style scoped>
.preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 105%;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>