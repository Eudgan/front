<template>
    <span class="upper-bold-text">Добавки</span>
    <div class="check-wrap-item">
        <label class="footnote-text checkbox" v-for="item in additives" :key="item.id">
            <input v-model="localValue" type="checkbox" name="additives" :value="item">
            <div class="checkbox-text">
                <span>{{ item.name }}</span>
                <span>+{{ item.cost.split('.')[0] }}&#8381;</span>
            </div>
        </label>
    </div>
</template>

<script>

export default {
    name: 'CheckboxComponent',
    props: {
        additives: Array,
        modelValue: Array,
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
        additives: {
            handler(newValue) {
                if (this.localValue.length !== 0) {
                    let newAdditives = [];
                    for (let additive of this.localValue) {
                        newAdditives.push(newValue.find(obj => obj.id === additive.id)); 
                    }
                    this.localValue = newAdditives;
                }
            }
        }
    }
}

</script>

<style class="scss" scoped>

.check-wrap-item {
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
}

.checkbox {
    display: flex;
    align-items: center;
    gap: 16px;
}

input[type="checkbox"] {
    margin: 0;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    height: 20px;
    vertical-align: top;
    outline: none;
    transition: background 0.3s ease;
    background: url(/public/icons_common/state-square-off-icon.svg) 0 0 no-repeat;;
    cursor: pointer;
}

input[type="checkbox"]:checked {
    background-image: url(/public/icons_common/state-square-on-icon.svg);
}

@media (hover: hover) {
    input[type="checkbox"]:hover {
        filter: brightness(90%);
    }
}

@media (hover: none) {
    input[type="checkbox"]:active {
        filter: brightness(80%);
    }
}

input[type="checkbox"]:disabled {
    cursor: default;
    filter: grayscale(100%);
    opacity: 0.6;
}

.checkbox-text {
    display: flex;
    gap: 16px;
}

</style>