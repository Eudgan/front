<template>
    <section class="hero-suppliers">
        <div class="hero-suppliers-info">
            <div class="text-wrap">
                <h1 class="h2">{{ title }}</h1>
                <p v-if="subtitle" class="body_2-text">{{ subtitle }}</p>
            </div>
            <a v-if="link" :href="link" target="_blank" class="upper-bold-text">{{ btnName }}</a>
            <a v-if="anchorLink" :href="anchorLink" class="upper-bold-text">{{ btnName }}</a>
        </div>
        <img :src="`/common_photos/${img}.webp`" :alt="title">
    </section>
</template>

<script>

export default {
    name: 'AdditionHeroComponent',
    props: {
        title: String,
        subtitle: String,
        img: String,
        link: String,
        anchorLink: String,
        btnName: String,
    }
}

</script>

<style lang="scss" scoped>

.hero-suppliers {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--main-color);
    margin-left: -40px;
    margin-right: -40px;

    @media screen and (max-width: $max-tablet) {
        margin-left: -24px;
        margin-right: -24px;
    }

    @media screen and (max-width: $max-mobile) {
        flex-direction: column-reverse;
        gap: 15px;
        margin-left: -16px;
        margin-right: -16px;
        padding-bottom: 41px;
    }
}

.hero-suppliers-info {
    display: flex;
    flex-direction: column;
    gap: 64px;
    color: var(--white);
    max-width: 30%;
    padding: 0 40px;

    @media screen and (max-width: $max-tablet) {
        padding: 0 24px;
    }

    @media screen and (max-width: $max-mobile) {
        max-width: 100%;
        padding: 0 16px;
    }

    .text-wrap {
        width: 600px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        @media screen and (max-width: $max-tablet) {
            width: 400px;
        }

        @media screen and (max-width: $max-mobile) {
            max-width: 100%;
        }

        .h2 {
            font-family: Evolventa;
            font-size: 48px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;

            @media screen and (max-width: $max-tablet) {
                font-size: clamp(1.875rem, 1.1245rem + 1.5656vw, 2.375rem);
            }

            @media screen and (max-width: $max-mobile) {
                font-size: 24px;
                line-height: 32px
            }
        }

        .body_2-text {
            @media screen and (max-width: $max-mobile) {
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 20px;
            }
        }
    }

    a {
        width: 451px;
        padding: 16px 0;
        text-align: center;
        background-color: var(--white);
        border-radius: 16px;
        color: var(--main-color);
        transition: all 0.4s ease;

        &:hover {
            filter: brightness(90%);
        }

        @media screen and (max-width: $max-tablet) {
            width: 350px;
        }

        @media screen and (max-width: $max-mobile) {
            width: 100%;
        }
    }
}

img {
    margin-right: -40px;
    max-width: 40%;
    height: auto;

    @media screen and (max-width: $max-tablet) {
        margin-right: -24px;
        max-width: 50%;
    }

    @media screen and (max-width: $max-mobile) {
        max-width: 115%;
        width: 115%;
        margin: 0;
    }
}

</style>