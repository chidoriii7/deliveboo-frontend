
<script>
import axios from 'axios';
import { store } from '../../store';
import SearchBarComponent from '../search-bar/SearchBarComponent.vue';



export default {
    name: 'CardHeroComponent' ,

    data(){
    return{}
    },
    components: {
        SearchBarComponent
    },
    methods: {
        getTypes() {
      const typesUrl = `${store.url}types`;
      axios.get(typesUrl)
        .then(response => {
          this.availableTypes = response.data;
        })
        .catch(error => {
          console.error('Errore nel recupero dei tipi:', error);
        });
    }
    }
}


</script>

<template>

    <div class="container py-5">
        <div class="row">
            <div class="col-md-12 text-center mb-4">
                <h1 class="title">
                    I piatti dei ristoranti che ami e la spesa, a domicilio
                </h1>
            </div>
            <div class="col-md-12">
                <div class="custom-card">

                    <h1 class="title-sm mb-3">
                    I piatti dei ristoranti che ami e la spesa, a domicilio
                    </h1>

                    <p class="label new mb-3">
                        Scegli prima la tipologia di ristorante
                    </p>
                    <SearchBarComponent/>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.new{
    color: $secondary-color;
    font-weight: 500;
}

.title{
    font-size: 2.8rem;
    font-weight: 700;
    line-height: 3.5rem;
}

.title-sm{
    display: none;
}

.custom-card{
    padding: 2.5rem;
    background-color: $quaternary-color;
    box-shadow: 0 6px 6px  rgba(0, 0, 0, 0.1);  
    @include border-solid
}

//tablet
@media screen and (max-width: 768px) {

    .title{
        font-size: 1.5rem;
        text-align: start;
        line-height: 2rem;
    }

    .title-sm{
        display:none;
    }

    .label{
        font-size: 0.9rem;
    }

}

@media screen and  (max-width: 426px) {

    .title{
        display: none;
    }

    .title-sm{
        font-size: 1.2rem;
        text-align: start;
        display:block;
        font-weight: 700;
    }
}

//smartphone
@media screen and (max-width: 376px) {

    .title{
        display: none;
    }

    .title-sm{
        font-size: 1.2rem;
        text-align: start;
        display:block;
        font-weight: 600;
    }

    .label{
        font-size: 1rem;
        display: block;
    }

}


</style>