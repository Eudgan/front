<template>
    <Transition>
        <PreloaderComponent v-if="isLoading" />
    </Transition>
    <main>
        <AdditionHeroComponent 
            class="hero"
            :title="'QUUA — большая семья, в которой точно найдется место для тебя'"    
            :img="'team'"
            :anchor-link="'#ТИ-МЕЙКЕР'"
            :btn-name="'Посмотреть вакансии'"
        />
        <section class="about">
            <img src="/common_photos/team-about.webp" alt="Ребенок с корзинкой">
            <div class="about-info">
                <h2 class="about-title">Наша команда расширяется с каждым днем</h2>
                <p class="body_2-text">Концепция нашего заведения развилась как реакция на застоявшуюся культуру ежедневных напитков. Чайные напитки предоставляют максимально конкурентно способный продукт переполненному рынку кофе</p>
                <p class="body_2-text">Создаваемые нами напитки включают в себя характеристики свежести только лучших ингредиентов, уникальности нашего подхода, натуральности и эстетики красоты</p>
                <p class="body_2-text">Души не чаю - доброе и открытое отношение к нашим гостям и миру вокруг!</p>
            </div>
        </section>
        <section class="vacancies">
            <div class="vacancy">
                <h2 id="ТИ-МЕЙКЕР" class="h1">ТИ-МЕЙКЕР</h2>
                <div class="vacancy-info">
                    <div class="main-info">
                        <div class="text-wrap">
                            <h3>Мы ищем именно&nbsp;тебя</h3>
                            <p class="body-text">Если ты активный и совершеннолетний, и хочешь работать в гибком графике, то эта должность для тебя. Самурай чайного листа и шариков тапиоки всегда готов предоставить напитки наивысшего качества и вкуса для наших гостей. В наше стремление входит формирование чудесной команды активных ребят, для создания самых уникальных напитков на просторах Сибири!</p>
                        </div>
                        <a v-if="currentTown && currentTown.name === 'Томск'" href="https://docs.google.com/forms/d/1PK4RuOznN2MTnluxSW33b6YxOcT4K520gUwzORCk_4E/viewform?edit_requested=true" target="_blank" class="upper-bold-text desktop-btn btn">откликнуться</a>
                        <a v-else href="https://docs.google.com/forms/d/e/1FAIpQLSedP6CNRzC8d1BrdT-XN7r5ezFv3zSTrha8N00xmXnS-ahxhg/viewform" target="_blank" class="upper-bold-text desktop-btn btn">откликнуться</a>
                    </div>
                    <AdvantagesListComponent class="adv-wrap" :textData="advantagesData" :is-flex-wrap="true" :is-dark-pink="true" :background-color="'#F4FEFF'"/>
                    <a v-if="currentTown && currentTown.name === 'Томск'" href="https://docs.google.com/forms/d/1PK4RuOznN2MTnluxSW33b6YxOcT4K520gUwzORCk_4E/viewform?edit_requested=true" target="_blank" class="upper-bold-text mobile-btn btn">откликнуться</a>
                    <a v-else href="https://docs.google.com/forms/d/e/1FAIpQLSedP6CNRzC8d1BrdT-XN7r5ezFv3zSTrha8N00xmXnS-ahxhg/viewform" target="_blank" class="upper-bold-text mobile-btn btn">откликнуться</a>
                    <img src="/common_photos/tea-maker.webp" alt="Tea-Maker">
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import AdditionHeroComponent from '@/components/AdditionHeroComponent.vue';
import AdvantagesListComponent from '@/components/HomeComponents/AdvantagesListComponent.vue';
import PreloaderComponent from '../components/PreloaderComponent.vue';

export default {
    name: 'TeamView',
    components: {
        AdditionHeroComponent,
        AdvantagesListComponent,
        PreloaderComponent
    },
    data() {
        return {
            advantagesData: [
              'гибкий график', 'вечерний развоз', 'стабильная оплата труда'
            ],
            isLoading: true,
        }
    },
    methods: {
        hideLoader() {
            this.isLoading = false;
        },
    },
    computed: {
        currentTown() {
            return this.$store.state.townState.currentTown;
        }
    },
    mounted() {
        setTimeout(this.hideLoader, 1000);
    }
}

</script>

<style lang="scss" scoped>

main {
    margin-bottom: 48px;
    overflow: hidden;
    padding: 0 40px;

    @media screen and (max-width: $max-tablet) {
        padding: 0 24px;
    }

    @media screen and (max-width: $max-mobile) {
        padding: 0 16px;
    }
}

.hero {
    margin-bottom: 64px;

    @media screen and (max-width: $max-mobile) {
        margin-bottom: 24px;
    }
}

.about {
    display: flex;
    gap: 64px;
    align-items: center;
    margin-bottom: 106px;

    @media screen and (max-width: $max-tablet) {
        gap: 30px;
        margin-bottom: 76px;
    }

    @media screen and (max-width: $max-mobile) {
        flex-direction: column;
        gap: 24px;
        margin-bottom: 48px;
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
                font-size: 36px;
            }

            @media screen and (max-width: $max-mobile) {
                font-size: 24px;
                line-height: 32px;
            }
        }

        .body_2-text {
            @media screen and (max-width: $max-tablet) {
                font-size: 16px;
            }

            @media screen and (max-width: $max-mobile) {
                font-size: 14px;
                line-height: 20px;
            }
        }
    }
}

.vacancy {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-bottom: 100px;

    .h1 {
        color: var(--accent-color);

        @media screen and (max-width: $max-mobile) {
            font-size: 48px;
            line-height: 40px
        }
    }

    .vacancy-info {
        display: flex;
        justify-content: space-between;
        padding: 24px 32px;
        background-color: var(--main-color);
        border-radius: 32px;

        @media screen and (max-width: $max-tablet) {
            flex-direction: column;
            align-items: center;
            gap: 25px;
        }

        .main-info {
            max-width: 32%;
            display: flex;
            flex-direction: column;
            gap: 24px;

            @media screen and (max-width: $max-tablet) {
                max-width: 100%;
            }

            .text-wrap {
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            h3 {
                font-size: 48px;
                font-style: normal;
                font-weight: 700;
                line-height: normal;
                color: var(--white);

                @media screen and (max-width: $max-tablet) {
                    font-size: 32px;
                }
            }

            .body-text {
                color: var(--white);

                @media screen and (max-width: $max-tablet) {
                    font-size: 14px;
                }
            }

            .desktop-btn {
                @media screen and (max-width: $max-tablet) {
                    display: none;
                }
            }
        }

        .mobile-btn {
            display: none;

            @media screen and (max-width: $max-tablet) {
                display: block;
                max-width: 50%;
            }

            @media screen and (max-width: $max-mobile) {
                display: block;
                max-width: 100%;
            }
        }

        .adv-wrap {
            max-width: 28%;
            align-self: center;

            @media screen and (max-width: $max-tablet) {
                max-width: 50%;
            }

            @media screen and (max-width: $max-mobile) {
                max-width: 100%;
            }
        }

        img {
            margin-top: -150px;
            margin-bottom: -152px;
            margin-right: -80px;

            @media screen and (max-width: 1369px) {
                margin-bottom: -157px;
            }

            @media screen and (max-width: $max-tablet) {
                max-width: 375px;
                height: auto;
                margin-top: 50px;
                margin-bottom: -125px;
            } 
            
            @media screen and (max-width: $max-mobile) {
                margin-top: 0;
                margin-right: -30px;
            }
        }
    }
}

.btn {
    display: block;
    width: 100%;
    padding: 16px 0;
    text-align: center;
    background-color: var(--white);
    border-radius: 16px;
    color: var(--main-color);
    transition: all 0.4s ease;

    &:hover {
        filter: brightness(90%);
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


</style>