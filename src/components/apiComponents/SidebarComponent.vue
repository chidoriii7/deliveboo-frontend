<script>
import { store } from '../../store';
export default {
  name: 'SidebarComponent',
  props: {
    availableTypes: Array,
    selectedTypes: Array
  },
  data() {
    return {
      isAccordionOpen: true,
      store
    };
  },
  methods: {
    toggleAccordion() {
      this.isAccordionOpen = !this.isAccordionOpen;
    },
    updateSelectedTypes(event, typeName) {
      this.$emit('update-selected-types', { event, typeName });
    }
  }
};
</script>

<template>
  <div class="sidebar-intern">
    <div class="container p-5">
      <!-- Sezione immagine e città -->
      <div class="row align-items-center">
        <div class="col-auto">
          <img src="/rider.png" alt="rider" style="width: 100px; height: 100px;">
        </div>
        <div class="col-auto">
          <p>Adesso</p>
          <label class="fs-5 fw-bold">Milano</label>
        </div>
      </div>
      
      <hr>

      <!-- Toggle dell'accordion -->
      <div class="accordion-header d-flex align-items-center justify-content-between" @click="toggleAccordion" style="cursor: pointer;">
        <h5 class="mb-2 fw-bold">Cucine</h5>
        <div>
          <font-awesome-icon v-if="isAccordionOpen" icon="chevron-down" class="icon" />
          <font-awesome-icon v-else icon="chevron-up" class="icon" />
        </div>
      </div>

      <!-- Sezione delle checkbox, visibile solo se isAccordionOpen è true -->
      <div v-if="isAccordionOpen" class="mt-4">
        <div v-for="type in availableTypes" :key="type.id" class="form-check py-2">
          <div class="row">
            <div class="col-auto">
              <input 
                type="checkbox" 
                class="form-check-input custom-checkbox" 
                :id="'checkbox-' + type.id" 
                :value="type.name"
                :checked="selectedTypes.includes(type.name) || store.types.includes(type.name)" 
                @change="updateSelectedTypes($event, type.name)" 
              />
            </div>
            <div class="col-auto d-flex justify-content-start">
              <label :for="'checkbox-' + type.id" class="form-check-label">
                {{ type.name }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <hr>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.sidebar-intern {
  width: 100%;
}

.icon {
  font-size: 1.25rem;
  color: $primary-color;
}

.form-check-label {
  vertical-align: middle;
  color: $quinary-color;
  font-weight: 300;
  cursor: pointer;
}

input:focus{
  border-color: orange; /* Colore del bordo quando attivo */
  box-shadow: 0 0 5px rgba(255, 165, 0, 0.5); /* Effetto ombra */
}

.custom-checkbox {
  width: 1.2rem;
  height: 1.2rem;
  appearance: none;
  border: 2px solid $quinary-color;
  border-radius: 0.25rem;
  position: relative;
  vertical-align: middle;
  cursor: pointer;

  &:checked {
    background-color: $primary-color;
    border-color: $primary-color;
  }
}

hr {
  color: $primary-color;
}

@media (max-width: 1025px){

  .sidebar-intern {
    width: 100%;
  }
  

}

</style>
