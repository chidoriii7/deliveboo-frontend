<script>

//contenitore padre della pagina index ristorante

import RestaurantCardComponent from '../components/apiComponents/RestaurantCardComponent.vue';
import HeaderEmptyComponent from '../components/headers/HeaderEmptyComponent.vue';
import FooterComponent from '../components/footers/FooterComponent.vue';

export default {
    name: 'restaurant' ,

    data(){
    return{
    }
    },
    components: {
        RestaurantCardComponent,
        HeaderEmptyComponent,
        FooterComponent
    },
    methods: {
    },
    computed:{
            type() {
            // Accedi al parametro 'dato' dalla rotta
            return this.$route.params.type ? this.$route.params.type.split(',') : []; // Divide la stringa in un array
            //return this.$route.params.type
            }
        }
}

</script>

<template>
    <div class="body">
        <HeaderEmptyComponent/>
        <RestaurantCardComponent :types="type" class="boh" />
        <FooterComponent/> 
    </div>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.body{
    overflow-x: hidden;
    height: 100vh;
}

.boh{
    margin-top: 3000px;
}


</style>
