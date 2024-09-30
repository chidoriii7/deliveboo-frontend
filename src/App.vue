<script>

import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';


export default {

    components: {
        HeaderComponent,
        FooterComponent
    }
}

</script>

<template>
    <section>
        <!-- <HeaderComponent /> -->
        <router-view></router-view>
        <!-- <FooterComponent /> -->
    </section>
</template>

<style lang="scss">
@use 'src/style.scss' as*
</style>