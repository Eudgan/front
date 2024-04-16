<template>
    <div class="cart-wrap">
        <div class="img-wrap">
            <img :src="`not_found_pages_photos/${photo}.webp`" :alt="photo">
        </div>
        <div class="cart-info-wrap">
            <div class="title">
                <h2 class="h2">{{ title }}</h2>
                <span class="body-text">{{ subtitle }}</span>
            </div>
            <router-link class="h3 router-btn" :to="{name: `${nameRouter}`}">{{ nameBtn }}</router-link>
        </div>
    </div>
</template>

<script>

export default {
    name: 'EmptyViewComponent',
    props: {
        photo: String,
        title: String,
        subtitle: String,
        nameBtn: String,
        nameRouter: String,
    }
}

</script>

<style lang="scss" scoped>
.cart-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 68px;
    margin-top: 32px;
    margin-bottom: 156px;

    @media screen and (max-width: $max-mobile) {
        flex-direction: column;
        padding: 0;
        gap: 32px;
    }
}

.img-wrap {
    width: 45%;
    height: 684px;

    @media screen and (max-width: $max-mobile) {
        width: 100%;
        height: auto;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.cart-info-wrap {
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    @media screen and (max-width: $max-mobile) {
        width: 100%;
    }

    .title {
        display: flex;
        flex-direction: column;
        gap: 12px;
        text-align: center;
        .h2 {
            text-transform: uppercase;
        }
    }

    .router-btn {
        display: flex;
        justify-content: center;
        padding: 15px 0;
        width: 280px;
        background-color: var(--main-color);
        border-radius: 16px;
        color: var(--white);
        transition: all 0.4s ease;

        &:hover {
            background-color: var(--main-dark-color);
        }
    }
}

</style>