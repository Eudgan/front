<template>
    <header :class="{'menu-transparent-header': $route.name === 'home', 'suppliers-red-header': $route.name === 'suppliers', 'team-red-header': $route.name === 'team'}">
        <div class="left-header-wrap">
            <router-link class="logo-wrap" :to="{name: 'home'}">
                <img src="../assets/main-logo/logo-img.svg" alt="Логотип">
                <img src="../assets/main-logo/logo-name.svg" alt="Наименование компании">
            </router-link>
            <div @click="openModal()" class="location-wrap" :class="{'location-sup-white': $route.name === 'suppliers', 'location-team-white': $route.name === 'team', 'location-home-border': $route.name === 'home'}" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 9.92285C5 14.7747 9.24448 18.7869 11.1232 20.3252C11.3921 20.5454 11.5281 20.6568 11.7287 20.7132C11.8849 20.7572 12.1148 20.7572 12.271 20.7132C12.472 20.6567 12.6071 20.5463 12.877 20.3254C14.7557 18.7871 18.9999 14.7751 18.9999 9.9233C18.9999 8.08718 18.2625 6.32605 16.9497 5.02772C15.637 3.72939 13.8566 3 12.0001 3C10.1436 3 8.36301 3.7295 7.05025 5.02783C5.7375 6.32616 5 8.08674 5 9.92285Z" stroke="#F0749E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9Z" stroke="#F0749E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span v-if="currentTown" class="upper-bold-text" >{{ currentTown.name }}</span>
            </div>
        </div>
        <div class="right-header-wrap">
            <nav class="main-navigation">
                <router-link class="upper-bold-text" :class="{'active': $route.name === 'menu'}" :to="{name: 'menu'}">
                    Меню
                </router-link>
                <router-link class="upper-bold-text" :class="{'active': $route.name === 'team'}" :to="{name: 'team'}">
                    Команда
                </router-link>
                <router-link class="upper-bold-text" :class="{'active': $route.name === 'suppliers'}" :to="{name: 'suppliers'}">
                    Поставщикам
                </router-link>
            </nav>
            <div class="add-link">
                <a href="https://m1.iiko.cards/ru-RU/L/021539" target="_blank" @click="sendMetrick" class="upper-bold-text loyalty-btn">Система лояльности</a>
                <router-link class="cart-wrap" :to="{name: 'cart'}">
                    <img :src="'/icons_header/cart-icon.svg'" alt="Корзина" >
                    <span class="upper-bold-text">{{ currentOrderCount }}</span>
                </router-link>
            </div>
        </div>
        <div class="burger-wrap" @click="openDropMenu()">
            <img src="/icons_header/bento-menu-icon.svg" alt="Меню">
        </div>
        <Transition name="slide">
            <MainDropMenuComponent v-if="isOpenDropMenu" @close-menu="isOpenDropMenu = false"/>
        </Transition>
        <Transition name="slide-fade">
            <SimpleModalWindowComponent 
                v-if="allTowns && isOpenModal" 
                :title="modalInfo.title" 
                :description="modalInfo.description"
                :name-first-btn="allTowns[0].name"
                :name-second-btn="allTowns[1].name"
                :class-first-btn="modalInfo.classFirstBtn"
                :class-second-btn="modalInfo.classSecondBtn"
                @handlerBtn = "changeTown"
            />
        </Transition>
    </header>
</template>

<script>
import MainDropMenuComponent from './MainDropMenuComponent.vue';
import SimpleModalWindowComponent from './SimpleModalWindowComponent.vue';

export default {
    name: 'HaderComponent',
    components: {
        SimpleModalWindowComponent,
        MainDropMenuComponent
    },
    data() {
        return {
            isOpenModal: false,
            modalInfo: {
                title: 'Выберите ваш город',
                description: 'От города зависят акции и наличие товаров',
                classFirstBtn: 'equal',
                classSecondBtn: 'equal',
            },
            isOpenDropMenu: false,
        }
    },
    methods: {
        openModal() {
            this.isOpenModal = true;
        },
        changeTown(nameTown) {
            this.$store.commit('changeTown', nameTown);
            this.isOpenModal = false;
        },
        openDropMenu() {
            this.isOpenDropMenu = true;
            document.body.style.overflow = 'hidden';
        },
        sendMetrick() {
            if (window !== 'undefined' && window.ym !== 'undefined') {
                window.ym(96864324,'reachGoal','loyalty-click');
            }
        }
    },
    computed: {
        currentTown() {
            return this.$store.state.townState.currentTown;
        },
        currentOrderCount() {
            return this.$store.getters.getOrderCount;
        },
        allTowns() {
            return this.$store.state.townState.allTowns;
        }
    },
    watch: {
        '$route.name' : {
            handler(newValue) {
                if (this.$store.state.townState.isFirstVisit === true && newValue === 'menu') {
                    this.$store.commit('changeFirstVisit');
                    this.openModal();
                }
            }
        }
    },
    mounted() {
        this.$store.commit('installTown');
    }
}

</script>

<style lang="scss" scoped>

header {
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 7;
    padding: 20px 24px 0px 24px;
    background-color: var(--white);

    @media screen and (max-width: $max-tablet) {
        background-color: var(--main-color);
        padding: 16px;
        gap: 24px;
    }
}

.menu-transparent-header {
    background-color: transparent;

    @media screen and (max-width: $max-tablet) {
        background-color: var(--main-color);
    }
}

.suppliers-red-header {
    background-color: var(--main-color);

    @media screen and (max-width: $max-tablet) {
        background-color: var(--main-color);
    }
}

.team-red-header {
    background-color: var(--main-color);

    @media screen and (max-width: $max-tablet) {
        background-color: var(--main-color);
    }
}

.left-header-wrap {
    display: flex;
    gap: 28px;
    align-items: center;

    @media screen and (max-width: $max-tablet) {
        width: 100%;
        justify-content: space-between;
    }
}

.logo-wrap {
    display: flex;
    align-items: center;
    gap: 16px;
    border-radius: 32px;
    background-color: var(--main-color);
    padding: 16px 32px 16px 24px;

    @media screen and (max-width: $max-tablet) {
        padding: 0;
        gap: 8px;
    }

    img:first-child {
        @media screen and (max-width: $max-tablet) {
            height: 24px;
        }
    }

    img:last-child {
        @media screen and (max-width: $max-tablet) {
            height: 18px;
        }
    }
}


.location-wrap {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    padding: 10px;
    border-radius: 18px;

    @media screen and (max-width: $max-tablet) {
        padding: 0;
        border-radius: 0;
    }

    .upper-bold-text {
        color: var(--main-color);

        @media screen and (max-width: $max-tablet) {
            color:var(--white);
            font-size: 12px;
        }
    }

    svg {
        width: 24px;
        height: 24px;

        @media screen and (max-width: $max-tablet) {
            width: 16px;
            height: 16px;

            path {
                stroke: var(--white);
            }
        }
    }
}

.location-home-border {
    background-color: rgba(244, 254, 255, 0.8);

    @media screen and (max-width: $max-tablet) {
        padding: 0;
        border-radius: 0;
        background-color: transparent;
    }
}

.location-sup-white {

    .upper-bold-text {
        color: var(--white);
    }

    svg {
        path {
            stroke: var(--white);
        }
    }
}

.location-team-white {

.upper-bold-text {
    color: var(--white);
}

svg {
    path {
        stroke: var(--white);
    }
}
}

.right-header-wrap {
    display: flex;
    align-items: center;
    border-radius: 32px;
    background-color: var(--main-color);
    padding: 16px 32px 16px 24px;
    gap: 16px;

    @media screen and (max-width: $max-tablet) {
        display: none;
    }
}

.burger-wrap {
    display: none;

    @media screen and (max-width: $max-tablet) {
        display: block;
    }
}


.main-navigation {
    display: flex;
    gap: 12px;
    .upper-bold-text {
        text-decoration: none;
        border-radius: 12px;
        padding: 6px 12px;
        color: var(--white);

        &:hover {
            background-color: var(--white);
            transition: all 0.4s ease-in-out;
            color: var(--main-color);
        }
    }
    .active {
        background-color: var(--white);
        color: var(--main-color);
    }
}

.add-link {
    display: flex;
    align-items: center;
    gap: 24px;
    .loyalty-btn {
        color: var(--main-color);
        padding: 16px 32px;
        background-color: var(--white);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        white-space: nowrap;
    }
    .cart-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;

        .upper-bold-text {
            color: var(--main-color);
            position: absolute;
            left: 50%;
            bottom: -10%;
            transform: translate(-50%, -50%);
        }
    }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}

</style>