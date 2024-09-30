<script>
import CardHeroComponent from './CardHeroComponent.vue';
import HeaderHeroComponent from './HeaderHeroComponent.vue'


export default {
    name:'HeroComponent' ,

    data(){
        return{}
    },

    components: {
        HeaderHeroComponent,
        CardHeroComponent
    },
    methods: {
        
    }
}


</script>

<template>

    <section class="bg-image ">

        <HeaderHeroComponent />

        <div class="container-lg">
            <div class="row justify-content-center">
                <div class="col-md-12 py-4 d-flex justify-content-center card-container">
                    <CardHeroComponent/>
                </div>
                <div class="col-md-6 py-4 empty-container">

                </div>
            </div>
        </div>
    </section>

</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;


.bg-image{
    background-image: url('/background_image_deliveroo_variant.png');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
}




// large desktop
@media screen and (max-width: 2560px) {
    .card-container{
        width: 65%;
    }

    .empty-container{
        display:none;
    }
}

// desktop
@media screen and (max-width: 1440px) {
    .card-container{
        width: 65%;
    }

    .empty-container{
        display:none;
    }
}


// tablet
@media screen and (max-width: 769px) {
    .bg-image{
        background-image: url('/background_image_deliveroo_tablet_variant.png');
    }

    .card-container{
        width: 60%;
    }

    .empty-container{
        width: 40%;
        display: block;
    }

    .bg{
        background-position: left;
    }
}
// smartphone
@media screen and (max-width: 426px) {
    .card-container{
        width: 100%;
    }

    .empty-container{
        display: none;
    }
}


</style>