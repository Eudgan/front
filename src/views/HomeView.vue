<template>
    <Transition>
        <PreloaderComponent v-if="isLoading" />
    </Transition>
    <main>
        <section class="hero">
            <h1 class="main-title">современная<br> чайная</h1>
            <img src="/home_page_photos/imageFirst.webp" alt="Девушки с чаем QUUA">
            <div class="hero-info">
                <div class="hero-text-wrap">
                    <p>Мы создаем</p>
                    <div class="spin-wrap">
                        <p>напитки</p>
                        <div class="words">
                            <span class="pink-text">для души</span>
                            <span class="green-text">для себя</span>
                            <span class="pink-text">для настроения</span>
                            <span class="pink-text">для души</span>
                        </div>
                    </div>
                </div>
                <a href="https://m1.iiko.cards/ru-RU/L/021539" target="_blank" @click="sendMetrick" class="upper-bold-text loyalty-btn">вступить в систему лояльности</a>
            </div>
        </section>
        <section class="about">
            <div class="top-about">
                <img src="/home_page_photos/about-photo.webp" alt="Ребенок с корзинкой">
                <div class="about-info">
                    <h2 class="about-title">Мы — Quua, готовим самый вкусный чай для вас:)</h2>
                    <p class="body_2-text">Создаваемые&nbsp;нами напитки включают в&nbsp;себя характеристики свежести только лучших ингредиентов, уникальности нашего подхода, натуральности, эстетики и&nbsp;красоты</p>
                    <p class="body_2-text">Современная чайная&nbsp;- процессы и&nbsp;вибрации в&nbsp;рамках заведения интегрируют в&nbsp;себя современный ритм жизни, моды, вкуса и&nbsp;чувств</p>
                </div>
            </div>
            <div class="advantages">
                <h3 class="h1">Что такое QUUA?</h3>
                <AdvantagesListComponent :is-flex="true" :text-data="advantagesData" />
            </div>
        </section>
        <section class="catalog">
            <div class="background-img-top">
            </div>
            <h3 class="h1">чем мы можем<br> вас удивить?</h3>
            <ul>
                <li v-for="(product, index) in productData" :key="index">
                    <ProductDescriptionItem 
                        :photo="product.photo"
                        :title="product.title"
                        :subtitle="product.subtitle"
                        :description="product.description"
                    />
                </li>
            </ul>
            <div class="background-img-bottom"></div>
        </section>
        <section class="contacts">
            <h3 class="h1">приходите в гости</h3>
            <template v-for="(town, index) in $store.state.townState.allTowns" :key="town">
                <ContactInfoComponent v-if="$store.state.townState.allTowns && index % 2 === 0" :town-data="town" :reverse="true" />
                <ContactInfoComponent v-else :town-data="town" />
            </template>
        </section>
        <section class="loyalty">
            <div class="about-loyalty-wrap">
                <div class="loyalty-info">
                    <h3 class="h1">система<br> лояльности</h3>
                    <AdvantagesListComponent :is-grid="true" :text-data="loyaltyData" />
                </div>
                <div class="img-wrap">
                    <img src="/home_page_photos/imageLoyal.webp" alt="Телефон с приложением лояльности">
                </div>
            </div>
            <div class="how-work-wrap">
                <div class="how-work-title-wrap">
                    <div class="how-work-title">Как&nbsp;это работает?</div>
                    <a href="https://m1.iiko.cards/ru-RU/L/021539" target="_blank" @click="sendMetrick" class="upper-bold-text desktop-loyalty-btn">зарегистрироваться</a>
                </div>
                <div class="percent-block-wrap">
                    <div class="percent-block">
                        <div class="percent-text">
                            <span class="subheader-text">Первый уровень</span>
                            <span class="body-text">При&nbsp;сумме трат до&nbsp;10&nbsp;000₽ размер кешбэка&nbsp;—&nbsp;5%</span>
                        </div>
                        <img src="/home_page_photos/arrows/lowerArrow.png" class="arrow-img" alt="Стрелка вправо">
                        <img src="/home_page_photos/percent_photos/5_percent.png" alt="пять процентов">
                    </div>
                    <div class="percent-block">
                        <div class="percent-text">
                            <span class="subheader-text">Второй уровень</span>
                            <span class="body-text">При&nbsp;сумме трат до&nbsp;20&nbsp;000₽ размер кешбэка&nbsp;—&nbsp;7%</span>
                        </div>
                        <img src="/home_page_photos/arrows/upperArrow.png" class="arrow-img" alt="Стрелка вправо">
                        <img src="/home_page_photos/percent_photos/7_percent.png" alt="семь процентов">
                    </div>
                    <div class="percent-block">
                        <div class="percent-text">
                            <span class="subheader-text">Третий уровень</span>
                            <span class="body-text">При&nbsp;сумме трат от&nbsp;20&nbsp;000₽ размер кешбэка&nbsp;—&nbsp;10%</span>
                        </div>
                        <img src="/home_page_photos/percent_photos/10_percent.png" alt="десять процентов">
                    </div>
                </div>
                <a href="https://m1.iiko.cards/ru-RU/L/021539" target="_blank" @click="sendMetrick" class="upper-bold-text mobile-loyalty-btn">зарегистрироваться</a>
            </div>
        </section>
    </main>
</template>

<script>
import AdvantagesListComponent from "@/components/HomeComponents/AdvantagesListComponent.vue";
import ProductDescriptionItem from "@/components/HomeComponents/ProductDescriptionItem.vue";
import ContactInfoComponent from "@/components/HomeComponents/ContactInfoComponent.vue";
import PreloaderComponent from '../components/PreloaderComponent.vue';


export default {
    name: 'HomeView',
    components: {
        AdvantagesListComponent,
        ProductDescriptionItem,
        ContactInfoComponent,
        PreloaderComponent,
    },
    data() {
        return {
            heroGap: null,
            advantagesData: [
              'вкусненький чай', 'ваше хорошее настроение', 'энергия на весь день', 'ваш второй дом'  
            ],
            productData: [
                {
                    photo: 'bubble',
                    title: 'bubble',
                    subtitle: 'основная категория заведения',
                    description: `Основная чайная категория нашего заведения, все\u00A0напитки из\u00A0которой идут вместе c\u00A0тапиокой. Здесь представлены как\u00A0классические молочные вкусы, так\u00A0и\u00A0яркие фруктовые`
                },
                {
                    photo: 'fruit',
                    title: 'fruit',
                    subtitle: 'категория фруктовых чаев',
                    description: 'Самая освежающая категория нашего меню, \u00A0в\u00A0которой представлены уникальные сочетания\u00A0чая \u00A0и\u00A0свежих фруктов'
                },
                {
                    photo: 'plus',
                    title: 'plus',
                    subtitle: 'нежные молочные сочетания',
                    description: 'Категория молочно-фруктовых вкусов на\u00A0основе чая, матчи и\u00A0таро'
                },
                {
                    photo: 'coffee',
                    title: 'coffee',
                    subtitle: 'твоя бодрость на кофейной основе',
                    description: 'Категория c\u00A0авторскими кофейными напитками. Довольно уникальная комбинация, свежий взгляд на\u00A0кофейную\u00A0культуру'
                },
                {
                    photo: 'special',
                    title: 'season’s special',
                    subtitle: 'уникальные сезонные предложения',
                    description: 'Категория, где\u00A0вы обнаружите уникальные сезонные\u00A0чаи, меняющиеся вместе c\u00A0каждым\u00A0сезоном\u00A0года'
                },
            ],
            loyaltyData: [
                'Начисление происходит моментально', 'Пользуйтесь бонусами в любом городе', 'Приветственный бонус при регистрации', 'Оплатить бонусами можно 50% стоимости заказа'
            ],
            isLoading: true,
        }
    },
    methods: {
        hideLoader() {
            this.isLoading = false;
        },
        sendMetrick() {
            if (window !== 'undefined' && window.ym !== 'undefined') {
                window.ym(96864324,'reachGoal','loyalty-click');
            }
        }
    },
    mounted() {
        const viewportHeight = window.innerHeight;

        if (viewportHeight > 900) {
            this.heroGap = '130px';
        } else if (viewportHeight < 900 && viewportHeight > 800) {
            this.heroGap = '100px';
        } else if (viewportHeight < 800 && viewportHeight > 700) {
            this.heroGap = '50px';
        } else {
            this.heroGap = '0';
        }

        setTimeout(this.hideLoader, 2000);
    }
}

</script>

<style lang="scss" scoped>

main {
    margin-top: 32px;
    padding: 0 40px;

    @media screen and (max-width: $max-tablet) {
        padding: 0 24px;
    }

    @media screen and (max-width: $max-mobile) {
        padding: 0 16px;
        margin-top: 24px;
    }

    overflow-y: scroll;
}

main::-webkit-scrollbar {
    display: none;
}

.hero {
    padding: 31px 0 0 0;
    position: relative;
    display: flex;
    height: 874px;
    flex-direction: column;
    gap: v-bind(heroGap);
    margin-bottom: 112px;

    @media screen and (max-width: $max-tablet) {
        margin-bottom: 0;
    }

    @media screen and (max-width: $max-mobile) {
        padding: 0;
        gap: 0;
        margin-bottom: 42px;
        height: auto;
    }

    .main-title {
        color: var(--main-color);
        font-family: "Futurespore";
        font-size: clamp(8.75rem, -2.5rem + 14.0625vw, 14.375rem);
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: uppercase;

        @media screen and (max-width: $max-tablet) {
            font-size: clamp(5rem, -1.5753rem + 13.6986vw, 9.375rem);
        }

        @media screen and (max-width: $max-mobile) {
            font-size: clamp(3.1875rem, -0.2747rem + 15.8273vw, 7.3125rem);
        }
    }

    img {
        position: absolute;
        right: -40px;
        top: -5px;

        @media screen and (max-width: $max-tablet) {
            right: -24px;
            width: 524px;
            height: auto;
        }

        @media screen and (max-width: $max-mobile) {
            position: static;
            align-self: flex-end;
            margin-top: -70px;
            margin-right: -16px;
            width: calc(100% - 50px);
            height: auto;
        }
    }

    .hero-info {
        display: flex;
        flex-direction: column;
        gap: 32px;

        @media screen and (max-width: 1366px) and (min-width: 1280px) {
            gap: 0;
        }

        @media screen and (max-width: $max-mobile) {
            gap: 16px;
        }

        .loyalty-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 16px 24px;
            border-radius: 16px;
            background-color: var(--main-color);
            color: var(--white);
            max-width: 352px;
            transition: all 0.4s ease;

            &:hover {
                background-color: var(--main-dark-color);
            }

            @media screen and (max-width: $max-tablet) {
                max-width: 300px;
                padding: 16px;
                font-size: 14px;
            }

            @media screen and (max-width: $max-mobile) {
                max-width: 100%;
                padding: 16px;
                font-size: 14px;
            }
        }
    }
    .hero-text-wrap {
        font-size: clamp(1.5rem, -1.5rem + 3.75vw, 3rem);
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        .green-text {
            color: var(--accent-color);
        }
        .pink-text {
            color: var(--main-dark-color);
        }
    }
}

.about {
    display: flex;
    flex-direction: column;
    gap: 134px;
    margin-bottom: 80px + 176px;

    @media screen and (max-width: $max-mobile) {
        flex-direction: column;
        gap: 64px;
        margin-bottom: 150px;
    }
}

.top-about {
    display: flex;
    gap: 64px;
    align-items: center;

    @media screen and (max-width: $max-tablet) {
        gap: 30px;
    }

    @media screen and (max-width: $max-mobile) {
        flex-direction: column;
        gap: 24px;
    }

    img {
        width: 50%;
        height: auto;

        @media screen and (max-width: $max-mobile) {
            width: 100%;
        }

    }

    .about-info {
        display: flex;
        flex-direction: column;
        gap: 47px;

        @media screen and (max-width: $max-tablet) {
            gap: 26px;
        }

        .about-title {
            font-size: 48px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;

            @media screen and (max-width: $max-tablet) {
                font-size: 24px;
                line-height: 32px;
            }
        }

        .body_2-text {
            @media screen and (max-width: $max-tablet) {
                font-size: 16px;
                line-height: 20px;
            }
        }
    }
}

.advantages {
    display: flex;
    flex-direction: column;
    gap: 70px;
    align-items: center;

    @media screen and (max-width: $max-mobile) {
        gap: 26px;
    }

    .h1 {
        color: var(--main-color);
    }
}

.catalog {
    margin-left: -40px;
    margin-right: -40px;
    display: flex;
    flex-direction: column;
    gap: 64px;
    padding: 0 40px;
    background-color: var(--main-color);
    margin-bottom: 250px + 134px;

    @media screen and (max-width: $max-tablet) {
        margin-left: -24px;
        margin-right: -24px;
        padding: 0 24px;
        margin-bottom: 220px;
    }

    @media screen and (max-width: $max-mobile) {
        margin-left: -16px;
        margin-right: -16px;
        padding: 0 16px;
        gap: 32px;
        margin-bottom: 48px + 80px;
    }

    .background-img-top {
        margin-left: -40px;
        margin-right: -40px;
        margin-top: -170px;
        height: 176px;
        background-image: url(../../public/background/bckgrColor_top.png);
        background-size: 100% auto;

        @media screen and (max-width: $max-tablet) {
            margin-left: -24px;
            margin-right: -24px;
        }

        @media screen and (max-width: $max-mobile) {
            margin-left: -16px;
            margin-right: -16px;
            margin-top: -80px;
            height: 81px;
        }
    }

    .background-img-bottom {
        margin-left: -40px;
        margin-right: -40px;
        height: 301px;
        margin-bottom: -300px;
        background-image: url(../../public/background/bckgrColor_bottom.png);
        background-size: 100% auto;

        @media screen and (max-width: $max-tablet) {
            margin-left: -24px;
            margin-right: -24px;
        }

        @media screen and (max-width: $max-mobile) {
            margin-left: -16px;
            margin-right: -16px;
            height: 116px;
            margin-bottom: -110px;
        }
    }

    .h1 {
        color: var(--white);
    }

    ul {
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-content: space-between;
        row-gap: 70px;

        @media screen and (max-width: $max-mobile) {
            display: flex;
            flex-direction: column;
            gap: 40px;
        }

        li {
            display: flex;
            justify-content: center;
        }

        li:last-child {
            grid-column: 1 / 3;
            place-self: center;
            width: 60%;

            @media screen and (max-width: $max-mobile) {
                display: flex;
                width: 100%;
            }
        }
    }
}

.contacts {
    display: flex;
    flex-direction: column;
    gap: 80px;
    margin-bottom: 134px;

    @media screen and (max-width: $max-mobile) {
        gap: 24px;
        margin-bottom: 64px;
    }

    .h1 {
        color: var(--main-color);
    }
}

.loyalty {
    display: flex;
    flex-direction: column;
    gap: 156px;
    margin-bottom: 165px;

    @media screen and (max-width: $max-mobile) {
        gap: 30px;
        margin-bottom: 64px;
    }
}

.about-loyalty-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: $max-mobile) {
        flex-direction: column-reverse;
    }

    .loyalty-info {
        width: 47%;
        display: flex;
        flex-direction: column;
        gap: 55px;

        @media screen and (max-width: $max-mobile) {
            align-items: center;
        }
        
        .h1 {
            color: var(--main-color);
        }
    }

    .img-wrap {
        width: 45%;
        height: auto;

        @media screen and (max-width: $max-mobile) {
            width: 100%;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }
}

.how-work-wrap {
    display: flex;
    gap: 40px;

    @media screen and (max-width: $max-tablet) {
        flex-direction: column;
    }

    .mobile-loyalty-btn {
        padding: 16px 24px;
        max-width: 100%;
        border-radius: 16px;
        background-color: var(--main-color);
        text-align: center;
        color: var(--white);
        display: none;

        &:hover {
            background-color: var(--main-dark-color);
        }

        @media screen and (max-width: $max-mobile) {
            display: block;
        }
    }
}

.how-work-title-wrap {
    display: flex;
    flex-direction: column;
    gap: 24px;

    .how-work-title {
        font-size: 48px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;

        @media screen and (max-width: $max-mobile) {
            font-size: 24px;
            line-height: 32px;
        }
    }

    .desktop-loyalty-btn {
        padding: 16px 24px;
        max-width: 310px;
        border-radius: 16px;
        background-color: var(--main-color);
        text-align: center;
        color: var(--white);

        &:hover {
            background-color: var(--main-dark-color);
        }

        @media screen and (max-width: $max-mobile) {
            display: none;
        }
    }
}

.percent-block-wrap {
    display: flex;
    gap: 40px;
    width: 100%;
    
    @media screen and (max-width: $max-tablet) {
        flex-direction: column;
    }

    @media screen and (max-width: $max-mobile) {
        gap: 16px;
    }

    .percent-block {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 32px;
        width: 32%;
        height: 300px;
        border-radius: 32px;
        background-color: var(--shade_1);
        position: relative;

        @media screen and (max-width: $max-tablet) {
           width: 100%;
           flex-direction: row;
           justify-content: space-between;
           align-items: center;
           padding: 20px;
           height: auto;
        }

        &:first-child {

            .arrow-img {
                position: absolute;
                bottom: -90px;
                right: -130px;

                @media screen and (max-width: $max-tablet) {
                    display: none;
                }
            }
        }

        &:nth-child(2) {
            .arrow-img {
                position: absolute;
                top: -80px;
                right: -130px;

                @media screen and (max-width: $max-tablet) {
                    display: none;
                }
            }
        }

        .percent-text {
            display: flex;
            flex-direction: column;
            gap: 8px;

            .subheader-text {
                @media screen and (max-width: $max-mobile) {
                    font-size: 16px;
                    line-height: 22px;
                }
            }

            .body-text {
                display: block;

                @media screen and (max-width: $max-mobile) {
                    font-size: 14px;
                    line-height: 20px;
                }
            }
        }

        img:last-child {
            position: absolute;
            bottom: 0;
            right: 0;
            border-radius: 32px;

            @media screen and (max-width: $max-tablet) {
                position: static;
                margin-right: -20px;
                max-width: 30%;
                border-radius: 8px;
            }
        }
    }
}

.h1 {
    @media screen and (max-width: $max-tablet) {
        font-size: 72px;
    }

    @media screen and (max-width: $max-mobile) {
        font-size: 48px;
        text-align: center;
        line-height: 40px;
    }
}

/* -------------------------------------------------------------------------- */
/*                                  Анимация                                  */
/* -------------------------------------------------------------------------- */
.spin-wrap {
    display: flex;
    gap: 13px;
    height: 56px;
    .words {
        overflow: hidden;
    }
    span {
        display: block;
        height: 100%;
        animation: spin_words 6s infinite;

        @keyframes spin_words {
            15% {
                transform: translateY(-100%);
            }

            30% {
                transform: translateY(-100%);
            }

            45% {
                transform: translateY(-200%);
            }

            60% {
                transform: translateY(-200%);
            }

            75% {
                transform: translateY(-300%);
            }

            100% {
                transform: translateY(-300%);
            }
        }
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