<script>
import FavouritesCtaComponent from './FavouritesCtaComponent.vue';
import LoginCtaComponent from './LoginCtaComponent.vue';
import CartCtaComponent from './CartCtaComponent.vue';

export default {
    name: 'HeaderCta',

    components: {
        FavouritesCtaComponent,
        LoginCtaComponent,
        CartCtaComponent
    },

    data() {
        return {}
    },
    methods: {

    }
}
</script>

<template>
    <div class="headerCta">
        <div class="d-flex justify-content-around">
            <LoginCtaComponent />
            <CartCtaComponent />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.headerCta {
    width: 30%;
}

@media(max-width: 1026px){

    .headerCta{
        width: 40%;
    }
}


@media only screen and (max-width: 768px) {
    .headerCta {
        width: 60%;
    }
}

@media only screen and (max-width: 600px) {
    .headerCta {
        width: 100%;
    }
}
</style>
