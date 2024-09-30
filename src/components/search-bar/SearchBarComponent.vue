<script>
import axios from 'axios';
import { store } from '../../store';

export default {
    name: 'SearchBarComponent',
    data() {
        return {
            availableTypes: [], // Dati ricevuti dall'API
            selectedTypes: [],  // Dati delle checkbox selezionate
            isDown: false, // Stato per il drag scrolling
            startX: 0,
            scrollLeft: 0,
            store
        };
    },
    methods: {
        getTypes() {
            const typesUrl = `${store.url}${store.type}`;
            axios
                .get(typesUrl)
                .then((response) => {
                    console.log('Tipi raccolti correttamente');
                    this.availableTypes = response.data;
                })
                .catch((error) => {
                    console.error('Errore nel recupero dei tipi:', error);
                });
        },

        toggleType(event, typeName) {
            const isSelected = this.selectedTypes.includes(typeName);
            if (isSelected) {
                this.selectedTypes = this.selectedTypes.filter(type => type !== typeName);
            } else {
                this.selectedTypes.push(typeName);
            }
        },

        getPageReciveData() {
            // Verifica se non sono stati selezionati tipi
            if (this.selectedTypes.length === 0) {
                this.store.types = [];
                this.$router.push({
                    name: 'restaurant'
                });
            } else {
                // Memorizza i tipi selezionati nello store e reindirizza con i tipi selezionati
                this.store.types = this.selectedTypes;
                this.$router.push({
                    name: 'restaurant'
                });
            }
        },

        isActive(typeName) {
            return this.selectedTypes.includes(typeName);
        },

        // Aggiunge il comportamento di "drag scrolling"
        onMouseDown(e) {
            this.isDown = true;
            this.startX = e.pageX - this.$refs.scrollContainer.offsetLeft;
            this.scrollLeft = this.$refs.scrollContainer.scrollLeft;
        },
        onMouseLeave() {
            this.isDown = false;
        },
        onMouseUp() {
            this.isDown = false;
        },
        onMouseMove(e) {
            if (!this.isDown) return;
            e.preventDefault();
            const x = e.pageX - this.$refs.scrollContainer.offsetLeft;
            const walk = (x - this.startX) * 2; // Velocità dello scrolling
            this.$refs.scrollContainer.scrollLeft = this.scrollLeft - walk;
        }
    },
    mounted() {
        this.getTypes();
    }
};
</script>

<template>
    <div
        class="scroll-container"ref="scrollContainer"
        @mousedown="onMouseDown"
        @mouseleave="onMouseLeave"
        @mouseup="onMouseUp"
        @mousemove="onMouseMove"
    >
        <div class="button-container">
            <div
                v-for="type in availableTypes"
                :key="type.id"
                :class="['button-item', { active: isActive(type.name) }]"
                @click="toggleType($event, type.name)"
            >
                {{ type.name }}
            </div>
        </div>
    </div>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-12 d-flex justify-content-center">
                <button @click="getPageReciveData" class="btn button">
                    <span>Inizia a Ordinare!</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.button{
    @include button;
    border-radius:1.5rem;
}
.button:hover{
    @include button-hover;
    border-radius:1.5rem;
   
}


.scroll-container {
    overflow-x: auto;
    white-space: nowrap;
    padding: 10px 0;
    border-radius: 2rem;
    cursor: grab;
    user-select: none; 
}

.scroll-container::-webkit-scrollbar{
    display: none;
}

.scroll-container:active {
    cursor: grabbing;
}

.button-container {
    display: inline-flex;
    gap: 10px;
}

.button-item {
    padding: 10px 20px;
    background-color: $tertiary-color;
    color: $quaternary-color;
    border-radius: 1.5rem;
    cursor: pointer;
    font-size: 14px;
    display: inline-block;
    white-space: normal;
}

.button-item.active {
    @include button-radius;
}

.button-item:hover {
    background-color: $primary-color;
    @include shadow;
    color: $quaternary-color;
}

.scroll-container::-webkit-scrollbar {
    height: 8px;
}


@media (max-width: 768px ){
    .button-item {
    padding: 6px 12px;
    background-color: $tertiary-color;
    color: $quaternary-color;
    border-radius: 1.5rem;
    cursor: pointer;
    font-size: 14px;
    display: inline-block;
    white-space: normal;
    }

    .button-item:hover {
        background-color: $primary-color;
        @include shadow;
        color: $quaternary-color;
    }

}

</style>
