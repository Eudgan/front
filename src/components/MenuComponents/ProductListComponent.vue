<template> 
    <div class="category-wrap" v-for="item in categoryDishesData" :key="item.id"> 
        <h2 :id="item.name.toUpperCase()" class="h1"> {{ item.name }} </h2>
        <ul>
            <template v-for="dish in item.dishes" :key="dish.id">
            <li v-if="dish && dish.cost">
                <ProductItemComponent :dishData="dish" />
            </li>
            </template>
        </ul>
    </div>
</template>

<script>
import ProductItemComponent from './ProductItemComponent.vue';

    export default {
        name: 'ProductListComponent',
        components: {
            ProductItemComponent,
        },
        props: {
            categoryDishesData: Array,
            categoryId: String,
        },
        data() {
            return {
                rusRegex: /^[а-яА-ЯёЁ\s]+$/,
            }
        },
        mounted() {
            let categoryId = document.getElementById(this.categoryId.toUpperCase());
            if (categoryId) {
                categoryId.scrollIntoView({ behavior: 'smooth',
                                            inline: 'nearest' 
                });
            }
        }
    }

</script>

<style lang="scss" scoped>
.category-wrap {
    display: flex;
    flex-direction: column;
    gap: 40px;

    @media screen and (max-width: $max-mobile) {
        gap: 16px;
    }

    .h1 {
        text-decoration: uppercase;
        color: var(--main-color);
        scroll-margin-top: 200px;

        @media screen and (max-width: $max-tablet) {
            scroll-margin-top: 150px;
        }

        @media screen and (max-width: $max-mobile) {
            font-size: 48px;
            line-height: 40px;
            scroll-margin-top: 130px;
        }
    }
}

ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    margin-bottom: 48px;

    @media screen and (max-width: $max-tablet) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (max-width: $max-mobile) {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 32px;
    }
}

</style>