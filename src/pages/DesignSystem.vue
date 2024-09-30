<script>

import HeaderComponent from '../components/headers/HeaderComponent.vue';
import HeroComponent from '../components/hero/HeroComponent.vue';
import MapCardComponent from '../components/cards/MapCardComponent.vue';
import CarouselComponent from '../components/containers/CarouselComponent.vue';
import FooterComponent from '../components/footers/FooterComponent.vue';
import ServiceComponent from '../components/containers/ServiceComponent.vue';
import OffersComponent from '../components/containers/OffersComponent.vue';
import CarouselContainerComponent from '../components/containers/CarouselContainerComponent.vue';

export default {
    name: 'DesignSystem',

    components:{
        HeaderComponent,
        HeroComponent,
        MapCardComponent,
        CarouselComponent,
        CarouselContainerComponent,
        ServiceComponent,
        OffersComponent,
        FooterComponent
    },
}

</script>

<template>
    <section class="mb-3">
        <div class="container py-5">
        <div class="row">
            <div class="col-md-12">
                <h3 class="text-light mb-3">Design system</h3>
                <p class="text-light fw-light">Questa è la pagina dedicata al design system <br>
                    qui potrete trovare una lista di componenti globali e riutilizzabili in modo <br>
                    che il progetto possa mantenere una coerenza stilistica</p>
            </div>
        </div>
    </div>

    <!-- header -->
    <div class="container">
        <div class="col md-12">
            <h5 class="text-light">Header white filled</h5>
            <p class="text-light">Header presente all'interno del sito, dopo la home page</p>
        </div>
    </div>
    <div class="mb-3">
        <HeaderComponent/>
    </div>

    <!-- hero -->
    <div class="container">
        <div class="col md-12">
            <h5 class="text-light">Hero with header transparent</h5>
            <p class="text-light">Hero presente in Hompage, con all interno il componente Header Transaparente</p>
        </div>
    </div>
    <div class="mb-3">
       <HeroComponent/> 
    </div>

    <!-- MapCard -->
    <div class="container">
        <div class="col md-12">
            <h5 class="text-light">Map Card</h5>
        </div>
    </div>
    <div class="mb-3">
       <MapCardComponent/> 
    </div>

    <!-- carosello -->
    <div class="container">
        <div class="col md-12">
            <h5 class="text-light">Container Caroselli</h5>
            <p class="text-light">Carosello in Homepage</p>
        </div>
    </div>
    <div>
        <CarouselContainerComponent/>
    </div>


    <!-- service component -->
    <div class="container mt-3">
        <div class="col md-12">
            <h5 class="text-light">Offers Component</h5>
            <p class="text-light">sezione offerta</p>
        </div>
    </div>
    <section>
        <OffersComponent/>
    </section>

    <!-- service component -->
    <div class="container mt-3">
        <div class="col md-12">
            <h5 class="text-light">Service component</h5>
            <p class="text-light">sezione service con card</p>
        </div>
    </div>
    <section>
        <ServiceComponent/>
    </section>

    <!-- cards -->
    <div class="container mt-3">
        <div class="col md-12">
            <h5 class="text-light">Footer</h5>
            <p class="text-light">Footer HomePage</p>
        </div>
    </div>
    <section>
        <FooterComponent/>
    </section>

    </section>

</template>

<style lang="scss" scoped>

</style>