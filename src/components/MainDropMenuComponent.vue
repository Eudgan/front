<template>
    <div class="modal-wrap">
        <div class="navigation-wrap">
            <img @click="closeMenu()" class="close-btn" src="/icons_header/cross-menu-icon.svg" alt="closeBtn" width="24" height="24">
            <nav class="main-navigation">
                <router-link @click="closeMenu()" class="subheader-text" :class="{'active': $route.name === 'home'}" :to="{name: 'home'}">
                    Главная
                </router-link>
                <router-link @click="closeMenu()" class="subheader-text" :class="{'active': $route.name === 'menu'}" :to="{name: 'menu'}">
                    Меню
                </router-link>
                <router-link @click="closeMenu()" class="subheader-text" :class="{'active': $route.name === 'team'}" :to="{name: 'team'}">
                    Команда
                </router-link>
                <router-link @click="closeMenu()" class="subheader-text" :class="{'active': $route.name === 'suppliers'}" :to="{name: 'suppliers'}">
                    Поставщикам
                </router-link>
                <router-link @click="closeMenu()" class="subheader-text" :class="{'active': $route.name === 'cart'}" :to="{name: 'cart'}">
                    Корзина
                </router-link>
            </nav>
            <div class="add-links">
                <a href="https://m1.iiko.cards/ru-RU/L/021539" @click="sendMetrick" target="_blank" class="subheader-text">
                    Система лояльности
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" stroke="#111010" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
                <a v-if="currentTown.name === 'Томск'" :href="`https://eda.yandex.ru/tomsk/r/quua`" target="_blank" class="subheader-text">
                    Яндекс.Еда
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" stroke="#111010" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
                <a v-else :href="`https://eda.yandex.ru/sochi/r/quua`" target="_blank" class="subheader-text">
                    Яндекс.Еда
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" stroke="#111010" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'MainDropMenuComponent',
    emits: ['close-menu'],
    data() {
        return {
            englishCurrentTown: null,
        }
    },
    methods: {
        closeMenu() {
            document.body.style.overflow = 'auto';
            this.$emit('close-menu');
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
        }
    }
}

</script>

<style lang="scss" scoped>

.modal-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 110%;
    background-color: var(--main-color);
    z-index: 100;
}

.navigation-wrap {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .close-btn {
        cursor: pointer;
        margin-bottom: 24px;
    }
}

.main-navigation {
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: end;
    margin-bottom: 64px;

    .subheader-text {
        color: var(--white-transparent);
        transition: all 0.4s ease;

        &:hover {
            color: var(--white);
        }
    }

    .active {
        color: var(--white);
    }
}

.add-links {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-end;

    .subheader-text {
        color: var(--white-transparent);
        display: flex;
        align-items: center;
        gap: 8px;

        svg {
            path {
                stroke: var(--white-transparent);
            }
        }
    }
}

</style>