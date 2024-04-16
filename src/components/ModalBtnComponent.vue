<template>
    <button :class="['h3', `${className}-btn`]">{{ nameBtn }}</button>
</template>

<script>

export default {
    name: 'ModalBtnComponent',
    props: {
        nameBtn: String,
        className: String,
    },
}

</script>


<style lang="scss" scoped>

button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 280px;
    padding: 16px 0px;
    border-radius: 16px;

    @media screen and (max-width: $max-tablet) {
        font-size: 16px;
    }
}

.equal-btn {
    background-color: var(--shade_1);
    transition: all 0.4s ease;
    border: 1px solid transparent;

    &:hover {
        background-color: var(--main-color);
        color: var(--white);
        border: 1px solid transparent;
    }
}

.primary-btn {
    background-color: var(--main-color);
    color: var(--white);
    transition: all 0.4s ease;

    &:hover {
        background-color: var(--main-dark-color);
    }
}

.secondary-btn {
    background-color: var(--white);
    border: 1px solid var(--shade_3);
    transition: all 0.4s ease;
    
    &:hover {
        background-color: var(--shade_1);
        border-color: var(--shade_4);
    }
}

.delete-btn {
    background-color: var(--white);
    border: 1px solid var(--red);
    color: var(--red);

    &:hover {
        background-color: var(--red);
        border: none;
        color: var(--white);
    }
}

</style>