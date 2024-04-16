<template>
    <div class="shopping-wrap">
        <h1 class="h2">Корзина</h1>
        <div class="shopping-item-wrap" v-for="item in getOrder" :key="item.id">
            <ShoppingItemComponent :shopping-item="item" @change-modal="changeModal"/>
            <hr>
        </div>
        <WarningInfoComponent v-if="getOrderCount >= 15" :warning-text="'Максимально товаров в корзине — 15'" />
        <div class="cost-wrap">
            <span class="h2">Итого</span>
            <span class="h2">{{getTotalCost}}&#8381;</span>
        </div>
    </div>
</template>

<script>
import ShoppingItemComponent from './ShoppingItemComponent.vue';
import WarningInfoComponent from './WarningInfoComponent.vue';
import axios from '../../axios/index.js';
import { mapGetters } from 'vuex'

export default {
    name: 'ShoppingListComponent',
    data() {
        return {
            dishData: null,
        }
    },
    components: {
        ShoppingItemComponent,
        WarningInfoComponent
    },
    watch: {
        '$store.state.townState.currentTown': {
            handler(newTown) {
                this.requestDishData(newTown.id);
            }
        }
    },
    computed: {
        getOrder() {
            return this.$store.state.orderItems;
        },
        ...mapGetters([
            'getOrderCount',
            'getTotalCost',
        ]),
    },
    methods: {
        changeModal(id) {
            this.$emit('changeCartModal', id);
        },
        async requestDishData(newValue) {
            try {
                const response = await axios.post(`/city-dishes:search`, {
                filter: {
                    city_id: newValue,
                }
            })
                const stopList = response.data.data;    

                this.getOrder.forEach((dish) => {
                    const foundDish = stopList.find((elem) => elem.dish_id === dish.id);
                    if (foundDish === undefined || foundDish.hold_status) {
                        this.$store.commit('changeIsThisTown', {
                            id: dish.id,
                            switcher: false,
                        });      
                    } else {
                        this.$store.commit('changeIsThisTown', {
                            id: dish.id,
                            switcher: true,
                        });  
                    }
                })
            } catch (error) {
                this.error = error.message;
            }
        },
    },
    mounted() {
        if (this.$store.state.townState.currentTown) {
            this.requestDishData(this.$store.state.townState.currentTown.id);
        }
    }
}

</script>

<style lang="scss" scoped>

.shopping-wrap {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 39%;

    @media screen and (max-width: $max-tablet) {
        width: 100%;
    }

    .shopping-item-wrap {
        display: flex;
        flex-direction: column;
        gap: 24px;
        
        hr {
            width: 100%;
            margin: 0;
            border: 1px solid var(--shade_1);
        }
    }

    .warning-count {
        display: flex;
        align-items: center;
        gap: 12px;
        border-radius: 16px;
        padding: 16px;
        background-color: var(--soft-red);
    }

    .cost-wrap {
        display: flex;
        justify-content: space-between;

        @media screen and (max-width: $max-tablet) {
            display: none;
        }
    }
}

</style>