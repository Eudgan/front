<template>
    <div class="contact-wrap" :class="{'reverse-contact-wrap': reverse}">
        <template v-for="itemTime in timeData" :key="itemTime.id">
            <div v-show="itemTime.isShow" class="img-wrap">
                <img :src="itemTime.images[0]" :alt="itemTime.name">
            </div>
        </template>
        <div class="contact-info">
            <div class="main-info">
                <h4>Наши чайные&nbsp;в г.{{ townData.name }}</h4>
                <div class="btn-wrap h3">
                    <button v-for="(itemTime, index) in timeData" :key="itemTime.id" @click="changeTime(index)" :class="{active: itemTime.isShow}" class="h3">{{ itemTime.street }} {{ itemTime.house }}</button>
                </div>
            </div>
            <div class="time-info-wrap">
                <span class="h3">Время работы</span>
                <div class="main-work-day-spin">
                    <span class="body-text">Будние</span>
                    <div class="times">
                        <template v-for="itemTime in timeData" :key="itemTime.id" >
                            <Transition name="slide-up">
                                <span class="time body-text" v-if="itemTime.schedule.length && itemTime.isShow">{{ findDays(itemTime.schedule, 'Будние').time }}</span>
                            </Transition>
                        </template>
                    </div>
                </div>
                <div class="main-work-day-spin">
                    <span class="body-text">Выходные</span>
                    <div class="times">
                        <template v-for="itemTime in timeData" :key="itemTime.id">
                            <Transition name="slide-up">
                                <span class="time body-text" v-if="itemTime.schedule.length && itemTime.isShow">{{ findDays(itemTime.schedule, 'Выходные').time }}</span>
                            </Transition>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '../../axios/index.js';

export default {
    name: 'ContactInfoComponent',
    props: {
        townData: Object,
        reverse: Boolean,
    },
    data() {
        return {
            timeData: null,
        }
    },
    methods: {
        findDays(schedules, day) {
            return schedules.find(schedule => schedule.day === day);
        },
        changeTime(index) {
            for (let i = 0; i < this.timeData.length; i++) {
                if (i === index) {
                    this.timeData[i].isShow = true;
                } else {
                    this.timeData[i].isShow = false;
                }
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
                this.timeData = response.data.data;
                for (let index = 0; index < this.timeData.length; index++) {
                    if (index === 0) {
                        this.timeData[index].isShow = true;
                    } else {
                        this.timeData[index].isShow = false;
                    }
                }
            } catch (error) {
                this.error = error.message;
            }
        },
    },
    mounted() {
        this.requestTownInfo(this.townData.name);
    }
}

</script>

<style lang="scss" scoped>
.contact-wrap {
    display: flex;
    justify-content: space-between;
    position: relative;

    @media screen and (max-width: $max-mobile) {
        flex-direction: column;
        gap: 24px;
    }
}

.reverse-contact-wrap {
    flex-direction: row-reverse;

    @media screen and (max-width: $max-mobile) {
        flex-direction: column;
        gap: 24px;
    }
}

.img-wrap {
    width: 59%;
    height: 100%;
    border-radius: 16px;
    overflow: hidden;

    @media screen and (max-width: $max-mobile) {
        width: 100%;
    }
    
    img {
        width: 100%;
        height: auto;
    }
}
.contact-info {
    display: flex;
    flex-direction: column;
    gap: 48px;
    width: 39%;

    @media screen and (max-width: $max-mobile) {
        width: 100%;
        gap: 16px;
    }
}

.h3 {
    @media screen and (max-width: $max-mobile) {
        font-size: 16px;
        line-height: 22px;
    }
}

.body-text {
    @media screen and (max-width: $max-mobile) {
        font-size: 14px;
        line-height: 20px;
    }
}

.main-info {
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media screen and (max-width: $max-mobile) {
        gap: 16px;
    }

    h4 {
        font-family: Evolventa;
        font-size: 48px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        color: var(--black);

        @media screen and (max-width: $max-mobile) {
            font-size: 24px;
            line-height: 32px;
        }
    }

    .btn-wrap {
        display: flex;
        flex-direction: column;
        gap: 24px;

        @media screen and (max-width: $max-mobile) {
            gap: 16px;
        }

        h3 {
            @media screen and (max-width: $max-mobile) {
                font-size: 16px;
                line-height: 22px;
            }
        }

        button {
            background-color: var(--shade_1);
            border-radius: 24px;
            padding: 32px;
            text-align: start;
            color: var(--black);
            transition: all 0.4s ease;
            width: 100%;

            @media screen and (max-width: $max-mobile) {
                padding: 20px 16px;
                border-radius: 16px;
            }

            &:hover {
                background-color: var(--main-color);
                color: var(--white);
            }
        }

        .active {
            background-color: var(--main-color);
            color: var(--white);
        }
    }
}

.time-info-wrap {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: space-between;
    max-width: 254px;

    @media screen and (max-width: $max-mobile) {
        gap: 8px;
    }

    .main-work-day-spin {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        overflow: hidden;

        .time {
            display: block;
            height: 100%;
            position: absolute;
            top: 0;
            left: 120px;
        }
    }
}

/* -------------------------------------------------------------------------- */
/*                                  Анимация                                  */
/* -------------------------------------------------------------------------- */

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.4s ease-out;
}
.slide-up-enter-from {
    transform: translateY(30px);
}
.slide-up-leave-to {
    transform: translateY(-30px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>