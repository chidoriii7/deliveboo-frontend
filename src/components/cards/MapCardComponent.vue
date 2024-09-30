<script>
export default {
    name: 'MapCardComponent',

    data(){
    return{}
    },
    components: {

    },
    methods: {
        
    }
}


</script>

<template>
    <section class="bg-light py-5">
        <div class="container custom-card bg-light margin">
            <div class="row">
                <div class="col-md-5 p-5 orange-col">
                    <h2 class=" title mb-4">Segui gli ordini passo passo</h2>
                    <p class="mb-5">I piatti e i prodotti che ami, consegnati in pochissimo tempo. Vedrai quando il rider ha ritirato l'ordine, che potrai seguire passo passo, e riceverai una notifica quando sarà quasi da te.</p>
                    <div class="row">
                        <div class="col-md-6 bg-danger">

                        </div>
                        <div class="col-md-6 bg-primary">

                        </div>
                    </div>

                </div>

                <div class="col-md-7 bg-danger text-end map-side">
                    <img src="https://img2.storyblok.com/filters:format(webp)/f/62776/731x276/e6a58efba4/notification-itit.png"  alt="" class="baloon">
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.title{
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 3.5rem;
    color: $quaternary-color;
}

.orange-col{
    background-image: url('/offers.png');
    border-radius: 0.5rem 0 0 0.5rem;
}

p{
    color: $quaternary-color;
}

.map-side{
    background-image: url('https://img2.storyblok.com/filters:format(webp)/f/62776/x/ca59b51c51/map-min.svg');
    object-fit: cover;
    border-radius: 0.5rem;
}

.baloon{
    width: 60%;
}

.download{
    width: 100%;
}

.custom-card{

    border-radius: 10px;
    box-shadow: 0 6px 6px  rgba(0, 0, 0, 0.1);  
}

//tablet
@media screen and (max-width: 768px) {
    .map-side{
        width: 100%;
        padding: 5.5rem;
    }

    .title{
        font-size: 1.2rem;
        line-height: 2rem;
    }

    .orange-col{
        width: 100%;
        border-radius: 0.5rem 0.5rem 0 0;
    }

    .download{
        width: 50%;
    }

}

</style>