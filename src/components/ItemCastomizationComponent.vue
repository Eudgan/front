<template>
    <div class="modal">
        <div v-if="isLoading" class="modal-box-load">
            <span class="h1">Загрузка</span>
        </div>
        <div v-else class="modal-box">
            <svg @click="closeModal()" class="cross-btn" xmlns="http://www.w3.org/2000/svg" width="36" height="37" viewBox="0 0 36 37" fill="none">
                <rect y="0.5" width="36" height="36" rx="18" fill="#E3F0F1"/>
                <path d="M12 12.5L24 24.5" stroke="#111010" stroke-width="3" stroke-linecap="round"/>
                <path d="M24 12.5L12 24.5" stroke="#111010" stroke-width="3" stroke-linecap="round"/>
            </svg>
            <div class="picture-item-wrap">
                <div v-if="dishData && dishData.image" class="img-wrap">
                    <img v-if="dishData.image" class="download-img" :src="dishData.image" :alt="dishData.name">
                </div>
                <button v-if="dishData && !this.uuid" @click="addOrder()" class="cart-btn">
                    <span class="upper-bold-text">в корзину</span>
                    <span class="upper-bold-text">{{ totalCost }}&#8381;</span>
                </button>
                <button v-if="dishData && this.uuid" @click="changeOrder()" class="cart-btn">
                    <span class="upper-bold-text">изменить</span>
                    <span class="upper-bold-text">{{ totalCost }}&#8381;</span>
                </button>
            </div>
            <div class="description-item-wrap">
                <div class="item-title">
                    <h2 v-if="dishData" class="subheader-text">
                        {{ dishData.name }} <br>
                        <div class="subheader-text">
                            <span>{{ removeDots(order.volume.meaning) }} {{ dishData.unit }}</span> 
                            <span v-if="order.temperature">{{ `, ${order.temperature}` }}</span>
                        </div>
                    </h2>
                    <span v-if="dishData" class="footnote-text">{{dishData.composition}}</span>
                    <div v-if="dishData && dishData.description" class="comment-wrap">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.28482 6.9516C7.69802 9.8952 6.40002 12.5952 6.40002 12.9516C6.40002 13.4628 6.82282 13.6 8.40002 13.6H10.4V18C10.4 24.1768 10.9368 24.0588 14.7152 17.0484C16.302 14.1048 17.6 11.4048 17.6 11.0484C17.6 10.5372 17.1772 10.4 15.6 10.4H13.6V6C13.6 -0.176801 13.0632 -0.0588006 9.28482 6.9516Z" fill="#70797A"/>
                        </svg>
                        <span class="footnote-text">{{ dishData.description }}</span>
                    </div>
                </div>
                <hr>
                <div class="add-item-info">
                    <span class="upper-bold-text">КБЖУ</span>
                    <TooltipComponent v-if="dishData" :energy-value="dishData.energy_value" :proteins="dishData.proteins" :fats="dishData.fats" :carbohydrates="dishData.carbohydrates" />
                </div>
                <hr>
                <div v-if="dishData && dishData.unit === 'мл'" class="form-wrap-top">
                    <div v-if="dishData" class="radio-wrap">
                        <RadioSliderComponent :radio-array-object="dishData.volumes" :id-name="'volume'" v-model="order.volume" :unit="dishData.unit"/>
                        <RadioSliderComponent v-if="dishData.temperatures.length" :radio-array-string="dishData.temperatures" :id-name="'temperature'" v-model="order.temperature"/>
                    </div>
                    <div v-if="dishData && dishData.is_sweet" class="range-wrap">
                        <RangeComponent v-model="order.sweetness"/>
                    </div>
                </div>
                <hr v-if="dishData && dishData.unit === 'мл'">
                <div class="form-wrap-bottom">
                    <div class="check-wrap-group">
                        <CheckboxComponent v-if="additives.length" :additives="additives" v-model="order.additives" />
                    </div>
                    <div class="check-wrap-group">
                        <RadioCheckComponent v-if="milks.length" :title="`Альтернативное молоко`" :radio-data="milks" v-model="order.milk" />
                    </div>
                    <div class="check-wrap-group">
                        <RadioCheckComponent v-if="syrups.length" :title="`Сироп`" :radio-data="syrups" v-model="order.syrup" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TooltipComponent from './Castomization/TooltipComponent.vue';
import RadioSliderComponent from './Castomization/RadioSliderComponent.vue';
import RangeComponent from './Castomization/RangeComponent.vue';
import CheckboxComponent from './Castomization/CheckboxComponent.vue';
import RadioCheckComponent from './Castomization/RadioCheckComponent.vue';

import axios from '../axios/index.js';
import { mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid';

export default {
    name: 'ItemCastomizationComponent',
    components: {
        TooltipComponent,
        RadioSliderComponent,
        RangeComponent,
        CheckboxComponent,
        RadioCheckComponent
    },
    props: ['id', 'uuid'],
    data() {
        return {
            dishData: null,
            additives: [],
            milks: [],
            syrups: [],
            order: {
                name: null,
                id: null,
                volume: null,
                temperature: null,
                sweetness: null,
                additives: [],
                milk: null,
                syrup: null,
            },
            isLoading: false,
        }
    },
    computed: {
        totalCost() {
            let additivesCost = 0;
            let milkCost = 0;
            let syrupCost = 0;
            if (this.order.additives.length) {
                this.order.additives.forEach(element => {
                    additivesCost += Number(element.cost);
                });
            }
            if (this.order.milk) {
                milkCost = Number(this.order.milk.cost);
            }
            if (this.order.syrup) {
                syrupCost = Number(this.order.syrup.cost);   
            }
            if (this.order.volume === null) {
                return 0;
            }
            return Number(this.order.volume.cost) + additivesCost + milkCost + syrupCost;
        },
        ...mapGetters([
            'getOrderByUuid'
        ]),
        orderByUuid() {
            return this.getOrderByUuid(this.uuid);
        }
    },
    watch: {
        'order.volume': {
            handler(newVolume) {
                this.additives = newVolume.supplements.filter((supplement) => supplement.category === 'Добавка');
                this.milks = newVolume.supplements.filter((supplement) => supplement.category === 'Молоко');
                this.syrups = newVolume.supplements.filter((supplement) => supplement.category === 'Сиропы');
            }
        },
    },
    methods: {
        closeModal() {
            document.body.style.overflow = 'auto';
            if (this.uuid) {
                this.$router.push('/cart');
            } else {
                this.$router.push('/menu');
            }  
        },
        addOrder() {
            document.body.style.overflow = 'auto';
            this.order.cost = this.totalCost;
            this.order.sumCost = this.totalCost;
            this.order.count = 1;
            this.order.image = this.dishData.image;
            this.order.uuid = uuidv4();
            this.order.isThisTown = true,
            this.$store.commit('addOrderItem', this.order);
            this.$router.push('/menu');
        },
        changeOrder() {
            document.body.style.overflow = 'auto';
            this.order.cost = this.totalCost;
            this.order.sumCost = this.totalCost * this.orderByUuid.count;
            this.order.count = this.orderByUuid.count;
            this.order.image = this.dishData.image;
            this.order.uuid = this.orderByUuid.uuid;
            this.order.isThisTown = true,
            this.$store.commit('changeOrderItem', this.order);
            this.$router.push('/cart');
        },
        createStandartVolume() {
            this.order.volume = this.dishData.volumes[0];
        },
        createStandartSupplements() {
            this.additives = this.dishData.volumes[0].supplements.filter((supplement) => supplement.category === 'Добавка');
            this.milks = this.dishData.volumes[0].supplements.filter((supplement) => supplement.category === 'Молоко');
            this.syrups = this.dishData.volumes[0].supplements.filter((supplement) => supplement.category === 'Сиропы');
        },
        createChangedOrder() {
            if (this.uuid) {
                this.order.temperature = this.orderByUuid.temperature;
                this.order.sweetness = this.orderByUuid.sweetness;
                this.order.volume = this.orderByUuid.volume;
                this.order.additives = this.orderByUuid.additives;
                this.order.milk = this.orderByUuid.milk;
                this.order.syrup = this.orderByUuid.syrup;
            }
        },
        removeDots(str) {
            return str.split('.')[0];
        },
        async getDish() {
            this.isLoading = true;
            try {
                const response = await axios.get(`/dishes/${this.id}`, {
                    params: {
                        include: 'volumes'
                    }
                });
                this.dishData = response.data.data;
            } catch (error) {
                this.error = error.message;
            } finally {
                this.isLoading = false;
                this.order.name = this.dishData.name;
                this.order.id = this.dishData.id;
                if (this.dishData.volumes.length) {
                    this.createStandartVolume();
                    this.createStandartSupplements()
                }
                if (this.dishData.temperatures.length) {
                    this.order.temperature = this.dishData.temperatures[0];
                }
                if (this.dishData.is_sweet) {
                    this.order.sweetness = '0';
                }
                this.createChangedOrder();
            }
        },
    },
    mounted() {
        this.getDish();
        document.body.style.overflow = 'hidden';
    },
    beforeRouteLeave(to, from, next) {
        document.body.style.overflow = 'auto';
        next();
    }
}

</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-box-load {
        width: 1144px;
        height: 684px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--white);
        border-radius: 32px;

        @media screen and (max-width: 1366px) and (min-width: $max-mobile) {
            height: 500px;
        }

        @media screen and (max-width: $max-mobile) {
            width: 100%;
            height: 110%;
            padding: 24px;
            border-radius: 0;
        }

        .h1 {
            @media screen and (max-width: $max-mobile) {
                display: none;
            }
        }
    }

    .modal-box {
        width: 1144px;
        height: 684px;
        padding: 24px 12px 24px 24px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        background-color: var(--white);
        border-radius: 32px;
        position: relative;

        @media screen and (max-width: 1366px) and (min-width: $max-mobile) {
            height: 500px;
        }

        @media screen and (max-width: $max-mobile) {
            display: flex;
            flex-direction: column;
            overflow: auto;
            width: 100%;
            height: 120%;
            padding: 100px 24px 180px 24px;
            border-radius: 0;
        }

        .cross-btn {
            position: absolute;
            top: 24px;
            right: 25px;
            z-index: 1000;
            cursor: pointer;

            @media screen and (max-width: $max-mobile) {
                top: 99px;
                right: 23px;
            }

            &:hover {
                transition: all 0.4s ease;
                filter: brightness(60%);
            }
        }
    }
}
.picture-item-wrap {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .img-wrap {
        max-width: 542px;
        height: 560px;

        @media screen and (max-width: 1366px) and (min-width: $max-mobile) {
            max-height: 375px;
        }

        @media screen and (max-width: $max-mobile) {
            max-width: 100%;
            height: auto;
            padding-bottom: 100%;
            overflow: hidden;
            position: relative;
            border-radius: 16px;
        }
        
        img {

            width: 100%;
            height: 100%;
            border-radius: 16px;
            object-fit: cover;
            object-position: center;


            @media screen  and (max-width: $max-mobile) {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .cart-btn {
        display: flex;
        padding: 16px 24px;
        align-items: center;
        justify-content: space-between;
        background-color: var(--main-color);
        border-radius: 16px;
        color: var(--white);

        &:hover {
            transition: all 0.4s ease;
            background-color: var(--main-dark-color);
        }

        @media screen and (max-width: $max-mobile) {
            position: fixed;
            bottom: 21px;
            left: 50%;
            z-index: 10;
            width: 93%;
            transform: translateX(-50%);
        }
    }
}
.description-item-wrap {
    padding-right: 12px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    overflow-y: auto;
    -webkit-tap-highlight-color:  transparent;

    @media screen and (max-width: $max-mobile) {
        overflow: visible;
        padding-right: 0;
    }
    
    hr {
        width: 100%;
        border: 1px solid var(--shade_1);
        margin: 0;
    }
}
.item-title {
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    h2 span {
        color: var(--main-color);
    }

    h2 {
        .subheader-text {
            text-transform: lowercase;
        }
    }

    .comment-wrap {
        gap: 8px;
        border-radius: 16px;
        padding: 12px;
        background-color: var(--shade_1);
        display: flex;
        align-items: center;

        .footnote-text {
            color: var(--shade_4);
        }
    }
}
.add-item-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.form-wrap-top {
    display: flex;
    flex-direction: column;
    gap: 32px;
    .radio-wrap {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
}
.range-wrap {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.form-wrap-bottom {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.check-wrap-group {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

</style>