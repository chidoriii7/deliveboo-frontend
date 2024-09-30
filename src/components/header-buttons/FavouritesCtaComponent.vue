<script>
export default {
    name:'FavouritesCtaComponent' ,

    data(){
    return{}
    },
    component: {

    },
    methods: {
        
    }
}


</script>

<template>
    <button class="btn bg-light favorites mx-2">
        <font-awesome-icon :icon="['fas', 'heart']" class="icon"/>
    </button>
</template>

<style lang="scss" scoped>

@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.icon{
    color:$primary-color;
}

.favorites{
    width: 30% ;
    @include border-solid;
}

button {
    @include shadow
}

</style>