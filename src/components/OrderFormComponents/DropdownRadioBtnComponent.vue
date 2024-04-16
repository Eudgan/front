<template >
    <div class="dropdown-wrap" v-click-outside="onClickOutside">
        <div class="dropdown-selected-option" @click="dropDown()" >
            <span class="body-text">{{ inputValue }}</span>
            <svg :class="{ 'rotate-arrow': isDrop}" xmlns="http://www.w3.org/2000/svg" width="14" height="9" viewBox="0 0 14 9" fill="none">
                <path d="M1 1L7 7L13 1" stroke="black" stroke-width="2"/>
            </svg>
        </div>
        <Transition name="slide-fade">
        <div class="overflow-wrap" v-if="isDrop">
            <div class="option-wrap" >
                <label class="body-text" v-for="(option, index) in options" :key="index">
                    <input @click="dropDown()" v-model="localValue" @input="takeValue" type="radio" :name="idName" :value="option">
                    <span v-if="idName === 'time'">{{ option }}</span>
                </label>
            </div>
        </div>
        </Transition>
    </div>
</template>

<script>

export default {
    name: 'DropdownRadioBtnComponent',
    props: {
        options: {},
        modelValue: {},
        height: String,
        width: {
            type: String,
            default: 'auto'
        },
        idName: String,
        isParentDrop: Boolean,
        adress: Object,
    },
    data() {
        return {
            isDrop: false,
            inputValue: null,
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
        },
    },
    watch: {
        options: {
            handler() {
                this.inputValue = this.options[0];
            }
        },
        isParentDrop : {
            handler(newValue) {
                if (newValue === true) {
                    this.isDrop = false;
                    this.localValue = this.inputValue;
                } else {
                    this.isDrop = false;
                }
            }
        },
        adress: {
            handler() {
                this.inputValue = this.options[0];
            }
        }
    },
    methods: {
        onClickOutside() {
            if (this.isDrop) {
                this.isDrop = false;
            }
        },
        takeValue(event) {
            this.inputValue = event.target.value;
        },
        dropDown() {
            this.isDrop = !this.isDrop;
        }
    },
    mounted() {
        this.inputValue = this.options[0];
    }
}

</script>

<style lang="scss" scoped>

.dropdown-wrap {
    display: flex;
    flex-direction: column;
    gap: 16px;
    cursor: pointer;
    position: relative;
}

.dropdown-selected-option {
    display: flex;
    gap: 8px;
    align-items: center;

    .rotate-arrow {
        transform: rotate(180deg);
    }
}

.overflow-wrap {
    position: absolute;
    max-height: 250px;
    width: v-bind(width);
    top: 34px;
    left: -47px;
    z-index: 10;
    background-color: var(--white);
    padding: 10px;
    border: 1px solid var(--shade_3);
    border-radius: 16px;
}

.option-wrap {
    max-height: 125px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 16px;
    background-color: var(--white);

    @media screen and (max-width: $max-mobile) {
        left: -12px;
    }

    label {
        display: flex;
        align-items: center;
        gap: 16px;
        user-select: none;
        cursor: pointer;

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

        input[type="radio"]:hover {
            filter: brightness(90%);
        }

        input[type="radio"]:active {
            filter: brightness(80%);
        }

        input[type="radio"]:disabled {
            cursor: default;
            filter: grayscale(100%);
            opacity: 0.6;
        }
    }
}

/* -------------------------------------------------------------------------- */
/*                                  Анимации                                  */
/* -------------------------------------------------------------------------- */

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}



</style>