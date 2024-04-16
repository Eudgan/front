<template>
    <span class="upper-bold-text">Уровень сладости</span>
        <input v-model="localValue" type="range" min="0" max="4" step="1">
    <div class="range">
    <span class="footnote">0</span>
    <span class="footnote">1</span>
    <span class="footnote">2</span>
    <span class="footnote">3</span>
    <span class="footnote">4</span>
    </div>
</template>

<script>

export default {
    name: 'RangeComponent',
    props: {
        modelValue: String,
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

input[type="range"]{
	appearance: none;
	-moz-appearance: none;
	-webkit-appearance: none;
	background: transparent;
	cursor: pointer;
}

.range {
    display: flex;
    justify-content: space-between;

    span {
        user-select: none;
    }
}

    /***** Стили дорожки *****/
/***** Chrome, Safari, Opera и Edge Chromium *****/
input[type="range"]::-webkit-slider-runnable-track {
    background: var(--shade_1);
    height: 4px;
}

/******** Firefox ********/
input[type="range"]::-moz-range-track {
    background: var(--shade_1);
    height: 4px;
}

    /***** Стили ползунка *****/
/***** Chrome, Safari, Opera и Edge Chromium *****/
input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    margin-top: -8px; /* Центрируем ползунок на дорожке */
    background-color: var(--white);
    height: 18px;
    width: 18px;
    border-radius: 20px;   
    border: 2px solid var(--shade_1); 
}

/***** Firefox *****/
input[type="range"]::-moz-range-thumb {
    appearance: none;
    background-color: var(--white);
    height: 18px;
    width: 18px;
    border-radius: 20px;   
    border: 2px solid var(--shade_1); 
}

</style>