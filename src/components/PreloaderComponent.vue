<template>
    <div class="preloader">
        <img src="../assets/main-logo/full-logo.svg" alt="Логотип">
    </div>
</template>
  
<script>
    export default {
        name: 'PreloaderComponent'
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
    background: var(--white);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>