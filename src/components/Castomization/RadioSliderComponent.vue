<template>
    <div class="radio-wrap-group" v-if="radioArrayTown">
        <template v-for="(item, index) in radioArrayTown" :key="item">
            <input v-model="localValue" type="radio" :id="`${idName}-${index}`" :name="idName" :value="item">
            <label class="body-text btn" :for="`${idName}-${index}`">
                <span>{{ item.street + ` ${item.house}` }}</span>
            </label>
        </template>
    <div :class="{'glider-1': radioArrayTown.length === 1, 'glider-2': radioArrayTown.length === 2, 'glider-3': radioArrayTown.length === 3, 'glider': true}"></div>
    </div>
    <div class="radio-wrap-group" v-if="radioArrayMessenger">
        <template v-for="(item, index) in radioArrayMessenger" :key="item">
            <input v-model="localValue" type="radio" :id="`${idName}-${index}`" :name="idName" :value="item">
            <label class="body-text btn" :for="`${idName}-${index}`">
                <span>{{ item.name }}</span>
            </label>
        </template>
        <div :class="{'glider-1': radioArrayMessenger.length === 1, 'glider-2': radioArrayMessenger.length === 2, 'glider-3': radioArrayMessenger.length === 3, 'glider': true}"></div>
    </div>
    <div class="radio-wrap-group" v-if="radioArrayString">
        <template v-for="(item, index) in radioArrayString" :key="item">
            <input v-model="localValue" type="radio" :id="`${idName}-${index}`" :name="idName" :value="item">
            <label class="body-text btn" :for="`${idName}-${index}`">
                <span>{{ item }}</span>
            </label>
        </template>
        <div :class="{'glider-1': radioArrayString.length === 1, 'glider-2': radioArrayString.length === 2, 'glider-3': radioArrayString.length === 3, 'glider': true}"></div>
    </div>
    <div class="radio-wrap-group" v-if="radioArrayObject">
        <template v-for="(item, index) in radioArrayObject" :key="item">
            <input v-model="localValue" type="radio" :id="`${idName}-${index}`" :name="idName" :value="item">
            <label class="footnote-text btn" :for="`${idName}-${index}`">
                <span>{{ item.meaning.split('.')[0] }}</span>
                <span>{{ unit }}</span>
            </label>
        </template>
        <div :class="{'glider-1': radioArrayObject.length === 1, 'glider-2': radioArrayObject.length === 2, 'glider-3': radioArrayObject.length === 3, 'glider': true}"></div>
    </div>
</template>

<script>

export default {
    name: 'RadioSliderComponent',
    props: {
        radioArrayTown: Array,
        radioArrayMessenger: Array,
        radioArrayObject: Array,
        radioArrayString: Array,
        modelValue: {},
        idName: String,
        unit: String,
        heightBg: {
            type: String,
            default: '32px'
        },
        heightInput: {
            type: String,
            default: '20px'
        },
        heightGlider: {
            type: String,
            default: '28px'
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
}

</script>

<style lang="scss" scoped>
.radio-wrap-group {
    width: 100%;
    height: v-bind(heightBg);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: var(--shade_1);
    border-radius: 20px;
    position: relative;

    .body-text {
        @media screen and (max-width: $max-tablet) {
            font-size: 14px;
            line-height: 20px;
            text-align: center;
        }
    }
        
    input[type="radio"] {
        display: none;
    }
    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: v-bind(heightInput);
        flex: 1 1 0%;
        cursor: pointer;
        border-radius: 20px;
        padding: 4px 0;
        z-index: 5;
        user-select: none;
    }
    .glider {
        position: absolute;
        top: 0px;
        left: 0px;
        bottom: 0px;
        height: v-bind(heightGlider);
        transition: transform 200ms ease-out 0s, width;
        border-radius: 20px;
        background-color: var(--white);
        margin-top: 2px;
        margin-left: 2px;
        box-shadow: 0px 12px 40px -8px rgba(40, 40, 37, 0.50);

        @media screen and (max-width: $max-mobile) {
            border-radius: 18px;
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                                 1 элемента                                 */
    /* -------------------------------------------------------------------------- */
    input[id="volume-0"]:checked ~ .glider-1 {
        transform: translateX(calc(0%));
    }

    input[id="temperature-0"]:checked ~ .glider-1 {
        transform: translateX(calc(0%));
    }

    input[id="messenger-0"]:checked ~ .glider-1 {
        transform: translateX(calc(0%));
    }

    input[id="adress-0"]:checked ~ .glider-1 {
        transform: translateX(calc(0%));
    }

    .glider-1 {
        width: calc(99%);
    }

    /* -------------------------------------------------------------------------- */
    /*                                 2 элемента                                 */
    /* -------------------------------------------------------------------------- */
    input[id="volume-0"]:checked ~ .glider-2 {
        transform: translateX(calc(0%));
    }

    input[id="volume-1"]:checked ~ .glider-2 {
        transform: translateX(calc(100%));
    }

    input[id="temperature-0"]:checked ~ .glider-2 {
        transform: translateX(calc(0%));
    }

    input[id="temperature-1"]:checked ~ .glider-2 {
        transform: translateX(calc(100%));
    }

    input[id="messenger-0"]:checked ~ .glider-2 {
        transform: translateX(calc(0%));
    }

    input[id="messenger-1"]:checked ~ .glider-2 {
        transform: translateX(calc(100%));
    }

    input[id="adress-0"]:checked ~ .glider-2 {
        transform: translateX(calc(0%));
    }

    input[id="adress-1"]:checked ~ .glider-2 {
        transform: translateX(calc(100%));
    }


    .glider-2 {
        width: calc(49.6%);
    }

    /* -------------------------------------------------------------------------- */
    /*                                 3 элемента                                 */
    /* -------------------------------------------------------------------------- */
    input[id="volume-0"]:checked ~ .glider-3 {
        transform: translateX(calc(0%));
    }

    input[id="volume-1"]:checked ~ .glider-3 {
        transform: translateX(calc(100%));
    }

    input[id="volume-2"]:checked ~ .glider-3 {
        transform: translateX(calc(200%));
    }

    input[id="adress-0"]:checked ~ .glider-3 {
        transform: translateX(calc(0%));
    }

    input[id="adress-1"]:checked ~ .glider-3 {
        transform: translateX(calc(100%));
    }

    input[id="adress-2"]:checked ~ .glider-3 {
        transform: translateX(calc(200%));
    }
    .glider-3 {
        width: calc(33.1%);
    }
}

</style>