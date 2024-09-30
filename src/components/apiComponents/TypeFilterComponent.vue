<script>
import axios from 'axios';
import { store } from '../../store';

export default {
  name: 'TypeFilterComponent',
  props: {
    selectedTypes: Array, // Passata come prop dal componente genitore
  },
  data() {
    return {
      availableTypes: [], // Qui carichi i tipi dal server
    };
  },
  methods: {
    // Esegui la chiamata per ottenere i tipi dall'API
    getTypes() {
      const typesUrl = `${store.url}${store.types}`;
      axios.get(typesUrl)
        .then( response => {
        console.log('selezione avvenuta con successo')
          this.availableTypes = response.data;
        })
        .catch(error => {
          console.error('Errore nel recupero dei tipi:', error);
        });
    },
    // Aggiorna i tipi selezionati e viene notficato al genitore
    updateSelectedTypes(event, typeId) {
      const selected = event.target.checked;

      if (selected) {
        this.$emit('filterTypes', [...this.selectedTypes, typeId]); // Aggiungi il tipo selezionato
        console.log('il tipo selezionato è stato aggiunto'  +' '+ typeId);


      } else {
        this.$emit('filterTypes', this.selectedTypes.filter(id => id !== typeId)); // Rimuovi il tipo deselezionato
        console.log('il tipo selezionato è stato rimosso'   +' '+ typeId);

      }
    },
  },
  mounted() {
    this.getTypes();
  },
};
</script>

<template>
  <div>
    <h3>Filtra per Tipi</h3>
    <div v-for="type in availableTypes" :key="type.id">
      <input 
        type="checkbox"
        :value="type.id"
        :checked="selectedTypes.includes(type.id)"
        @change="updateSelectedTypes($event, type.id)"
      />
      {{ type.name }}
    </div>
  </div>
</template>


<style lang="scss" scoped>
  .filter-container {
    margin-bottom: 20px;
  }
</style>
