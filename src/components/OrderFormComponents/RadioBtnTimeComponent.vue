<template>
    <div class="radio-input-time">
        <label class="time-wrap">
            <input @click="closeDrop()" type="radio" name="chosen-time" value="Ближайшее, через 15 минут" v-model="localValue" checked>
            <span class="body-text">Ближайшее, через 15 минут</span>
        </label>
        <label class="time-wrap">
            <input @click="openDrop()" type="radio" name="chosen-time" value="pre-order" :disabled="isDisabled" >
            <div class="drop-time-wrap">
                <DropdownRadioBtnComponent :is-parent-drop="isParentDrop" :options="timeInterval" :adress="adress" v-model="localValue" :height="'160px'" :width="'190px'" :idName="'time'"/>
            </div>
        </label>
    </div>
</template>

<script>
import DropdownRadioBtnComponent from './DropdownRadioBtnComponent.vue';

export default {
    name: 'RadioBtnTimeComponent',
    props: {
        modelValue: String,
        timeInterval: Array,
        adress: Object,
    },
    components: {
        DropdownRadioBtnComponent
    },
    watch: {
        '$store.state.townState.currentTown': {
            handler() {
                this.localValue = 'Ближайшее, через 15 минут';
                this.closeDrop();
            }
        },
        adress: {
            handler() {
                this.localValue = 'Ближайшее, через 15 минут';
                this.closeDrop();
            }
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
    data() {
        return { 
            isDisabled: false,
            isChecked: true,
            isParentDrop: false,
        }
    },
    methods: {
        openDrop() {
            this.isParentDrop = true;
            this.isDisabled = true;
        },
        closeDrop() {
            this.isParentDrop = false;
            this.isDisabled = false;
        }
    },
    mounted() {
        this.localValue = 'Ближайшее, через 15 минут';
    }
}

</script>

<style lang="scss" scoped>
.radio-input-time {
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.time-wrap {
    display: flex;
    align-items: center;
    gap: 16px;
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

input[type="radio"]:hover {
    filter: brightness(90%);
}

input[type="radio"]:active {
    filter: brightness(80%);
}

input[type="radio"]:disabled {
    filter: brightness(100%);
}

</style>