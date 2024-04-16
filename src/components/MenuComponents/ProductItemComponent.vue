<template>
    <div @click="openModal(dishData.id, dishData.is_hold)" class="product-wrap">
        <div class="left-wrap">
            <div class="img-wrap">
                <img v-if="dishData.image" :src="dishData.image" :alt="dishData.name" class="item-img">
                <img v-else src="not_found_pages_photos/nullImage.png" :alt="dishData.name" class="item-img">
            </div>
            <span v-if="dishData.is_hold" class="h3">Скоро будет</span>
            <span v-else class="h3">от {{Number(dishData.cost)}}&#8381;</span>
        </div>
        <div class="info-wrap">
            <div class="description-wrap">
                <h3 class="h3">{{ dishData.name }}</h3>
                <span v-if="dishData.is_hold" class="h3 unvalibale-text">Скоро будет</span>
                <span v-else class="mobile-header-text">от {{Number(dishData.cost)}}&#8381;</span>
                <span class="body-text">{{ dishData.composition }}</span>
            </div>
            <button class="icon-cart" :disabled="dishData.is_hold">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 8H6.77734C5.47772 8 4.82845 8 4.36621 8.26514C3.96058 8.49781 3.64877 8.86535 3.48595 9.30371C3.30053 9.80294 3.40726 10.4433 3.62065 11.7237L3.62109 11.7261L4.55443 17.3261C4.71276 18.276 4.79244 18.7512 5.02947 19.1077C5.23841 19.4219 5.5317 19.6703 5.87598 19.8247C6.26653 19.9999 6.74787 20 7.71094 20H16.2893C17.2524 20 17.7334 19.9999 18.124 19.8247C18.4682 19.6703 18.7618 19.4219 18.9707 19.1077C19.2077 18.7512 19.287 18.276 19.4453 17.3261L20.3786 11.7261L20.3796 11.7222C20.5928 10.4428 20.6995 9.80274 20.5141 9.30371C20.3513 8.86535 20.0402 8.49781 19.6346 8.26514C19.1724 8 18.522 8 17.2224 8H16M8 8H16M8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8" stroke="#111010" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ProductItemComponent',
    props: {
        dishData: Object,
    },
    methods: {
    openModal(id, name, hold) {
            if (hold) {
                return;
            } else {
                document.body.style.overflow = 'hidden';
                this.$router.push(`menu/${id}`);
            }
        }
    },
    computed: {
        currentTown() {
            return this.$store.state.townState.currentTown;
        }
    }
}

</script>

<style lang="scss" scoped>
.product-wrap {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 450px;
    cursor: pointer;

    &:hover {
        .icon-cart {
            background-color: var(--main-color);

            svg {

                path {
                    transition: stroke 0.4s ease;
                    stroke: var(--white);
                }
            }
        }
    }

    @media screen and (max-width: $max-mobile) {
        max-width: 100%;
        gap: 16px;
        flex-direction: row;
    }
}
.left-wrap {
    position: relative;

    @media screen and (max-width: $max-mobile) {
        max-width: 39%;
    }

    .img-wrap {
        max-width: 450px;
        padding-bottom: 100%;
        overflow: hidden;
        position: relative;
        border-radius: 16px;

        @media screen and (max-width: $max-mobile) {
            max-width: 100%;
            position: static;
            padding-bottom: 0;
            gap: 16px;
            aspect-ratio: 1;
        }

        .item-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;

            @media screen and (max-width: $max-mobile) {
                position: static;
            }
        }
    }

    .h3 {
        padding: 10px;
        border-radius: 8px;
        background-color: var(--white-transparent);
        position: absolute;
        bottom: 12px;
        right: 12px;

        @media screen and (max-width: $max-mobile) {
                display: none;
        }
    }
}
.info-wrap {
    display: flex;
    justify-content: space-between;

    .description-wrap {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .unvalibale-text {
            display: none;
            color: var(--main-color);

            @media screen and (max-width: $max-mobile) {
                display: inline;
            }
        }

        .h3 {
            @media screen and (max-width: $max-mobile) {
                font-size: 16px;
                font-style: normal;
                font-weight: 700;
                line-height: 22px;
            }
        }

        .mobile-header-text {
            display: none;

            @media screen and (max-width: $max-mobile) {
                display: inline;
                color: var(--main-color);
            }
        }

        .body-text {
            max-width: 205px;
            max-height: 48px;
            margin: 0; /* Убираем внешний отступ */
            -webkit-line-clamp: 2; /* Число отображаемых строк */
            display: -webkit-box; /* Включаем флексбоксы */
            -webkit-box-orient: vertical; /* Вертикальная ориентация */
            overflow: hidden; /* Обрезаем всё за пределами блока */

            @media screen and (max-width: $max-mobile) {
                max-width: 100%;
                display: inline;
                color: var(--shade_4);
                overflow: visible;
                font-size: 14px;
                line-height: 20px
            }
        }
    }
    .icon-cart {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 69px;
        height: 69px;
        border-radius: 16px;
        background-color: var(--shade_1);
        transition: background-color 0.5s ease;

        @media screen and (max-width: $max-mobile) {
            display: none;
        }

        &:disabled {
            background-color: var(--shade_2);

            svg {
                path {
                    transition: stroke 0.3s ease;
                    stroke: var(--shade_3);
                }
            }
        }
    }
}


</style>