<template>
    <div class="baner-wrap" :style="{ 'background-image': 'url(' + backgroundImg + ')' }">
        <h2 class="h1">{{ title }}</h2>
        <span class="h3">{{ subtitle }}</span>
        <div class="img-wrap">
            <img :src="img" :alt="title">
        </div>
        <div class="mobile-wrap">
            <img :src="img" :alt="title">
        </div>
    </div>
</template>

<script>

export default {
    name: 'BanerComponent',
    props: {
        title: String,
        subtitle: String,
        img: String,
        backgroundImg: String,
    }
}

</script>

<style lang="scss" scoped>

.baner-wrap {
    border-radius: 32px;
    padding: 40px 48px 72px 48px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 99.8%;
    overflow: hidden;

    @media screen and (max-width: $max-mobile) {
        gap: 5px;
        min-height: 650px;
        padding: 16px 24px 0px 24px;
    }

    @media screen and (max-width: 550px) {
        gap: 5px;
        min-height: 570px;
    }

    @media screen and (max-width: 450px) {
        gap: 5px;
        min-height: 480px;
    }

    .h1 {
        display: inline-block;
        max-width: 563px;
        color: var(--white);

        @media screen and (max-width: $max-mobile) {
            max-width: 240px;
            font-size: clamp(2.25rem, -2.25rem + 24vw, 3rem);
            font-style: normal;
            font-weight: 400;
            line-height: 40px; 
        }
    }

    .h3 {
        max-width: 617px;
        color: var(--white);

        @media screen and (max-width: $max-mobile) {
            max-width: 100%;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
        }
    }
    
    .img-wrap {
        position: absolute;
        right: 0;
        top: -10px;
        width: 40%;
        height: auto;
        overflow: hidden;
        border-radius: 32px;

        @media screen and (max-width: 1440px) {
            width: 50%;
        }

        @media screen and (max-width: $max-tablet) {
            display: none;
        }

        @media screen and (max-width: $max-mobile) {
            display: none;
        }

        img {
            width: 100%;
            height: 100%;

            @media screen and (max-width: $max-mobile) {
                display: none;
            }
        }
    }

    .mobile-wrap {
        display: none;

        @media screen and (max-width: $max-mobile) {
            display: block;
            position: absolute;
            bottom: 0;
            left: -5px;
        }

        img {
            display: none;

            @media screen and (max-width: $max-mobile) {
                display: block;
                width: 100%;
                height: auto;
                object-fit: cover;
            }
        }
    }
}

</style>