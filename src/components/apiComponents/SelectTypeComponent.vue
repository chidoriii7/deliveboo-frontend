<script>
import { store } from '../../store';
export default {
    name: 'SelectTypeComponent',
    props: {
        availableTypes: Array,
        selectedTypes: Array
    },
    data(){
        return{
            store
        }
    },
    methods: {
        // Metodo per emettere l'aggiornamento dei tipi selezionati
        toggleType(event, typeName) {
            const isSelected = this.selectedTypes.includes(typeName);

            // Creare un evento falso per seguire la struttura precedente
            const fakeEvent = { target: { checked: !isSelected } };
            this.$emit('update-selected-types', { event: fakeEvent, typeName });
        },

        // Metodo per verificare se il tipo è attivo
        isActive(typeName) {
            return this.selectedTypes.includes(typeName);
        },
        //comportamento di drag scrolling
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
    }
};
</script>

<template>

    <div class="scroll-container"
    ref="scrollContainer"
        @mousedown="onMouseDown"
        @mouseleave="onMouseLeave"
        @mouseup="onMouseUp"
        @mousemove="onMouseMove"
    >
        <div class="button-container">
            <div v-for="type in availableTypes" :key="type.id" :class="['button-item', { active: isActive(type.name) || store.types.includes(type.name) }]"
                @click="toggleType($event, type.name)">
                {{ type.name }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.scroll-container {
    overflow-x: auto;
    white-space: nowrap;
    padding: 10px 0;
    border-radius: 2rem;
    cursor: grab;
    user-select: none; /* Previene la selezione del testo durante il drag */
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
    @include button-radius
}

.scroll-container::-webkit-scrollbar {
    height: 8px;
}

.scroll-container::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-thumb:hover {
    background-color: #999;
}

</style>
