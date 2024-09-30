<script>
export default {
    name: 'LogoFilledComponent',

    data() {
        return {}
    },
    component: {

    },
    methods: {

    }
}


</script>

<template>
    <div class="logo-container">
            <a href="/">
                <img src="/deliveboo-filled-logo.png" alt="">
            </a>
        </div>
 
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as*;
@use 'src/assets/partials/_mixin.scss' as*;

.logo-container {
    width: 30%;

    img {
        width: 65%;
    }
}

@media only screen and (max-width: 768px) {
    .logo-container {
        width: 50%;
    }
}

@media only screen and (max-width: 600px) {
    .logo-container {
        width: 100%;
    }
}
</style>