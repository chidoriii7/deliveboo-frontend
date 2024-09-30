<script>
import CardServiceComponent from '../cards/CardServiceComponent.vue';

export default {
    name: 'ServiceComponent' ,

    data(){
    return{}
    },
    components: {
        CardServiceComponent
    },
    methods: {
        
    }
}


</script>

<template>

    <section class="bg-color py-5">
        <div class="container">
            <CardServiceComponent/>
        </div>
    </section>

</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.bg-color{
    background-color: $quaternary-color;
}
</style>
