<script>
export default {
    name: 'OffersComponent' ,

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

    <section class="py-5 bg-image">
        <div class=" d-flex align-items-center py-5">
            <div class="container  ">
                <div class="row ">
                    <div class="col-md-2 ">
                        <div class="sparks">
                            <img src="/sparkles.png" alt="Sparkles" class="rotated-image" />
                        </div>
                    </div>
                    <div class="col-md-8 text-center">
                        <h2 class="text-light title mb-4">Menù in offerta: sconti fino al 25%</h2>
    
                        <p class="text-light text mb-3">Perfetti per dare più gusto alla tua settimana, ordinare i piatti più amati da tutta la famiglia e fare una pausa dai fornelli.</p>
    
                        <p class="text-light fw-light disclaim">Si applicano spese di consegna e di servizio. Offerta soggetta a disponibilità, solo per ristoranti aderenti all'iniziativa. Si applicano termini e condizioni, consultabili qui. <span class="text-underline">Termini e condizioni qui.</span></p>
    
                    </div>
                    <div class="col-md-2 ">
                        <div class="sparks">
                            <img src="/sparkles.png" alt="Sparkles" class="rotated-image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="col-md-12 food-illustration"></div> -->
    </section>

</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.title{
    font-size: 3.9rem;
    font-weight: 700;
}

.text{
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.5rem;
}

.disclaim{
    font-size: 0.9rem;
}
    


.bg-image{
    background-image: url('/offers.png');
    height: 100%;
}

.sparks {
  position: relative;
  width: 100%; // esempio di larghezza
  height:100%; // esempio di altezza
}

.rotated-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: auto;
  object-fit: cover;
  transform: rotate(45deg); /* Ruota di 45 gradi */
}

//tablet
@media screen and (max-width: 768px) {
    .title{
        font-size: 2.5rem;
    }

    .text{
        line-height: 1.8rem;
    }

    .disclaim{
        font-size: 0.8rem;
    }
}

//mediaquery funzionale
@media screen and (max-width: 766px) {
    .sparks{
        display: none;
    }
}




</style>