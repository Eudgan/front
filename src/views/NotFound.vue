<template>
    <EmptyViewComponent 
        :photo="photo"
        :title="title"
        :subtitle="subtitle"
        :name-btn="nameBtn"
        :name-router="nameRouter"
    />
</template>

<script>
import EmptyViewComponent from '@/components/EmptyViewComponent.vue';

export default {
    name: 'NotFound',
    components: {
        EmptyViewComponent,
    },
    data() {
        return {
            photo: 'page_404',
            title: 'ошибка 404. Разлился чай',
            subtitle: 'Мы не смогли найти страницу, которую вы искали',
            nameBtn: 'На главную',
            nameRouter: 'home'
        }
    }
}

</script>

<style lang="scss" scoped>

main {
  padding: 0 40px;

  @media screen and (max-width: $max-tablet) {
    padding: 0 24px;
  }

  @media screen and (max-width: $max-mobile) {
    padding: 0 16px;
  }
}

</style>

