<template>
    <div class="item-wrap">
        <div class="img-wrap">
            <img :src="`/home_page_photos/${photo}.webp`" :alt="photo">
        </div>
        <div class="description-wrap">
            <div class="top-wrap">
                <h3 class="item-title">{{title}}</h3>
                <div class="btn-link">
                    <router-link :to="{name: 'menu', query: { name: title }}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.22578 17.7708C8.92474 17.4652 8.92474 16.9696 9.22578 16.664L13.8197 12L9.22578 7.336C8.92474 7.03037 8.92474 6.53485 9.22578 6.22922C9.52681 5.92359 10.0149 5.92359 10.3159 6.22922L16 12L10.3159 17.7708C10.0149 18.0764 9.52681 18.0764 9.22578 17.7708Z" fill="#F0749E"/>
                        </svg>
                    </router-link>
                </div>
            </div>
            <div class="bottom-wrap">
                <span class="upper-bold-text">{{subtitle}}</span>
                <p class="body-text">{{ description }}</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ProductDescriptionItem',
    props: {
        photo: String,
        title: String,
        subtitle: String,
        description: String
    }
}

</script>

<style lang="scss" scoped>

.item-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    @media screen and (max-width: $max-mobile) {
        width: 100%;
    }
}

.img-wrap {
    max-width: 908px;
    height: auto;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.description-wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 55%;

    @media screen and (max-width: $max-mobile) {
        max-width: 100%;
    }
    
    .top-wrap {
        display: flex;
        gap: 32px;
        align-items: center;
        justify-content: space-between;

        @media screen and (max-width: $max-mobile) {
            justify-content: space-between;
        }

        .item-title {
            color: var(--white);
            font-family: "Futurespore";
            font-size: 72px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            text-transform: uppercase;
            white-space: nowrap;

            @media screen and (max-width: $max-tablet) {
                font-size: 48px;
            }

            @media screen and (max-width: $max-mobile) {
                font-size: 48px;
                white-space: normal;
            }
        }

        .btn-link {
            display: flex;
            padding: 16px;
            width: 56px;
            height: 56px;
            background-color: var(--white);
            border-radius: 16px;
            cursor: pointer;
            transition: all 0.4s ease;

            @media screen and (max-width: $max-tablet) {
                width: 36px;
                height: 36px;
                padding: 6px;
                border-radius: 12px;
            }

            &:hover {
                background-color: var(--shade_2);
            }
        }
    }

    .bottom-wrap {
        display: flex;
        flex-direction: column;
        gap: 24px;

        @media screen and (max-width: $max-mobile) {
            gap: 16px;
        }

        .upper-bold-text {
            color: var(--white-transparent);
            text-transform: uppercase;

            @media screen and (max-width: $max-tablet) {
                font-size: 14px;
            }
        }

        .body-text {
            color: var(--white);

            @media screen and (max-width: $max-tablet) {
                font-size: 14px;
            }
        }
    }
}

router-link {
    margin: 0;
    padding: 0;
}

</style>