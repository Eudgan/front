<template>
    <Transition>
        <PreloaderComponent v-if="isLoading" />
    </Transition>
    <main>
        <div class="main-order-wrap" v-if="currentOrderCount > 0">
            <ShoppingListComponent @change-cart-modal="changeModal" />
            <OrderFormComponent />
        </div>
        <SimpleModalWindowComponent 
            v-if="isModal"
            @handler-btn="closeModal"
            :title="'Удаление товара'"
            :description="'Удаляем выбранный товар? Отменить действие будет невозможно'"
            :nameFirstBtn="'Оставить'"
            :nameSecondBtn="'Удалить'"
            :classFirstBtn="'equal'"
            :classSecondBtn="'delete'"
        />
        <EmptyViewComponent 
            v-if="currentOrderCount === 0"
            :photo="emptyCartData.photo"
            :title="emptyCartData.title"
            :subtitle="emptyCartData.subtitle"
            :name-btn="emptyCartData.nameBtn"
            :name-router="emptyCartData.nameRoute"
        />
        <router-view v-slot="{ Component }">
            <transition name="slide" >
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
</template>

<script>
import ShoppingListComponent from '@/components/CartComponents/ShoppingListComponent.vue';
import OrderFormComponent from '@/components/CartComponents/OrderFormComponent.vue';
import EmptyViewComponent from '@/components/EmptyViewComponent.vue';
import SimpleModalWindowComponent from '@/components/SimpleModalWindowComponent.vue';
import PreloaderComponent from '../components/PreloaderComponent.vue';

export default {
    name: 'CartView',
    components: {
        ShoppingListComponent,
        OrderFormComponent,
        EmptyViewComponent,
        SimpleModalWindowComponent,
        PreloaderComponent,
    },
    data() {
        return {
            isModal: false,
            modalID: null,
            emptyCartData: {
                photo: 'empty_cart_photo',
                title: 'Пока что корзина пуста',
                subtitle: 'Но мы знаем как это исправить',
                nameBtn: 'Перейти в меню',
                nameRoute: 'menu'
            },
            isLoading: true,
        }
    },
    computed: {
        currentOrderCount() {
            return this.$store.getters.getOrderLength;
        }
    },
    methods: {
        hideLoader() {
            this.isLoading = false;
        },
        changeModal(id) {
            this.isModal = true;
            this.modalID = id;
        },
        closeModal(name) {
            if (name === 'Оставить') {
                this.isModal = false;
            } else {
                this.$store.commit('deleteOrderItem', this.modalID);
                this.isModal = false;
            }
        }
    },
    mounted() {
        setTimeout(this.hideLoader, 2000);
    }
}

</script>

<style lang="scss" scoped>

main {
    margin-top: 32px;
    margin-bottom: 24px;
    padding: 0 40px;

    @media screen and (max-width: $max-tablet) {
        padding: 0 24px;
    }

    @media screen and (max-width: $max-mobile) {
        padding: 0 16px;
    }
}

.main-order-wrap {
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: $max-tablet) {
        flex-direction: column;
        gap: 32px;
    }

    @media screen and (max-width: $max-mobile) {
        margin-bottom: 40px;
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

.slide-enter-from,
.slide-leave-to {
    @media screen and (max-width: $max-mobile) {
        transform: translateY(120%);
        opacity: 0.9;
    }
}

.slide-enter-to,
.slide-leave-from {
    @media screen and (max-width: $max-mobile) {
        transform: translateY(0);
        opacity: 1;
    }

}

.slide-enter-active,
.slide-leave-active {
    @media screen and (max-width: $max-mobile) {
        transition: all 0.6s ease;
    }
}

</style>