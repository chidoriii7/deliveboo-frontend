<script>
export default {
  name: "RestaurantListComponent",
  props: {
    results: Array,
  },
};
</script>

<template>
  <div class="py-3 head-title mt-4">
    <h1 class="title mb-3">Novità su Deliveboo</h1>
    <p class="sub-title">Scopri tutti i Menu disponibili nella tua città!</p>
  </div>

  <div class="cards-container row">
    <div
      v-for="restaurant in results"
      :key="restaurant.id"
      class="col-md-3 mb-3 shape-card">
      <div class="card">
        <div
          class="card-media"
          :style="{
            backgroundImage: `url(${
              restaurant.image_path_url || '/restaurant-placeholder.jpg'
            })`,
          }">
          <!-- <div class="discount">20% OFF</div>
          <div class="delivery-time"> mins</div> -->
        </div>
        <div class="card-description">
          <div class="about-place">
            <div class="place">
              <p class="place-name">{{ restaurant.name }}</p>
              <p class="place-speciality">
                {{ restaurant.types.map((type) => type.name).join(", ") }}
              </p>
            </div>
            <div class="place-review">
              <router-link
                :to="{ name: 'dishes', params: { slug: restaurant.slug } }"
                class="button">
                Menù
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "src/assets/partials/_variables.scss" as *;
@use "src/assets/partials/_mixin.scss" as *;

.title {
  @include title;
}

.button {
  @include button;
  @include shadow;
}

.button:hover {
  @include button-hover;
  @include shadow;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;

  .shape-card {
    width: calc(25% - 5px); // 4 colonne per schermi grandi

    @media (max-width: 1200px) {
      width: calc(33.33% - 5px); // 3 colonne per schermi fino a 1200px
    }

    @media (max-width: 1026px) {
      width: calc(50% - 5px); // 2 colonne per schermi fino a 1026px
    }

    @media (max-width: 992px) {
      width: calc(50% - 5px); // 2 colonne per schermi fino a 992px
    }

    @media (max-width: 769px) {
      width: calc(50% - 0px); // 2 colonne per schermi fino a 769px
    }

    @media (max-width: 426px) {
      width: calc(100% - 0px); // 1 colonna per schermi fino a 426px
    }
  }
}

.card {
  background-color: #fff;
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 0.4rem;
  margin-bottom: 20px;
  border: 1px solid #b5b5b570;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card .card-media {
  background-position: center;
  background-size: cover;
  height: 200px;
  width: 100%;
  object-fit: fit;
  border-radius: 0.4rem 0.4rem 0rem 0rem;
  position: relative;
}

.card .card-media .discount {
  font-size: 12px;
  background-color: $tertiary-color;
  position: absolute;
  bottom: 21%;
  padding: 2px 5px 2px 20px;
  border-radius: 0 4px 4px 0;
  max-width: 60px;
  left: 0;
  color: #fff;
  font-weight: 700;
}

.card .card-media .delivery-time {
  position: absolute;
  background-color: #f5f5f5;
  max-width: 60px;
  padding: 3px 6px;
  font-size: 12px;
  right: 3%;
  bottom: 6%;
  border-radius: 4px;
}

.card .card-description {
  padding: 10px;
}

.card .card-description .about-place {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card .card-description .about-place .place-name {
  font-weight: 600;
  padding-bottom: 10px;
  color: rgba(0, 0, 0, 0.87);
  font-family: "Poppins", sans-serif;
  font-size: 14px;
}

.card .card-description .about-place .place-speciality,
.card .card-description .about-place .per-person {
  font-size: 14px;
  color: $quinary-color;
  font-weight: 400;
}

.card .card-description .about-place .rating {
  font-size: 14px;
  border-radius: 4px;
  background-color: #0a6d0acc;
  color: #fff;
  font-weight: 700;
  text-align: center;
  padding: 2px 0;
  margin-bottom: 6px;
  margin-left: 30px;
}

@media (max-width: 769px) {
  .head-title {
    display: none;
  }
}
</style>
