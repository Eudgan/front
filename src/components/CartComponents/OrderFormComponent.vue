<template>
    <form @submit.prevent="submitOrder()">
        <h2 class="h2">Адрес самовывоза</h2>
        <div class="flex-wrapper-16">
            <DropDownTownComponent v-if="currentTown && allTowns" :options="allTowns" v-model="currentTown" :height="'115px'" :idName="'town'"/>
            <WarningInfoComponent v-if="formData.adress && formData.adress.time_intervals_today.length === 0" :warning-text="'Сейчас мы не работаем. Ждём вас в рабочее время ;)'" />
            <RadioSliderComponent :radio-array-town="townInfo" v-model="formData.adress" :id-name="'adress'" :height-bg="'56px'" :height-input="'36px'" :height-glider="'52px'" />
            <div v-if="formData.adress" class="map-wrap">
                <yandex-map
                    :coords="formData.adress.coordinates"
                    :zoom="zoom"
                    style="height: 368px; width: 100%;"
                    :controls="['zoomControl']"
                    :behaviors="[behaviorsYMap]"
                    :options="{
                        minZoom: 15,
                    }"
                >
                    <ymap-marker 
                    :coords="formData.adress.coordinates"
                    :marker-id="1" 
                    :icon="markerIcon"
                    />
                </yandex-map>
            </div>
        </div>
        <h2 class="h2">Ваши данные</h2>
        <div class="field flex-wrapper-16">
            <label class="h3" for="first-name">Имя</label>
            <input @change="validateName()" :class="{'warning-input': warningNameText}" class="body-text" type="text" name="first-name" id="first-name" placeholder="Тапиокий" v-model="formData.name" required>
            <span class="footnote-text warning-info" v-if="warningNameText">{{ warningNameText }}</span>
        </div>
        <div class="tel-wrap flex-wrapper-16">
            <div class="field flex-wrapper-16">
                <label class="h3" for="number">Телефон</label>
                <input 
                    @change="validateTel()"
                    :class="{'warning-input': isWarningTel}"
                    class="body-text"
                    type="tel"
                    name="telephone" 
                    id="telephone" 
                    placeholder="+7 (913) 836-23-34" 
                    v-model="formData.tel" 
                    v-maska 
                    data-maska="+7 (###) ###-##-##"
                    required
                >
                <span class="footnote-text warning-info" v-if="isWarningTel">Введен не корректный телефон</span>
            </div>
            <div class="messenger-wrap">
                <RadioSliderComponent v-if="messengerData" :radio-array-messenger="messengerData" v-model="formData.messenger" :id-name="'messenger'" :height-bg="'56px'" :height-input="'36px'" :height-glider="'52px'" />
                <span class="footnote-text">Предпочтительный способ связи для подтверждения заказа</span>
            </div>
        </div>
        <div class="field flex-wrapper-16">
            <label class="text-field__label h3" for="comment">Комментарий</label>
            <input @change="validateComment()" :class="{'warning-input': isWarningComment}" class="text-field__input body-text" type="text" name="comment" id="comment" placeholder="Введите промокод" v-model="formData.comment">
            <span class="footnote-text warning-info" v-if="isWarningComment">Комментарий должен содержать до 250 символов</span>
        </div>
        <div v-if="formData.adress && formData.adress.time_intervals_today.length" class="time-wrap flex-wrapper-16">
            <span class="h3">Время получения</span>
            <RadioBtnTimeComponent :time-interval="formData.adress.time_intervals_today" :adress="formData.adress" v-model="formData.chosenTime"/>
        </div>
        <CheckBoxAgreementComponent v-model="formData.agreement" />
        <button class="submit-btn" type="submit" :disabled="disabledSubmit < 7">
            <span class="upper-bold-text">Отправить заказ</span>
            <span class="text-cost">{{ totalCost }}&#8381;</span>
        </button>
    </form>
    <Transition>
        <SimpleModalWindowComponent 
            v-if="isOpenModal"
            :title="'спасибо за заказ'"
            :description="'Мы свяжемся c вами в выбранном мессенджере для подтверждения'"
            :nameFirstBtn="'На главную'"
            :nameSecondBtn="'В меню'"
            :classFirstBtn="'primary'"
            :classSecondBtn="'secondary'"
            @handlerBtn = "moveToAnotherPage"
        />
    </Transition>
    <Transition>
        <SimpleModalWindowComponent 
            v-if="isErrorOrder"
            :title="'Ошибка отправки заказа'"
            :description="errorMessage"
            :nameFirstBtn="'ОК'"
            :classFirstBtn="'primary'"
            @handlerBtn = "OpenErrorModal"
        />
    </Transition>
    <Transition>
        <LoaderOrderComponent v-if="isLoadOrder" />
    </Transition>
</template>

<script>
import RadioSliderComponent from '../Castomization/RadioSliderComponent.vue';
import CheckBoxAgreementComponent from '../OrderFormComponents/CheckBoxAgreementComponent.vue';
import WarningInfoComponent from './WarningInfoComponent.vue';
import RadioBtnTimeComponent from '../OrderFormComponents/RadioBtnTimeComponent.vue';
import { yandexMap, ymapMarker} from 'vue-yandex-maps'
import { vMaska } from "maska";
import axios from '../../axios/index.js';
import SimpleModalWindowComponent from '../SimpleModalWindowComponent.vue'
import DropDownTownComponent from '../OrderFormComponents/DropDownTownComponent.vue';
import LoaderOrderComponent from '../OrderFormComponents/LoaderOrderComponent.vue';

export default {
    name: 'OrderFormComponent',
    components: {
        RadioSliderComponent,
        WarningInfoComponent,
        CheckBoxAgreementComponent,
        RadioBtnTimeComponent,
        SimpleModalWindowComponent,
        DropDownTownComponent,
        LoaderOrderComponent,
        yandexMap,
        ymapMarker,
    },
    directives: { maska: vMaska },
    data() {
        return {
            messengerData: null,
            townInfo: null,
            formData: {
                name: '',
                tel: '',
                adress: null,
                messenger: null,
                comment: '',
                chosenTime: null,
                agreement: false,
            },
            markerIcon: {
                layout: 'default#image',
                imageHref: '/icons_common/location.svg',
                imageSize: [52, 56],
                imageOffset: [-28, -50],
            },
            zoom: 15,
            isWarningTel: false,
            isWarningComment: false,
            warningNameText: null,
            behaviorsYMap: 'multiTouch',
            isOpenModal: false,
            postAnswer: null,
            isErrorOrder: false,
            errorMessage: '',
            isLoadOrder: false,
        }
    },
    methods: {
        OpenErrorModal(nameBtn) {
            if (nameBtn === 'ОК') {
                this.isErrorOrder = false;
            }
        },
        moveToAnotherPage(nameBtn) {
            if (nameBtn === 'На главную') {
                this.$router.push('/');
            } else {
                this.$router.push('/menu');
            }
            this.$store.commit('deleteAllOrder');
            this.isOpenModal = false;
        },
        submitOrder() {
            this.pushOrder();
            this.isLoadOrder = true;
        },
        validateTel() {
            if(this.formData.tel.length < 18) {
                this.isWarningTel = true;
            } else {
                this.isWarningTel = false;
            }
        },
        validateName() {
            const russianLettersPattern = /^[А-Яа-я]+([-][А-Яа-я]+)*$/;
            const minLength = 2;
            const maxLength = 20;
            let noSpacesStr = this.formData.name.replace(/\s/g, '');
            if (!russianLettersPattern.test(noSpacesStr)) {
                this.warningNameText = 'Имя должно содержать только русские буквы'
            } else if (this.formData.name.length === 0) {
                this.warningNameText = null;
            } else if (this.formData.name.length < minLength || this.formData.name.length > maxLength) {
                this.warningNameText = `Имя должно содержать от ${minLength} до ${maxLength} символов`
            } else {
                this.warningNameText = null;
            }
        },
        validateComment() {
            const maxLength = 250;
            if (this.formData.comment.length > maxLength) {
                this.isWarningComment = true;
            } else { 
                this.isWarningComment = false;
            }
        },
        async requestTownInfo(nameTown) {
            try {
                const response = await axios.post(`/points:search`, {
                include: 'schedules',
                filter: {
                    city: nameTown,
                },
            })
                this.townInfo = response.data.data;
            } catch (error) {
                this.error = error.message;
            } finally {
                this.formData.adress = this.townInfo[0];
            }
        },
        async requestMessengersInfo() {
            try {
                const response = await axios.post(`/type-connections:search`);
                this.messengerData = response.data.data;
            } catch (error) {
                this.errorMessage = error.message;
            } finally {
                this.formData.messenger = this.messengerData[0];
            }
        },
        async pushOrder() {
            const data = {
                order: {
                    ready_time: this.formData.chosenTime,
                    total_cost: this.$store.getters.getTotalCost,
                    comment: this.formData.comment,
                    point_id: this.formData.adress.id,
                    type_connection_id: this.formData.messenger.id,
                },
                client: {
                    name: this.formData.name,
                    telephone: this.formData.tel,
                },
                order_parameters: [],
            };

            this.$store.state.orderItems.forEach(element => {
                let order = {};
                order.volume_id = element.volume.id;
                order.sweetness = element.sweetness;
                order.temperature = element.temperature;
                order.amount = element.count;
                order.supplements = [];
                if (element.milk) {
                    order.supplements.push(element.milk.id);
                }
                if (element.syrup) {
                    order.supplements.push(element.syrup.id);
                }

                if (element.additives.length) {
                    element.additives.forEach(additive => {
                        order.supplements.push(additive.id);
                    })
                } 

                data.order_parameters.push(order);
            });
            try {
                this.postAnswer = await axios.post(`/orders`, data);
            } catch (error) {
                this.errorMessage = error.response.data.message;
                this.isLoadOrder = false;
                this.isErrorOrder = true;
                console.log(error);
            } finally {
                if (this.postAnswer !== null && this.postAnswer.status === 201) {
                    this.isLoadOrder = false;
                    this.isOpenModal = true;
                } 
            }
        },
    },
    computed: {
        currentTown: {
            get: function() {
                if (this.$store.state.townState.currentTown) {
                    this.requestTownInfo(this.$store.state.townState.currentTown.name);
                }
                return this.$store.state.townState.currentTown;
            },
            set: function(newValue) {
                if (newValue) {
                    this.$store.commit('changeTown', newValue.name);
                    this.requestTownInfo(newValue);
                }
            }
        },
        allTowns() {
            return this.$store.state.townState.allTowns;
        },
        unavailable() {
            return this.$store.getters.getUnavailableStatus;
        },
        orderCount() {
            return this.$store.getters.getOrderCount;
        },
        disabledSubmit() {
            let isUnCorrectTel = 1;
            let isUnCorrectName = 1;
            let isUnCorrectComment = 1;
            let isUnCorrectAgrenment = 1;
            let isUnCorrectTime = 1;
            let isUnCorrectCount = 1;
            if (this.isWarningTel || this.formData.tel === '') {
                isUnCorrectTel = 0;
            }
            if (this.warningNameText !== null || this.formData.name === '') {
                isUnCorrectName = 0;
            }
            if (this.isWarningComment) {
                isUnCorrectComment = 0;
            }
            if (this.formData.agreement === false) {
                isUnCorrectAgrenment = 0;
            }
            if (this.formData.adress?.time_intervals_today.length === 0) {
                isUnCorrectTime = 0;
            }
            if (this.orderCount > 15) {
                isUnCorrectCount = 0;
            }
            return isUnCorrectComment + isUnCorrectName + isUnCorrectTel + isUnCorrectAgrenment + isUnCorrectTime + this.unavailable + isUnCorrectCount;
        },
        totalCost() {
            return this.$store.getters.getTotalCost;
        }
    },
    mounted() {
        if (window.innerWidth < 1000) {
            this.behaviorsYMap = 'multiTouch'
        } else {
            this.behaviorsYMap = 'default'
        }
        if (this.currentTown) {
            this.requestTownInfo(this.currentTown.name);
        }
        this.requestMessengersInfo();
    },
}

</script>

<style lang="scss" scoped>

input[type=text] {
    font-family: Evolventa;
}

input[type=tel] {
    font-family: Evolventa;
}

form {
    width: 48%;
    display: flex;
    flex-direction: column;
    gap: 24px;

    @media screen and (max-width: $max-tablet) {
        width: 100%;
    }
}

.map-wrap {
    border-radius: 16px;
    overflow: hidden;
}

.flex-wrapper-16 {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

input {
    background-color: var(--shade_1);
    padding: 18px 24px;
    border-radius: 16px;
    border: none;
    outline: none;

    &::placeholder {
        color: var(--shade_3);
        font-family: Evolventa;
        font-weight: 400;
    }
}

.warning-input {
    background-color: var(--soft-red);
    color: var(--red);

    &::placeholder {
        color: var(--red);
    }
}

.warning-info {
    color: var(--red);
}

.messenger-wrap {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-color);
    border-radius: 16px;
    padding: 21px 0;
    color: var(--white);
    transition: all 0.4s ease;

    @media screen and (max-width: $max-tablet) {
        position: sticky;
        justify-content: space-between;
        bottom: 20px;
        width: 100%;
        z-index: 6;
        bottom: 20px;
        padding: 16px 24px;
    }

    &:hover {
        background-color: var(--main-dark-color);
    }

    &:active {
        filter: brightness(80%);
    }

    &:disabled {
        background-color: var(--shade_2);
        pointer-events: none;
        user-select: none;
        color: var(--shade_3);
    }

    .upper-bold-text {
        @media screen and (max-width: $max-tablet) {
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 20px; /* 142.857% */
            text-transform: uppercase;
        }
    }

    .text-cost {
        display: none;

        @media screen and (max-width: $max-tablet) {
            display: flex;
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 20px;
            text-transform: uppercase;
        }
    }
}

input {
    font-family: "Arial", sans-serif;
}


.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>