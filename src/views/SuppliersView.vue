<template>
    <Transition>
        <PreloaderComponent v-if="isLoading" />
    </Transition>
    <main>
        <AdditionHeroComponent 
            :title="'Мы ищем поставщиков'"
            :subtitle="'Компания QUUA активно развивается по всей России и ищет партнеров для сотрудничества. Если тебе есть что нам предложить, то заполняй форму'"
            :img="'suppliers'"
            :link="'https://docs.google.com/forms/d/e/1FAIpQLSe2eUHU9hJXKCI259migdobp_YsNXFFFMyv81khwJxfnhqACg/viewform?usp=pp_url'"
            :btn-name="'Cтать партнером'"
        />
    </main>
</template>

<script>
import PreloaderComponent from '../components/PreloaderComponent.vue';
import AdditionHeroComponent from '../components/AdditionHeroComponent.vue'

export default {
    name: 'SuppliersView',
    components: {
        PreloaderComponent,
        AdditionHeroComponent
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
        let mainWrapper = document.getElementById('main-wrapper');
        mainWrapper.classList.add('wrapper-pink');
        setTimeout(this.hideLoader, 1000);
    },
    beforeRouteLeave(to, from, next) {
        let mainWrapper = document.getElementById('main-wrapper');
        mainWrapper.classList.remove('wrapper-pink');
        next();
    }
}

</script>

<style lang="scss" scoped>

main {
    margin-top: 32px;
    margin-bottom: 48px;
    overflow: hidden;
    padding: 0 40px;

    @media screen and (max-width: $max-tablet) {
        padding: 0 24px;
    }

    @media screen and (max-width: $max-mobile) {
        padding: 0 16px;
    }
}

/* -------------------------------------------------------------------------- */
/*                                  Анимации                                  */
/* -------------------------------------------------------------------------- */

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

</style>