<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // Importa FontAwesomeIcon
import FooterCardComponent from './FooterCardComponent.vue';

export default {
    name: 'FooterComponent',

    data() {
        return {};
    },
    components: {
        FontAwesomeIcon,
        FooterCardComponent
    },
    methods: {}
};
</script>

<template>
    <section class="bg-footer py-2">
        <div class="container">
            <div class="row justify-content-center">
                <FooterCardComponent />
            </div>

            <div class="col-md-12 d-flex">
                <div class="col-md-6 py-2">
                    <!-- icone instagram, facebook e twitter -->
                    <FontAwesomeIcon :icon="['fab', 'facebook']" class="me-3 icon" style="height: 1.3rem;" />
                    <FontAwesomeIcon :icon="['fab', 'x-twitter']" class="me-3 icon" style="height: 1.3rem;" />
                    <FontAwesomeIcon :icon="['fab', 'instagram']" class="me-3 icon" style="height: 1.3rem;" />
                    <FontAwesomeIcon :icon="['fab', 'youtube']" class="me-3 icon" style="height: 1.3rem;" />

                </div>

                <div class="col-md-6 py-2 text-end">
                    <!-- copyright -->
                    <p class="copyright">
                        &copy; 2024 Deliveboo
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.bg-footer {
    background-color: $secondary-color;
}

.copyright {
    color: $border-light;
    font-size: 0.8rem;
}

.icon {
    color: $quaternary-color;
}
</style>
