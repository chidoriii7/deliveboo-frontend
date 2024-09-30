<script>
//pages
import LogoFilledComponent from '../containers/LogoFilledComponent.vue';
import HeaderCta from '../header-buttons/HeaderCta.vue';
import SearchBarComponent from '../search-bar/SearchBarComponent.vue';

export default {
    name: 'HeaderEmptyComponent',

    components: {
        SearchBarComponent,
        //modifiche
        LogoFilledComponent,
        //modifiche
        HeaderCta
    },

    data() {
        return {}
    },
    methods: {

    }
}

</script>

<template>
    <header>
        <div class="container-fluid py-3">
            <div class="d-flex">

                <div class="col-6 d-flex justify-content-start ms-3 py-2">
                    <LogoFilledComponent />
                </div>
                <div class="col-6 d-flex justify-content-end py-2">
                    <HeaderCta v-if="$route.name !== 'payPage'" />
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

header {
    border-bottom: solid 0.1px rgba(255, 166, 0, 0.2);
    position: fixed;
    margin: auto;
    background-color: $quaternary-color;
    z-index: 4;
}

</style>