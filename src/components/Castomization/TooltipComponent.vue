<template>
    <Popper>
        <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M8 7.83333V11.1667M8 14.5C4.68629 14.5 2 11.8137 2 8.5C2 5.18629 4.68629 2.5 8 2.5C11.3137 2.5 14 5.18629 14 8.5C14 11.8137 11.3137 14.5 8 14.5ZM8.0332 5.83333V5.9L7.9668 5.90013V5.83333H8.0332Z" stroke="#A7B5B6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </button>
        <template #content>
            <div class="tooltip">
                <h3 class="footnote-text">Пищевая ценность на 100 грамм:</h3>
                <ul class="footnote-text">
                    <li v-if="energyValue">
                        <span>Ккал</span>
                        <span>{{ energyValue }} ккал</span>
                    </li>
                    <li v-if="proteins">
                        <span>Белки</span>
                        <span >{{ proteins.split('.')[0] }} гр</span>
                    </li>
                    <li v-if="fats">
                        <span>Жиры</span>
                        <span >{{ fats.split('.')[0] }} гр</span>
                    </li>
                    <li v-if="carbohydrates">
                        <span>Углеводы</span>
                        <span>{{ carbohydrates.split('.')[0] }} гр</span>
                    </li>
                </ul>
            </div>
        </template>
    </Popper>
</template>

<script>
import Popper from "vue3-popper";

export default {
    name: 'TooltipComponent',
    components: {
        Popper
    },
    props: {
        energyValue: Number,
        proteins: String,
        fats: String,
        carbohydrates: String
    }
}

</script>

<style lang="scss" scoped>

.tooltip {
    background-color: var(--shade_1);
    border-radius: 16px;
    border: 1px solid var(--shade_3);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    h3 {
        color: var(--shade_3);
        white-space: nowrap;
    }

    ul {
        display: flex;
        flex-direction: column;
        gap: 8px;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .footnote-text:first-child {
        color: var(--shade_4);
    }
}

</style>