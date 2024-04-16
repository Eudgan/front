<template>
    <Transition>
        <PreloaderComponent v-if="isLoading" />
    </Transition>
    <main>
        <CategorysComponent 
        v-if="currentTown && categorysData"
        :categorys-data="categorysData"
        :current-town="currentTown.name" 
        />
        <swiper v-if="banersData"
        :pagination="{
            clickable: true,
        }" 
        :modules="modules" 
        :autoplay="{
            delay: 10000,
            pauseOnMouseEnter: true,
        }"
        class="mySwiper">
            <swiper-slide v-for="item in banersData" :key="item.id">
                <BanerComponent :title="item.name" 
                                :subtitle="item.description"
                                :img="item.image"
                                :background-img="item.background"
                                />
            </swiper-slide>
        </swiper>
        <ProductListComponentVue v-if="categorysData" :category-dishes-data="categorysData" :category-id="query" />
        <router-view v-slot="{ Component }">
            <transition name="slide" >
                <component :is="Component" />
            </transition>
        </router-view>
        <router-link class="cart-wrap" :to="{name: 'cart'}">
            <div class="img-wrap">
                <img :src="'/icons_header/cart-icon.svg'" alt="Корзина" >
                <span class="upper-bold-text">{{ currentOrderCount }}</span>
            </div>
            <span class="body-text">Корзина</span>
        </router-link>
    </main>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import BanerComponent from '@/components/MenuComponents/BanerComponent.vue';
import CategorysComponent from '@/components/MenuComponents/CategorysComponent.vue';
import ProductListComponentVue from '@/components/MenuComponents/ProductListComponent.vue';
import PreloaderComponent from '../components/PreloaderComponent.vue';
import axios from '../axios/index.js';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Autoplay } from 'swiper/modules';

export default {
    name: 'MenuView',
    components: {
        Swiper,
        SwiperSlide,
        BanerComponent,
        CategorysComponent,
        ProductListComponentVue,
        PreloaderComponent,
    },
    props: {
        query: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            categorysData: null,
            banersData: null,
            isLoading: true,
        }
    },
    setup() {
      return {
        modules: [Pagination, Autoplay],
      };
    },
    watch: {
        '$store.state.townState.currentTown': {
            handler(newValue) {
                this.requestDishData(newValue.id);
            },
            deep: true,
        }
    },
    computed: {
        currentTown() {
            return this.$store.state.townState.currentTown;
        },
        currentOrderCount() {
            return this.$store.getters.getOrderCount;
        },
    },
    methods: {
        async requestDishData(newValue) {
            try {
                const [categoryResponse, cityResponse] = await Promise.all([
                    axios.post(`/category-dishes:search`, {
                        include: 'dishes',
                        filter: {
                            city_id: newValue,
                        },
                    }),
                    axios.post(`/city-dishes:search`, {
                        filter: {
                            city_id: newValue,
                        }
                    })
                ]);

                const cityData = cityResponse.data.data;
                const dishData = categoryResponse.data.data;

                this.categorysData = null;
                
                this.categorysData = dishData.map((category) => {
                    return {
                        ...category,
                        dishes: category.dishes.map((dish) => {
                            return {
                                ...dish,
                                is_hold: cityData.find((option) => option.dish_id === dish.id)?.hold_status,
                            };
                        })
                    };
                });

            } catch (error) {
                this.error = error.message;
            } finally {
                this.isLoading = false;
            }
        },
        async requestBaners() {
            try {
                const response = await axios.post(`/promotions:search`)
                this.banersData = response.data.data;
            } catch (error) {
                this.error = error.message;
            }
        },
    },
    mounted() {
        this.requestBaners();
        if (this.currentTown) {
            this.requestDishData(this.currentTown.id);
        }
    }
}

</script>

<style lang="scss" scoped>

main {
    padding: 0 24px;
    overflow: visible;

    @media screen and (max-width: $max-tablet) {
        padding: 0 16px;
        margin-bottom: 40px;
    }
}
.mySwiper {
    margin-bottom: 24px;
}

.cart-wrap {
    display: none;
    text-align: center;

    &:active {
        filter: brightness(80%);
    }

    @media screen and (max-width: $max-tablet) {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        position: sticky;
        z-index: 6;
        bottom: 20px;
        // left: 50%;
        // transform: translate(-50%, 0);
        background-color: var(--main-color);
        border-radius: 16px;
        padding: 16px;

        .img-wrap {
            position: relative;

            img {
                width: 23px;
                height: 28px;
            }

            span {
                position: absolute;
                left: 50%;
                bottom: -10px;
                transform: translate(-50%, -50%);
                color: var(--main-color);
            }
        }

        .body-text {
            color: var(--white);
        }
    }
}

/* -------------------------------------------------------------------------- */
/*                                  Анимации                                  */
/* -------------------------------------------------------------------------- */

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

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

</style>

