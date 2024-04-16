<template>
    <div class="item-wrap">
        <div class="left-side-wrap">
            <div class="img-wrap">
                <img v-if="shoppingItem.image" :src="shoppingItem.image" alt="shoppingItem.name">
                <img v-else src="../../../public/not_found_pages_photos/nullImage.png" alt="shoppingItem.name">
            </div> 
            <div class="info-wrap">
                <div class="main-info">
                    <div class="title-info">
                        <h3 class="h3" :class="{'unvalible-text': !shoppingItem.isThisTown}">{{ shoppingItem.name }}</h3>
                        <span v-if="shoppingItem.isThisTown" class="h3 cost-text">{{ shoppingItem.sumCost }}&#8381;</span>
                        <span class="h3 not-order-text" v-else>Недоступно к заказу</span>
                    </div>
                    <div v-if="shoppingItem.volume" class="body-text shopping-info" :class="{'unvalible-text': !shoppingItem.isThisTown}">
                        <span v-if="shoppingItem.volume.meaning">{{`${removeDots(shoppingItem.volume.meaning)}мл`}}</span> 
                        <span v-if="shoppingItem.temperature">{{`, ${shoppingItem.temperature}`}}</span>
                        <span v-if="shoppingItem.sweetness">{{ `, сладость — ${shoppingItem.sweetness}` }}</span>
                    </div>
                    <div class="supplements">
                        <ul class="additives-list" :class="{'unvalible-text': !shoppingItem.isThisTown}">
                            <li class="body-text" v-for="item in shoppingItem.additives" :key="item">+{{ item.name }}</li>
                        </ul>
                        <ul class="additives-list" :class="{'unvalible-text': !shoppingItem.isThisTown}">
                            <li v-if="shoppingItem.milk" class="body-text">+{{ shoppingItem.milk.name }}</li>
                            <li v-if="shoppingItem.syrup" class="body-text">+{{ shoppingItem.syrup.name }}</li>
                        </ul>
                    </div>
                    <button @click="openModal" class="mobile-btn changer-btn body-text" :disabled="!shoppingItem.isThisTown">Изменить</button>
                </div>
                <div class="changer-wrap-desktop">
                    <div class="counter-changer">
                        <button @click="minusCount()" :disabled="!shoppingItem.isThisTown">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7742 6.22922C15.0753 6.53485 15.0753 7.03037 14.7742 7.336L10.1803 12L14.7742 16.664C15.0753 16.9696 15.0753 17.4652 14.7742 17.7708C14.4732 18.0764 13.9851 18.0764 13.6841 17.7708L8 12L13.6841 6.22922C13.9851 5.92359 14.4732 5.92359 14.7742 6.22922Z" fill="black"/>
                            </svg>
                        </button>
                        <span>{{ shoppingItem.count }}</span>
                        <button @click="plusCount()" :disabled="!shoppingItem.isThisTown">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.22578 17.7708C8.92474 17.4652 8.92474 16.9696 9.22578 16.664L13.8197 12L9.22578 7.336C8.92474 7.03037 8.92474 6.53485 9.22578 6.22922C9.52681 5.92359 10.0149 5.92359 10.3159 6.22922L16 12L10.3159 17.7708C10.0149 18.0764 9.52681 18.0764 9.22578 17.7708Z" fill="black"/>
                            </svg>
                        </button>
                    </div>
                    <button class="delete-btn" @click="deleteItem">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.968 2H13.032C13.4706 1.99999 13.8491 1.99998 14.1624 2.02135C14.4922 2.04386 14.8221 2.09336 15.1481 2.22836C15.8834 2.53297 16.4672 3.1174 16.7715 3.85218C16.9065 4.17801 16.9561 4.50778 16.9786 4.83763C16.9822 4.88994 16.9851 4.94407 16.9876 5H20C20.5523 5 21 5.44772 21 6C21 6.55229 20.5523 7 20 7H19V17.8416C19 18.3677 19 18.8217 18.9695 19.1958C18.9372 19.5906 18.8659 19.9835 18.6732 20.3616C18.3855 20.9263 17.9257 21.3857 17.3614 21.6732C16.9833 21.8659 16.5905 21.9372 16.1957 21.9695C15.8217 22 15.3677 22 14.8416 22H9.15839C8.6323 22 8.17815 22 7.80396 21.9695C7.40906 21.9372 7.016 21.8659 6.63781 21.6732C6.07245 21.3852 5.61416 20.9252 5.32698 20.3616C5.13421 19.9833 5.06288 19.5902 5.03057 19.1949C4.99997 18.8204 4.99998 18.3657 5 17.8386L5 7H4C3.44772 7 3 6.55229 3 6C3 5.44772 3.44772 5 4 5H7.01233C7.01481 4.94411 7.01778 4.89 7.02135 4.83772C7.04386 4.5079 7.09337 4.17808 7.22836 3.85218C7.53266 3.11754 8.11617 2.53303 8.85169 2.22836C9.17766 2.09334 9.50766 2.04385 9.8375 2.02135C10.1508 1.99998 10.5294 1.99999 10.968 2ZM9.01501 5C9.01556 4.9912 9.01612 4.9825 9.01671 4.97389C9.03226 4.74599 9.05887 4.65919 9.07612 4.61755C9.1778 4.37208 9.37247 4.17743 9.61706 4.07612C9.65864 4.0589 9.7455 4.03227 9.97362 4.01671C10.2107 4.00054 10.5204 4 11 4H13C13.4796 4 13.7893 4.00054 14.0262 4.01671C14.2542 4.03227 14.3411 4.05888 14.3827 4.07612C14.6274 4.17749 14.8222 4.37222 14.9238 4.61755C14.9411 4.65926 14.9677 4.74612 14.9832 4.97398C14.9838 4.98256 14.9844 4.99123 14.9849 5H9.01501ZM7 7V17.8C7 18.3766 7.00078 18.7487 7.02393 19.0319C7.04611 19.3034 7.08377 19.4041 7.10899 19.4536C7.20531 19.6426 7.3585 19.7958 7.54579 19.8912C7.595 19.9163 7.69554 19.9539 7.96686 19.9761C8.2498 19.9992 8.62146 20 9.19691 20H14.8031C15.3786 20 15.75 19.9992 16.0327 19.9761C16.3036 19.954 16.4041 19.9164 16.4534 19.8912C16.6418 19.7952 16.7955 19.6416 16.8912 19.4536C16.9163 19.4043 16.9539 19.3038 16.9761 19.0328C16.9992 18.75 17 18.3786 17 17.8031V7H7Z" fill="#A7B5B6"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <button @click="openModal" class="desktop-btn changer-btn body-text" :disabled="!shoppingItem.isThisTown">Изменить</button>
        <div class="changer-wrap-mobile">
            <div class="counter-changer">
                <button @click="minusCount()" :disabled="!shoppingItem.isThisTown">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.7742 6.22922C15.0753 6.53485 15.0753 7.03037 14.7742 7.336L10.1803 12L14.7742 16.664C15.0753 16.9696 15.0753 17.4652 14.7742 17.7708C14.4732 18.0764 13.9851 18.0764 13.6841 17.7708L8 12L13.6841 6.22922C13.9851 5.92359 14.4732 5.92359 14.7742 6.22922Z" fill="black"/>
                    </svg>
                </button>
                <span>{{ shoppingItem.count }}</span>
                <button @click="plusCount()" :disabled="!shoppingItem.isThisTown">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.22578 17.7708C8.92474 17.4652 8.92474 16.9696 9.22578 16.664L13.8197 12L9.22578 7.336C8.92474 7.03037 8.92474 6.53485 9.22578 6.22922C9.52681 5.92359 10.0149 5.92359 10.3159 6.22922L16 12L10.3159 17.7708C10.0149 18.0764 9.52681 18.0764 9.22578 17.7708Z" fill="black"/>
                    </svg>
                </button>
            </div>
            <button class="delete-btn" @click="deleteItem">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.968 2H13.032C13.4706 1.99999 13.8491 1.99998 14.1624 2.02135C14.4922 2.04386 14.8221 2.09336 15.1481 2.22836C15.8834 2.53297 16.4672 3.1174 16.7715 3.85218C16.9065 4.17801 16.9561 4.50778 16.9786 4.83763C16.9822 4.88994 16.9851 4.94407 16.9876 5H20C20.5523 5 21 5.44772 21 6C21 6.55229 20.5523 7 20 7H19V17.8416C19 18.3677 19 18.8217 18.9695 19.1958C18.9372 19.5906 18.8659 19.9835 18.6732 20.3616C18.3855 20.9263 17.9257 21.3857 17.3614 21.6732C16.9833 21.8659 16.5905 21.9372 16.1957 21.9695C15.8217 22 15.3677 22 14.8416 22H9.15839C8.6323 22 8.17815 22 7.80396 21.9695C7.40906 21.9372 7.016 21.8659 6.63781 21.6732C6.07245 21.3852 5.61416 20.9252 5.32698 20.3616C5.13421 19.9833 5.06288 19.5902 5.03057 19.1949C4.99997 18.8204 4.99998 18.3657 5 17.8386L5 7H4C3.44772 7 3 6.55229 3 6C3 5.44772 3.44772 5 4 5H7.01233C7.01481 4.94411 7.01778 4.89 7.02135 4.83772C7.04386 4.5079 7.09337 4.17808 7.22836 3.85218C7.53266 3.11754 8.11617 2.53303 8.85169 2.22836C9.17766 2.09334 9.50766 2.04385 9.8375 2.02135C10.1508 1.99998 10.5294 1.99999 10.968 2ZM9.01501 5C9.01556 4.9912 9.01612 4.9825 9.01671 4.97389C9.03226 4.74599 9.05887 4.65919 9.07612 4.61755C9.1778 4.37208 9.37247 4.17743 9.61706 4.07612C9.65864 4.0589 9.7455 4.03227 9.97362 4.01671C10.2107 4.00054 10.5204 4 11 4H13C13.4796 4 13.7893 4.00054 14.0262 4.01671C14.2542 4.03227 14.3411 4.05888 14.3827 4.07612C14.6274 4.17749 14.8222 4.37222 14.9238 4.61755C14.9411 4.65926 14.9677 4.74612 14.9832 4.97398C14.9838 4.98256 14.9844 4.99123 14.9849 5H9.01501ZM7 7V17.8C7 18.3766 7.00078 18.7487 7.02393 19.0319C7.04611 19.3034 7.08377 19.4041 7.10899 19.4536C7.20531 19.6426 7.3585 19.7958 7.54579 19.8912C7.595 19.9163 7.69554 19.9539 7.96686 19.9761C8.2498 19.9992 8.62146 20 9.19691 20H14.8031C15.3786 20 15.75 19.9992 16.0327 19.9761C16.3036 19.954 16.4041 19.9164 16.4534 19.8912C16.6418 19.7952 16.7955 19.6416 16.8912 19.4536C16.9163 19.4043 16.9539 19.3038 16.9761 19.0328C16.9992 18.75 17 18.3786 17 17.8031V7H7Z" fill="#A7B5B6"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'SpoppingItemComponent',
    props: {
        shoppingItem: Object,
    },
    computed: {
        ...mapGetters([
            'getOrderCount',
            'getOrderByUuid'
        ])
    },
    methods: {
        plusCount() {
            if (this.getOrderCount < 15) {
                this.$store.commit('addOrderItemCount', this.shoppingItem.uuid);
            }
        },
        minusCount() {
            if (this.getOrderByUuid(this.shoppingItem.uuid).count > 1) {
                this.$store.commit('reduceOrderItemCount', this.shoppingItem.uuid);
            } else {
                this.$emit('changeModal', this.shoppingItem.uuid);
            }
        },
        deleteItem() {
            this.$emit('changeModal', this.shoppingItem.uuid);
        },
        openModal() {
            document.body.style.overflow = 'hidden';
            this.$router.push(`cart/${this.shoppingItem.id}-${this.shoppingItem.uuid}`);
        },
        removeDots(str) {
            return str.split('.')[0];
        }
    }
}

</script>

<style lang="scss" scoped>

.item-wrap {
    display: flex;
    justify-content: space-between;
}

.left-side-wrap {
    display: flex;
    gap: 24px;
}

.img-wrap {
    width: 80px;
    max-height: 80px;

    @media screen and (max-width: $max-tablet) {
        width: 120px;
        max-height: 120px;
    }

    img {
        width: 100%;
        height: 100%;
        border-radius: 16px;
        -o-object-fit: cover;
        object-fit: cover;
        object-position: center;
    }
}

.info-wrap {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .main-info {
        display: flex;
        flex-direction: column;
        gap: 12px;

        @media screen and (max-width: $max-mobile) {
            max-width: 140px;
        }

        .mobile-btn {
            display: none;

            @media screen and (max-width: $max-tablet) {
                display: block;
                padding: 12px 16px;
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 20px;
            }
        }

        .title-info {
            display: flex;
            flex-direction: column;
            gap: 8px;

            .h3 {
                @media screen and (max-width: $max-tablet) {
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 700;
                    line-height: 22px;
                }
            }

            .cost-text {
                color: var(--main-color);
            }

            .not-order-text {
                color: var(--red);
            }
        }

        .shopping-info {
            text-transform: lowercase;

            @media screen and (max-width: $max-tablet)  {
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 20px;
            }
        }

        .supplements {
            display: flex;
            flex-direction: column;
            gap: 12px;

            .additives-list {
                display: flex;
                flex-direction: column;
                gap: 12px;

                .body-text {
                    @media screen and (max-width: $max-tablet)  {
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 400;
                        line-height: 20px;
                    }
                }
            }
        }

    }

    .changer-wrap-desktop {
        display: flex;
        gap: 16px;
        align-items: center;

        @media screen and (max-width: $max-tablet) {
            display: none;
        }

        .counter-changer {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .delete-btn {
            padding: 16px;
            border-radius: 16px;

            &:hover {
                transition: all 0.5s ease;
                background-color: var(--shade_1);

                svg {
                    path {
                        transition: all 0.5s ease;
                        fill: black;
                    }
                }
            }
        }
    }
}

.changer-btn {
    align-self: flex-start;
    padding: 16px 24px;
    background-color: var(--shade_1);
    border-radius: 16px;

    &:hover {
        transition: all 0.5s ease;
        background-color: var(--main-color);
        color: var(--white);
    }

    &:disabled {
        background-color: var(--shade_2);
        color: var(--shade_4);
    }
}

.desktop-btn {
    @media screen and (max-width: $max-tablet) {
        display: none;
    }
}

.changer-wrap-mobile {
    display: none;

    @media screen and (max-width: $max-tablet) {
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-between;
        align-items: flex-end;
    }

    .counter-changer {
        @media screen and (max-width: $max-tablet) {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 8px 0;
        }
    }
}

.unvalible-text {
    color: var(--shade_4);
}

</style>