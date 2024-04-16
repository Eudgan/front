<template>
    <div class="modal">
        <Transition name="slide-fade">
        <div class="modal-box">
            <div class="title-wrap">
                <h2 class="h2">{{ title }}</h2>
                <span class="body-text">{{ description }}</span>
            </div>
            <div class="btn-wrap">
                <ModalBtnComponent v-if="nameFirstBtn" @click="handlerBtn(nameFirstBtn)" :name-btn="nameFirstBtn" :class-name="classFirstBtn" />
                <ModalBtnComponent v-if="nameSecondBtn" @click="handlerBtn(nameSecondBtn)" :name-btn="nameSecondBtn" :class-name="classSecondBtn" />
            </div>
        </div>
        </Transition>
    </div>
</template>

<script>
import ModalBtnComponent from './ModalBtnComponent.vue';

export default {
    name: 'SimpleModalWindowComponent',
    components: {
        ModalBtnComponent
    },
    props: {
        title: String,
        description: String,
        nameFirstBtn: String,
        nameSecondBtn: String,
        classFirstBtn: String,
        classSecondBtn: String,
    },
    emits: ['handlerBtn'],
    methods: {
        handlerBtn(name) {
            this.$emit('handlerBtn', name);
        }
    }
}

</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-box {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 32px 152px;
    background-color: var(--white);
    border-radius: 32px;

    @media screen and (max-width: $max-tablet) {
        padding: 32px 22px;
    }

    .title-wrap {
        display: flex;
        flex-direction: column;
        gap: 16px;
        align-items: center;

        .h2 {
            @media screen and (max-width: $max-tablet) {
                font-size: 32px;
                text-align: center;
            }
        }

        .body-text {
            @media screen and (max-width: $max-tablet) {
                font-size: 14px;
                text-align: center;
            }
        }
    }
    .btn-wrap {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
        justify-content: center;
        text-align: center;

        @media screen and (max-width: $max-tablet) {
            gap: 16px;
        }

        @media screen and (max-width: $max-mobile) {
            flex-direction: column;
            gap: 8px;
            align-items: center;
        }
    }
}

</style>