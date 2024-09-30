<script>
import axios from 'axios';
import { store } from '../../store';
import SidebarComponent from './SidebarComponent.vue';
import RestaurantListComponent from './RestaurantListComponent.vue';
import SelectTypeComponent from './SelectTypeComponent.vue';

export default {
  name: 'RestaurantCardComponent',
  components: {
    SidebarComponent,
    RestaurantListComponent,
    SelectTypeComponent
  },
  props: {
    types: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      results: [], // Risultati dei ristoranti
      apiRestaurant: `${store.url}${store.restaurants}`, // URL API dei ristoranti
      selectedTypes: [], // Tipi selezionati per i filtri
      availableTypes: [],
      store // Tipi di cucina disponibili per le checkbox
    };
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
    },

    getRestaurants() {
      let filterUrl = this.apiRestaurant;

      if (this.selectedTypes.length > 0 && this.store.types.length) {
        const typesQuery = this.selectedTypes.join(',');
        const typesStore = this.store.types.join(',');
        filterUrl += `?types=${typesQuery}`+','+ typesStore;
      }else if(this.selectedTypes.length > 0) {
        const typesQuery = this.selectedTypes.join(',');
        filterUrl += `?types=${typesQuery}`;
      }else if(this.store.types.length){
        const typesQuery = this.store.types.join(',');
        filterUrl += `?types=${typesQuery}`
      }

      console.log(filterUrl);

      axios.get(filterUrl)
        .then(response => {
          this.results = response.data;
        })
        .catch(error => {
          console.error('Errore nel recupero dei ristoranti:', error);
        });
    },

    updateSelectedTypes({ event, typeName }) {
      const selected = event.target.checked;

      if (selected) {
        this.selectedTypes.push(typeName);
      } else {
        this.selectedTypes = this.selectedTypes.filter(name => name !== typeName);
        if(this.store.types.length)
          this.store.types = this.store.types.filter(name => name !== typeName);
      }

      // Salva i tipi selezionati nel local storage
      localStorage.setItem('selectedTypes', JSON.stringify(this.selectedTypes));

      this.getRestaurants();
    }
  },

  mounted() {
    this.getTypes();

    // Recupera i tipi selezionati dal local storage se presenti
    const savedTypes = localStorage.getItem('selectedTypes');
    if (savedTypes) {

      this.selectedTypes = JSON.parse(savedTypes);
      console.log('Tipi recuperati dal local storage:', this.selectedTypes);

    } else if (this.selectedTypes.length === 0) {
      
      this.selectedTypes = [...this.types]; // Copia i valori di 'types'
      console.log('Tipi impostati dalla prop types:', this.selectedTypes);
    }

    this.getRestaurants();
  },

  watch: {
    types(newTypes) {
      this.selectedTypes = [...newTypes];
    }
  }
};
</script>


<template>
  <div class="col-md-12 selectType margin-top">
    <div class="container-fluid ">
      <div class="py-2">
        <h1 class="title mb-3 ms-2 py-3">Novità su Deliveboo</h1>
        <p class="sub-title ms-2"> Scrolla sulle tipologie e trova quello che ti piace!</p>
      </div>
    </div>

    <div class="container-fluid">
      <SelectTypeComponent :availableTypes="availableTypes" :selectedTypes="selectedTypes"
        @update-selected-types="updateSelectedTypes" />
    </div>
  </div>

  <div class="container-fluid margin-top-content">
    <div class="row">
      <!-- Sidebar per il filtro -->
      <div class="col-3 sidebar">
        <div class="row">
          <SidebarComponent :availableTypes="availableTypes" :selectedTypes="selectedTypes"
          @update-selected-types="updateSelectedTypes" />
        </div>
      </div>

      <!-- Area dei ristoranti -->
      <div class="col-9 content">
        <RestaurantListComponent :results="results" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.margin-top{
  margin-top: 5rem;
}
.margin-top-content{
  margin-top: 5rem;
}

.row {
  height: 100%;
}


.content {
  overflow-y: auto;
  height: 100vh;
}

.content::-webkit-scrollbar {
  display: none;
}

.title {
  @include title
}


@media only screen and (max-width: 1025px){

  .sidebar{
    width: 40%;
  }

  .content{
    width: 60%;
  }

}

// Nascondi SelectType su schermi più grandi di 768px (laptop e desktop)
@media only screen and (min-width: 769px) {
  .selectType {
    display: none;
  }
}

// Mostra SelectType su schermi più piccoli o uguali a 768px (smartphone e tablet)
@media only screen and (max-width: 768px) {
  .selectType {
    display: block;
  }
}


// Nascondi Sidebar su schermi più piccoli di 768px (tablet e smartphone)
@media only screen and (max-width: 768px) {
  .sidebar {
    display: none;
  }

  .content {
    width: 100%;
  }
  
}

@media (max-width: 768px) {
  .margin-top-content{
  margin-top: 2rem;
  }
}
</style>
