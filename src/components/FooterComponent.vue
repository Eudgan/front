<template>
    <footer>
        <div class="left-side">
            <div class="imgs-wrap">
                <img src="../assets/main-logo/logo-img.svg" alt="Логотип" width="108" height="108">
                <img src="../assets/main-logo/logo-name.svg" alt="Наименование компании" width="108" height="24">
            </div>
            <a href="https://vk.com/quua_tea" target="_blank">
                <img src="/icons_common/vk-icon.svg" alt="VK" width="40" height="40">
            </a>
        </div>
        <div class="right-side">
            <div class="footer-info">
                <router-link class="upper-bold-mobile-text" :to="{name: 'confidentiality'}">Политика конфиденциальности</router-link>
                <span class="body-text">ИП Милевский Яков Вадимович<br>ИНН 420517997508</span>
            </div>
            <a href="https://asapeducation.ru/?utm_course=quua_site" target="_blank" class="asap-text">Разработано в asap.</a>
        </div>
    </footer>
</template>

<script>

export default {
    name: 'FooterComponent',
}

</script>


<style lang="scss" scoped>

footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    background-image: url(../../public/background/pattern_footer.svg);
    width: 100%;

    @media screen and (max-width: $max-mobile) {
        flex-direction: column;
        gap: 32px; 
    }

    @media screen and (min-width: 1921px) {
        border-top-left-radius: 32px;
        border-top-right-radius: 32px;
    }
}

a {
    color: var(--white);
}
.left-side {
    display: flex;
    align-items: center;
    gap: 48px;

    .imgs-wrap {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
}

.right-side {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 56px;

    @media screen and (max-width: $max-mobile) {
        align-items: center;
        gap: 24px;
    }
    
    .footer-info {
        display: flex;
        flex-direction: column;
        gap: 8px;
        text-align: end;

        @media screen and (max-width: $max-mobile) {
            text-align: center;
        }
        
        .body-text {
            color: var(--white);
        }

        .asap-text {
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            line-height: 20px;
        }
    }
}


</style>