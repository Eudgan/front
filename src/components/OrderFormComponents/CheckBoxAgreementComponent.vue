<template>
    <label>
        <input type="checkbox" value="agreement" v-model="localValue" required>
        <span class="footnote-text">Даю согласие на обработку персональных данных</span>
    </label>
</template>

<script>

export default {
    name: 'CheckBoxAgreementComponent',
    props: {
        modelValue: Boolean,
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
}

</script>

<style lang="scss" scoped>

label {
    display: flex;
    align-items: center;
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
    padding-right: 36px;
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

</style>