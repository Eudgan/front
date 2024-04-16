<template>
  <Transition>
    <PreloaderComponent v-if="isLoading" />
  </Transition>
  <div v-if="isLoading === false" class="wrapper" id="main-wrapper">
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import PreloaderComponent from './components/PreloaderComponent.vue';

export default {
  components: {
    HeaderComponent, 
    FooterComponent,
    PreloaderComponent
  },
  data() {
    return {
      isLoading: true,
    }
  },
  methods: {
    hideLoader() {
      this.isLoading = false;
    },
  },
  mounted() {
    setTimeout(this.hideLoader, 500);
  }
}

</script>

<style lang="scss">

.wrapper-pink {
  background-color: var(--main-color);
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

</style>
