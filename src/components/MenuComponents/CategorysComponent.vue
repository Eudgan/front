<template>
    <div class="categorys-wrap">
        <ul class="categorys">
            <li v-for="item in categorysData" :key="item.id">
                <a @click="scrollTo(item.name, index)" class="category-item"> 
                    <img class="icon-category" :src="item.image" :alt="item.name" width="32" height="32">
                    <span class="body-text">{{ item.name.toUpperCase() }}</span>
                </a>
            </li>
        </ul>
        <a :href="`https://eda.yandex.ru/${englishCurrentTown}/r/quua`" target="_blank" class="yandex-link">
            <img src="../../assets/category_icons/yandex-icon.svg" alt="Логотип Яндекс">
            Доставка
            <img src="../../assets/category_icons/share-icon.svg" alt="Иконка поделиться">
        </a>
    </div>
</template>

<script>

export default {
    name: 'CategorysComponent',
    props: {
        categorysData: Array,
        currentTown: String,
    },
    data() {
        return {
            englishCurrentTown: null,
            activeCategory: [],
        }
    },
    watch: {
        currentTown: {
            handler(newTown) {
                if (newTown === 'Томск') {
                    this.englishCurrentTown = 'tomsk';
                } else {
                    this.englishCurrentTown = 'sochi';
                }
            }
        },
    },
    methods: {
        scrollTo(name) {
            const element = document.getElementById(name.toUpperCase());
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },
    },
    mounted() {
        if (this.currentTown === 'Томск') {
            this.englishCurrentTown = 'tomsk';
        } else {
            this.englishCurrentTown = 'sochi';
        }
    },
}

</script>

<style lang="scss" scoped>
.categorys-wrap {
    display: flex;
    justify-content: space-between;
    gap: 32px;
    position: sticky;
    top: 104px;
    background-color: var(--white);
    z-index: 2;
    padding-top: 32px;
    padding-bottom: 24px;
    margin-bottom: 32px;

    @media screen and (max-width: $max-tablet) {
        top: 56px;
        padding-top: 12px;
        padding-bottom: 12px;
        margin-bottom: 16px;
    }
}
.categorys {
    display: flex;
    gap: 12px;
    overflow-x: auto;

    &::-webkit-scrollbar {
        height: 5px;
    }
    .category-item {
        padding: 11px 16px;
        display: flex;
        gap: 16px;
        border-radius: 16px;
        background-color: var(--shade_1);
        align-items: center;
        text-decoration: none;
        user-select: none;
        transition: all 0.4s ease;
        cursor: pointer;

        .icon-category {
            width: 32px;
            height: 32px;

            @media screen and (max-width: $max-mobile) {
                width: 24px;
                height: 24px;
            }
        }

        .body-text {
            color: var(--black);
            white-space: nowrap;

            @media screen and (max-width: $max-mobile) {
                font-size: 14px;
                line-height: 20px;
            }
        }

        @media (hover: hover) {
            &:hover {
                background-color: var(--main-color);

                .body-text {
                    color: var(--white);
                }
                .icon-category {
                    filter: brightness(140%);
                }
            }
        }

        @media (hover: none) {
            &:active {
                background-color: var(--main-color);
                
                .body-text {
                    color: var(--white);
                }
                .icon-category {
                    filter: brightness(140%);
                }
            }
        }
    }

    .active {
        background-color: var(--main-color);

        .body-text {
            color: var(--white);
        }
        .icon-category {
            filter: brightness(140%);
    }
}
}

.active {
    background-color: black;
    .body-text {
        color: var(--white);
    }
    .icon-category {
        filter: brightness(140%);
    }
}

.yandex-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    border-radius: 16px;
    background-color: var(--yandex);
    text-decoration: none;
    padding: 11px 16px;
    color: var(--black);

    @media screen and (max-width: $max-mobile) {
        display: none;
    }
}
</style>