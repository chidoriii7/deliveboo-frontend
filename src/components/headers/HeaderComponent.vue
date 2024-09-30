<script>

//navbar sia per il backend per il frontend


import LogoComponent from '../containers/logoComponent.vue';
import HeaderCta from '../header-buttons/HeaderCta.vue';
import SearchBarComponent from '../search-bar/SearchBarComponent.vue';

export default {
    name:'HeaderComponent',

    components:{
        SearchBarComponent,
        //modifiche
        LogoComponent,
        //modifiche
        HeaderCta
    },

    data(){
        return{}
    },
    methods: {

    }
}


</script>

<template>
    <header>
        <div class="container py-3">
            <div class="d-flex">

                <div class="col-md-6 bg-danger side-div py-2">
                     <LogoComponent/>
                </div>
                <div class="col-md-6 py-2 side-div">
                    <HeaderCta/>
                </div>

            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>

@media screen and (max-width: 1024px) {
    .side-div {
        width: 20%;
    }

    .search-bar-desktop {
        width: 60%;
    }
}

@media screen and (max-width: 768px) {
    .side-div {
        width: 20%;
    }

    .search-bar-desktop {
        width: 60%;
        display: block; 
    }

    .col-md-12 {
        display: block; 
    }
}

@media screen and (max-width: 576px) {
    .side-div {
        width: 50%; 
    }

    .search-bar-desktop {
        display: none;
    }
}

@media screen and (max-width: 425px) {
    .side-div {
        width: 50%;
    }

    .search-bar-desktop {
        display: none;
    }
}


</style>