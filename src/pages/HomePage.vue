<script>

import HeroComponent from '../components/hero/HeroComponent.vue';
import MapCardComponent from '../components/cards/MapCardComponent.vue';
import FooterComponent from '../components/footers/FooterComponent.vue';
import ServiceComponent from '../components/containers/ServiceComponent.vue';
import OffersComponent from '../components/containers/OffersComponent.vue';
import CarouselContainerComponent from '../components/containers/CarouselContainerComponent.vue';



export default {
    components: {

        HeroComponent,
        CarouselContainerComponent,
        MapCardComponent,
        OffersComponent,
        ServiceComponent,
        FooterComponent

    }
}

</script>

<template>

    <HeroComponent/>
    <CarouselContainerComponent/>
    <MapCardComponent/> 
    <OffersComponent/>
    <ServiceComponent/> 
    <FooterComponent/>



</template>

<style lang="scss" scoped></style>