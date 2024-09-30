<script>

//home
import LogoComponent from '../containers/logoComponent.vue';
import HeaderCta from '../header-buttons/HeaderCta.vue';

export default {
    name:'HeaderHeroComponent' ,

    data(){
    return{}
    },
    components: {
        LogoComponent,
        HeaderCta
    },
    methods: {
        
    }
}


</script>

<template>

    <header class="">
        <div class="container-fluid py-3">
            <div class="d-flex">

                <div class="col-6 ms-2 ">
                    <LogoComponent/>
                </div>
                <div class="col-6 d-flex justify-content-end py-2 col-cta">
                    <HeaderCta/>
                </div>

            </div>
        </div>
    </header>

</template>

<style lang="scss" scoped>


</style>
