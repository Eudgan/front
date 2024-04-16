<template>
    <ul :class="{'flex-list': isFlex, 'grid-list': isGrid, 'flex-list-wrap': isFlexWrap}">
        <li @click="changeRotation(index)" v-for="(text, index) in textData" :key="text" :style="{backgroundColor: backgroundColor}" :class="{'animatedElementToPlus ': animationArrayPlus[index] === false, 'animatedElementToMinus ': animationArrayMinus[index] === false}">
            <span v-if="isDarkPink" :class="{'adv-dark-pink': index % 2 === 0, 'adv-green': index % 2 !== 0}" class="adv-number upper-bold-text">{{ ++index }}</span>
            <span v-else :class="{'adv-pink': index % 2 === 0, 'adv-green': index % 2 !== 0}" class="adv-number upper-bold-text">{{ ++index }}</span>
            <span class="h3">{{ text }}</span>
        </li>
    </ul>
</template>

<script>

export default {
    name: 'AdvantagesListComponent',
    props: {
        isFlex: Boolean,
        isGrid: Boolean,
        isFlexWrap: Boolean, 
        textData: Array,
        isDarkPink: Boolean,
        backgroundColor: {
            default: '#E3F0F1',
            type: String
        }
    },
    data() {
        return {
            animationArrayPlus: [true, true, true, true],
            animationArrayMinus: [true, true, true, true]
        }
    },
    methods: {
        changeRotation(index) {
            if ((index - 1) % 2 === 0) {
                if (this.animationArrayPlus[index - 1]) {
                    this.animationArrayMinus[index - 1] = true;
                    this.animationArrayPlus[index - 1] = !this.animationArrayPlus[index - 1];
                } else {
                    this.animationArrayPlus[index - 1] = !this.animationArrayPlus[index - 1];
                    this.animationArrayMinus[index - 1] = !this.animationArrayMinus[index - 1];
                }
            } else {
                if (this.animationArrayMinus[index - 1]) {
                    this.animationArrayPlus[index - 1] = true;
                    this.animationArrayMinus[index - 1] = !this.animationArrayMinus[index - 1];
                } else {
                    this.animationArrayMinus[index - 1] = !this.animationArrayMinus[index - 1];
                    this.animationArrayPlus[index - 1] = !this.animationArrayPlus[index - 1];
                }
            }
        }
    }
}

</script>

<style lang="scss" scoped>

.flex-list {
    display: flex;
    gap: 32px;
    cursor: pointer;

    @media screen and (max-width: $max-tablet) {
        gap: 20px;
    }

    @media screen and (max-width: $max-mobile) {
        flex-direction: column;
        gap: 36px;
    }

    li:nth-child(n) {
        transform: rotate(-2deg);
    }

    li:nth-child(2n) {
        transform: rotate(2deg);
    }
}

.flex-list-wrap {
    display: flex;
    gap: 32px;
    justify-content: center;
    flex-wrap: wrap;
    cursor: pointer;

    @media screen and (max-width: $max-mobile) {
        flex-direction: column;
        gap: 36px;
    }

    li:nth-child(n) {
        transform: rotate(-2deg);
    }

    li:nth-child(2n) {
        transform: rotate(2deg);
    }
}

.grid-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    cursor: pointer;

    @media screen and (max-width: $max-mobile) {
        display: flex;
        flex-direction: column;
        gap: 36px;
    }

    li {
        min-width: 300px;
        display: flex;
        justify-content: center;
        align-items: center;

        @media screen and (max-width: $max-tablet) {
            min-width: 0;
        }

        @media screen and (max-width: $max-mobile) {
            min-width: 300px;
        }
    }

    li:nth-child(1) {
        transform: rotate(-2deg);
    }

    li:nth-child(2) {
        transform: rotate(2deg);
    }

    li:nth-child(3) {
        transform: rotate(-2deg);
    }

    li:nth-child(4) {
        transform: rotate(2deg);
    }
}

.grid-list-center {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;

    @media screen and (max-width: $max-mobile) {
        display: flex;
        flex-direction: column;
        gap: 36px;
    }

    li {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    li:nth-child(1) {
        transform: rotate(-2deg);
    }

    li:nth-child(2) {
        transform: rotate(2deg);
    }

    li:nth-child(3) {
        transform: rotate(2deg);
        grid-column: 1 / 3;
        place-self: center;
    }
}

li {
    padding: 24px 32px;
    border-radius: 48px;
    background-color: var(--shade_1);
    position: relative;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    @media screen and (max-width: $max-mobile) {
        padding: 16px 24px;
    }

    .h3 {
        @media screen and (max-width: $max-tablet) {
            font-size: 16px;
        }
    }

    .adv-number {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 4px 32px;
        border-radius: 48px;
        color: var(--white);
    }

    .adv-green {
        background-color: var(--accent-color);
    }
    .adv-pink {
        background-color: var(--main-color);
    }

    .adv-dark-pink {
        background-color: var(--main-dark-color);
    }
}

@keyframes rotateAnimationPlus {
  0% {
    transform: rotate(-2deg);
  }

  25% {
    transform: rotate(-1deg);
  }

  50% {
    transform: rotate(0deg);
  }

  75% {
    transform: rotate(1deg);
  }

  100% {
    transform: rotate(2deg);
  }
}

@keyframes rotateAnimationMinus {
  0% {
    transform: rotate(2deg);
  }

  25% {
    transform: rotate(1deg);
  }

  50% {
    transform: rotate(0deg);
  }

  75% {
    transform: rotate(-1deg);
  }

  100% {
    transform: rotate(-2deg);
  }
}

.animatedElementToPlus {
  animation: rotateAnimationPlus 0.2s forwards;
}

.animatedElementToMinus {
  animation: rotateAnimationMinus 0.2s forwards;
}

</style>