<script>
export default {
    name: 'LoginCtaComponent',

    data() {

        return {}
    },
    component: {

    },
    methods: {

    }
}


</script>

<template>

    <a href="http://127.0.0.1:8000/login" class="btn user">
        <span class="cta-text">Partner Hub</span>
    </a>

</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;



.user {
    width: auto;
    background-color: $quaternary-color;
    color: $primary-color;
    font-weight: 500;
    font-size: 14px;
    @include border-solid;
}

.user:hover{
    background-color: $secondary-color;
    color: $quaternary-color;
}




@media only screen and (max-width: 768px) {
    body {
        background-color: lightblue;
    }
}
</style>