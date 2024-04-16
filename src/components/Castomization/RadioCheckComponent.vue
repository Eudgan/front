<template>
    <div class="title-wrap">
        <span class="upper-bold-text">{{ title }}</span>
        <span @click="localValue = null" class="footnote-text desktop-cancel-btn">Отменить выбор</span>
        <span @click="localValue = null" class="footnote-text mobile-cancel-btn">Отменить</span>
    </div>
    <div class="check-wrap-item">
        <label class="footnote-text" v-for="(item, index) in radioData" :key="index">
            <input v-model="localValue" type="radio" :name="nameRadio" :value="item">
            <span>{{ item.name }}</span>
            <span>+{{ item.cost.split('.')[0] }}&#8381;</span>
        </label>
    </div>
</template>

<script>

export default {
    name: 'RadioCheckComponent',
    props: {
        title: String,
        radioData: Array,
        modelValue: {},
    },
    data() {
        return {
            nameRadio: null,
        }
    },
    emits: ['update:modelValue'],
    computed: {
        localValue: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        }
    },
    watch: {
        radioData: {
            handler(newValue) {
                if (this.localValue) {
                    this.localValue = newValue.find(obj => obj.id === this.localValue.id);
                }
            }
        }
    },
    mounted() {
        if (this.title === 'Альтернативное молоко') {
            this.nameRadio = 'milk';
        } else {
            this.nameRadio = 'syrup';
        }
    }
}

</script>

<style lang="scss" scoped>
.title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .footnote-text {
        color: var(--shade_3);
        user-select: none;
        cursor: pointer;

        &:hover {
            transition: all 0.3s ease;
            filter:brightness(70%);
        }

        &:active {
            filter:brightness(40%);
        }
    }

    .desktop-cancel-btn {
        @media screen and (max-width: $max-mobile) {
            display: none;
        }
    }

    .mobile-cancel-btn {
        display: none;

        @media screen and (max-width: $max-mobile) {
            display: inline;
        }
    }
}
.check-wrap-item {
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;

    label {
        display: flex;
        align-items: center;
        gap: 16px;
        user-select: none;
        cursor: pointer;
    }

    input[type="radio"] {
        margin: 0;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        vertical-align: top;
        outline: none;
        transition: background 0.3s ease;
        background-color: var(--shade_1);
        border: 4px solid var(--shade_1);
        border-radius: 16px;
        cursor: pointer;
    }

    input[type="radio"]:checked {
        background-color: var(--main-color);
        border-radius: 16px;
        border: 4px solid var(--shade_1);
    }

    @media (hover: hover) {
        input[type="radio"]:hover {
            filter: brightness(90%);
        }
    }

    @media (hover: none) {
        input[type="radio"]:active {
            filter: brightness(80%);
        }
    }

    input[type="radio"]:disabled {
        cursor: default;
        filter: grayscale(100%);
        opacity: 0.6;
    }
}

</style>