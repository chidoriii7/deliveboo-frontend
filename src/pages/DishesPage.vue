<script>
import axios from "axios";
import { store } from "../store";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";

// Importa i componenti header e footer
import HeaderEmptyComponent from "../components/headers/HeaderEmptyComponent.vue";
import FooterComponent from "../components/footers/FooterComponent.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "RestaurantDetailPage",
  components: {
    HeaderEmptyComponent,
    FontAwesomeIcon,
    FooterComponent,
  },

  data() {
    return {
      restaurant: {}, // Dettagli del ristorante
      totale: null,
      lastName: null,
      store, // Totale prezzo carrello
    };
  },
  methods: {
    // Recupera i dettagli del ristorante dal backend
    getRestaurantDetails() {
      const slug = this.$route.params.slug; // Prende lo "slug" dalla route
      const apiUrl = `${store.url}${store.restaurants}${slug}`; // Costruisce l'URL dell'API

      axios
        .get(apiUrl)
        .then((response) => {
          this.restaurant = response.data; // Assegna i dati del ristorante

          // Verifica se esiste già un carrello e se appartiene allo stesso ristorante
          if (localStorage.getItem("cart")) {
            if (localStorage.getItem("lastRestaurant") == this.restaurant.id) {
              this.store.cart = JSON.parse(localStorage.getItem("cart")); // Recupera carrello
              this.totale = JSON.parse(localStorage.getItem("tot")); // Recupera totale
            } else {
              this.store.cart = [];
              this.lastName = JSON.parse(
                localStorage.getItem("lastRestaurantName")
              );
            }
          }
        })
        .catch((error) => {
          console.error(
            "Errore nel recupero dei piatti del ristorante:",
            error
          );
        });
    },

    // Conferma l'aggiunta del piatto al carrello o richiede conferma se il carrello è di un altro ristorante
    confirim(dish) {
      if (
        localStorage.getItem("lastRestaurant") &&
        localStorage.getItem("lastRestaurant") != this.restaurant.id
      ) {
        // Conferma di svuotare il carrello precedente
        const myModal = new Modal(document.getElementById("confirm"));
        myModal.show();
      } else {
        this.addToCart(dish); // Aggiunge il piatto se è lo stesso ristorante
      }
    },

    // Aggiunge un piatto al carrello
    addToCart(dish) {
      this.totale = 0; // Reset totale
      const obj = {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        quantity: 1, // Aggiungi una porzione
      };

      // Verifica se il piatto è già presente nel carrello
      if (this.store.cart.length) {
        let ciclo = false;
        this.store.cart.forEach((cartDish) => {
          if (cartDish.name == obj.name) {
            cartDish.quantity += obj.quantity; // Aumenta quantità se esiste già
            ciclo = true;
            return ciclo;
          }
        });
        if (!ciclo) this.store.cart.push(obj); // Aggiungi nuovo piatto
      } else {
        this.store.cart.push(obj); // Aggiunge il primo piatto
      }

      // Aggiorna il localStorage con i dati del carrello
      localStorage.setItem("cart", JSON.stringify(this.store.cart));
      localStorage.setItem(
        "lastRestaurant",
        JSON.stringify(this.restaurant.id)
      );
      localStorage.setItem(
        "lastRestaurantName",
        JSON.stringify(this.restaurant.name)
      );
      this.calcoloTotale();
      this.store.lastCart = this.store.cart;
    },

    // Svuota completamente il carrello
    deleteCart() {
      this.store.cart = [];
      this.store.lastCart = [];
      this.totale = null;
      localStorage.clear(); // Cancella tutto dal localStorage
    },

    // Calcola il totale dei piatti nel carrello
    calcoloTotale() {
      this.totale = 0; // Reset del totale
      this.store.cart.forEach((cartDish) => {
        this.totale += parseFloat(cartDish.price) * cartDish.quantity; // Somma dei prezzi
      });
      localStorage.setItem("tot", JSON.stringify(this.totale)); // Salva il totale
    },

    // Rimuove una porzione o un piatto intero dal carrello
    deleteSingleDish(dish, index) {
      if (dish.quantity > 1) {
        dish.quantity--; // Diminuisci la quantità solo se è maggiore di 1
      } else {
        this.store.cart.splice(index, 1); // Rimuove il piatto se la quantità è 1
      }
      this.calcoloTotale(); // Aggiorna il totale
      if (this.store.cart)
        localStorage.setItem("cart", JSON.stringify(this.store.cart));
      else localStorage.clear();
      this.store.lastCart = this.store.cart;
    },
  },

  // Chiama la funzione per ottenere i dettagli del ristorante appena il componente è montato
  mounted() {
    this.getRestaurantDetails();
  },
};
</script>

<template>
  <HeaderEmptyComponent />
  <div class="margin">
    <div class="container py-5">
      <div class="mb-3 margin-top">
        <router-link
          class="text-decoration-none fw-bold d-flex align-items-center"
          :to="{ name: 'restaurant' }">
          <FontAwesomeIcon
            :icon="['fas', 'arrow-left']"
            class="me-2 icon go-back" />
          <span class="go-back">Pagina ristoranti</span>
        </router-link>
      </div>

      <div class="row" v-if="restaurant">
        <div class="col-md-4 mb-3">
          <div class="img-container">
            <img
              :src="restaurant.image_path_url || '/restaurant-placeholder.jpg'"
              alt="Immagine del ristorante"
              class="img" />
          </div>
        </div>
        <div class="col-md-8 d-flex align-items-center">
          <div>
            <h1 class="title">{{ restaurant.name }}</h1>
            <p class="card-text">{{ restaurant.address }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container py-3 mb-5">
    <div class="row">
      <div
        class="col-lg-8 py-3 scroll margin-phone"
        v-if="restaurant.dishes && restaurant.dishes.length">
        <div class="row">
          <div
            v-for="dish in restaurant.dishes.filter(
              (dish) => dish.visible === 1
            )"
            :key="dish.id"
            class="card-custom mb-3 me-2"
            style="height: 100%">
            <div class="row">
              <div
                class="col-md-2 py-5 dish-image"
                :style="{
                  backgroundImage: `url(${
                    dish.image_path_url || '/dish-placeholder.jpg'
                  })`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }"></div>

              <div
                style="height: 175px"
                class="col-md-8 py-2 card-body-container">
                <div class="card-body">
                  <h5 class="card-title mb-3">{{ dish.name }}</h5>
                  <p class="card-text">{{ dish.description }}</p>
                  <div
                    class="d-flex align-items-center justify-content-between">
                    <p class="card-text">{{ dish.price }}€</p>
                    <div class="ms-5 d-flex gap-4">
                      <span v-if="dish.gluten_free === 1">
                        <FontAwesomeIcon
                          :icon="['fas', 'wheat-awn-circle-exclamation']"
                          size="xs"
                          style="color: #7a7a7aba" />
                      </span>
                      <span
                        v-if="dish.lactose_free === 1"
                        style="position: relative; display: inline-block">
                        <FontAwesomeIcon
                          :icon="['fas', 'cow']"
                          size="xs"
                          style="color: #7a7a7aba" />
                        <span
                          style="
                            position: absolute;
                            top: 9px;
                            left: -3px;
                            width: 140%;
                            height: 3px;
                            background-color: #7a7a7aba;
                            transform: rotate(-45deg);
                            transform-origin: center;
                            border-radius: 2px;
                          "></span>
                      </span>
                      <span v-if="dish.spicy === 1">
                        <FontAwesomeIcon
                          :icon="['fas', 'pepper-hot']"
                          size="xs"
                          style="color: #7a7a7aba" />
                      </span>
                      <span v-if="dish.vegan === 1">
                        <FontAwesomeIcon
                          :icon="['fas', 'leaf']"
                          size="xs"
                          style="color: #7a7a7aba" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="col-md-2 py-3 d-flex justify-content-center align-items-center btn button buy-cta"
                @click="confirim(dish)">
                <font-awesome-icon
                  :icon="['fas', 'cart-shopping']"
                  class="text-white" />
              </div>
              <!-- Modale -->
              <div
                class="modal fade"
                id="confirm"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="title fs-5" id="exampleModalLabel">
                        Vuoi creare un nuovo carrello?
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <p>
                        Cosí eliminerai il tuo precedente ordine da
                        <strong>{{ lastName }}</strong> e creerai uno nuovo da
                        <strong>{{ restaurant.name }}</strong>
                      </p>
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                      <button
                        type="button"
                        class="px-3 bg-custom-secondary fs-6 border border-none me-2 mt-2 text-white"
                        data-bs-dismiss="modal">
                        Annulla
                      </button>
                      <button
                        type="button"
                        class="px-3 bg-custom-primary fs-6 border border-none me-2 mt-2 text-white"
                        @click="addToCart(dish)"
                        data-bs-dismiss="modal">
                        Continua
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Non ci sono piatti disponibili</p>
      </div>

      <!-- Carrello side -->
      <div class="col-lg-4 col-md-12 cart cart-side py-3">
        <div v-if="store.cart.length" class="recap-container-tablet mt-3">
          <p class="recap-text-tablet" style="font-weight: 800">
            Costo totale: €{{ totale }}
          </p>
        </div>
        <div class="p-4 info-cart">
          <div v-for="(dish, index) in store.cart" class="d-flex" :key="dish">
            <div class="col-6 py-1">
              <div v-if="dish.quantity > 1">
                <p class="m-0 dishes" style="font-weight: 800; font-size: 16px">
                  {{ dish.quantity }} x {{ dish.name }}
                </p>
              </div>
              <div v-else>
                <p class="m-0 dishes" style="font-weight: 800; font-size: 16px">
                  {{ dish.quantity }} x {{ dish.name }}
                </p>
              </div>
              <hr />
            </div>
            <div class="col-6 d-flex justify-content-end py-1">
              <button
                class="btn recap-buttons text-white me-3"
                style="font-weight: 500; height: 40px; width: 40px"
                @click="deleteSingleDish(dish, index)">
                -
              </button>
              <button
                class="btn recap-buttons text-white ms-3"
                style="font-weight: 500; height: 40px; width: 40px"
                @click="addToCart(dish)">
                +
              </button>
            </div>
          </div>
        </div>
        <div v-if="store.cart.length" class="text-center total-static-cart">
          <p class="total">Totale: €{{ totale }}</p>
          <div class="d-flex justify-content-center">
            <button
              type="button"
              class="btn button-cart"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal">
              Svuota ordine
            </button>
            <router-link :to="{ name: 'payPage' }" class="btn button-cart mx-3"
              >Conferma ordine</router-link
            >
          </div>
        </div>
        <div v-else class="d-flex justify-content-center align-items-center">
          <span class="text-empty-cart" style="font-weight: 800"
            >Di cosa hai voglia?</span
          >
        </div>
      </div>
    </div>

    <!-- Modale -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="title fs-5" id="exampleModalLabel">Svuota ordine</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Sei sicuro di voler eliminare l'ordine in corso?</p>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button
              type="button"
              class="btn modal-button"
              @click="deleteCart()"
              data-bs-dismiss="modal">
              Svuota
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <FontAwesomeIcon />
  <FooterComponent />
</template>

<style lang="scss" scoped>
@use "src/assets/partials/_variables.scss" as *;
@use "src/assets/partials/_mixin.scss" as *;

.bg-custom-primary {
  background-color: $primary-color;
  border-radius: 0.5rem;
  text-decoration: none;
  padding-top: 5px;
  padding-bottom: 5px;
}

.bg-custom-secondary {
  background-color: $secondary-color;
  border-radius: 0.5rem;
  text-decoration: none;
  padding-top: 5px;
  padding-bottom: 5px;
}

.margin-top {
  margin-top: 4rem;
}

.go-back {
  color: $quinary-color;
  font-weight: 400;
}

//container principale
.margin {
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 1.5rem;
  border-bottom-right-radius: 1.5rem;
}

.title {
  @include title;
}

//img del ristorante
.img-container {
  border-radius: 0.5rem;

  .img {
    border-radius: 0.5rem;
    width: 100%;
    object-fit: cover;
  }
}

//scroll della sezione dei piatti
.scroll {
  height: auto;
}

.scroll::-webkit-scrollbar {
  display: none;
}

//card dei piatti
.card-custom {
  border: 0.5px solid rgba(0, 0, 0, 0.099);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  width: 47%;
  border-radius: 0.5rem;
}

.card-title {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
}

.card-text {
  font-size: 1rem;
}

.button {
  background-color: $primary-color;
  color: $quaternary-color;
  border-radius: 0 0.5rem 0.5rem 0;
  font-weight: 600;
}

.button:hover {
  background-color: $tertiary-color;
  color: $quaternary-color;
  border-radius: 0 0.5rem 0.5rem 0;
}

//carrello statico
.cart {
  height: 100%;
  border-radius: 1.2rem;
  border: 1px solid #a1a1a151;
  background-color: white;
  @include light-shadow;
}

// Recap per schermi più piccoli di 768px
.recap-container-tablet {
  display: none;
}

// Dettagli del carrello per schermi sopra 768px

.info-cart {
  display: block; // Mostra i dettagli del carrello su schermi grandi
  height: 400px;
  overflow-y: auto;
}

.info-cart::-webkit-scrollbar {
  display: none;
}

.dishes {
  color: $tertiary-color;
}

.total {
  font-weight: 800;
  color: $tertiary-color;
}

.recap-buttons {
  border-radius: 0.3rem;
  background-color: $tertiary-color;
  color: $quaternary-color;
}

.recap-buttons:hover {
  background-color: $quinary-color;
  color: $secondary-color;
}

.button-cart {
  padding: 0.5rem;
  background-color: $tertiary-color;
  color: $quaternary-color;
  font-weight: 600;
  border-radius: 0.3rem;
}

.button-cart:hover {
  background-color: $quinary-color;
  color: $quaternary-color;
}

.text-empty-cart {
  color: $tertiary-color;
}

.modal-button {
  @include button;
}

.modal-button:hover {
  @include button-hover;
}

@media (max-width: 1024px) {
  .card-custom {
    width: 90%;
  }
}

@media (max-width: 769px) {
  //card
  .card-custom {
    width: 100%;
  }

  //carrello statico
  .cart {
    background-color: $primary-color;
  }

  .recap-text-tablet {
    color: $quaternary-color;
  }

  .total-static-cart {
    display: none;
  }

  .cart-side {
    height: auto;
  }

  .recap-container-tablet {
    display: block; // Mostra il recap su schermi piccoli
  }

  .info-cart {
    display: none; // Nascondi i dettagli del carrello su schermi piccoli
  }

  .text {
    color: rgb(31, 2, 2);
    text-decoration: none;
  }

  .text-empty-cart {
    color: $quaternary-color;
  }
}

@media (max-width: 426px) {
  .margin {
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .dish-image {
    height: 300px;
  }

  .card-custom {
    width: 95%;
    margin: auto;
  }

  .card-body {
    height: 150px;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .button {
    background-color: $primary-color;
    color: $quaternary-color;
    border-radius: 0 0 0.5rem 0.5rem;
    font-weight: 600;
  }

  .scroll {
    height: auto;
    overflow-y: auto;
    box-shadow: inset 0 10px 10px rgba(0, 0, 0, 0.093);
  }
}
</style>
