<script>
import { store } from "../../store";
export default {
  name: "CartCtaComponent",

  data() {
    return {
      cart: [], // il carrello
      showSidebar: false,
      store, // stato per mostrare/nascondere la sidebar
    };
  },

  mounted() {
    this.loadCart(); // Carica il carrello dal localStorage all'avvio

    // Ascolta eventuali modifiche al localStorage
    window.addEventListener("storage", this.loadCart);
  },

  beforeDestroy() {
    // Rimuovi l'evento di ascolto quando il componente viene distrutto
    window.removeEventListener("storage", this.loadCart);
  },

  computed: {
    // calcola il numero totale di articoli nel carrello
    cartItemCount() {
      const total = this.store.lastCart.reduce((total, dish) => {
        return total + dish.quantity;
      }, 0);

      // restituisce '5+' se il totale è maggiore di 5, altrimenti restituisce il totale
      if (total > 5) {
        return '+5';
      } else {
        return total;
      }
    },
  },

  methods: {
    loadCart() {
      // Ricarica il carrello dal localStorage
      const cart = localStorage.getItem("cart");

      // Controlla che il valore di `cart` non sia `null` o `"undefined"`
      if (cart && cart !== "undefined") {
        this.store.lastCart = JSON.parse(cart);
        console.log('lastCart pieno')
      } else {
        this.store.lastCart = [];
      }
    },

    deleteCart() {
      this.store.cart = [];
      this.store.lastCart = [];
      localStorage.clear();
    },

    toggleSidebar() {
      //quando la sidebar viene aperta il carrello fa l'update
      this.showSidebar = !this.showSidebar;
      if (this.showSidebar) {
        this.loadCart();
      }
    },

    closeSidebar() {
      this.showSidebar = false;
    },
    addToCart(dish) {
      this.totale = 0;
      const obj = {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        quantity: 1,
      };

      // Verifica se il piatto è già presente nel carrello
      if (this.store.lastCart.length) {
        let ciclo = false;
        this.store.lastCart.forEach((cartDish) => {
          if (cartDish.name == obj.name) {
            cartDish.quantity += obj.quantity; // Aumenta quantità se esiste già
            ciclo = true;
            return ciclo;
          }
        });
        if (!ciclo) this.store.lastCart.push(obj); // Aggiungi nuovo piatto
      } else {
        this.store.lastCart.push(obj); // Aggiunge il primo piatto
      }

      // Aggiorna il localStorage con i dati del carrello
      localStorage.setItem("cart", JSON.stringify(this.store.lastCart));
      this.calcoloTotale();
      if(this.store.cart.length)
        this.store.cart = this.store.lastCart;
    },
    deleteSingleDish(dish, index) {
      if (dish.quantity > 1) {
        dish.quantity--; // Diminuisce la quantità solo se è maggiore di 1
      } else {
        this.store.lastCart.splice(index, 1); // Rimuove il piatto se la quantità è 1
      }
      this.calcoloTotale(); // Aggiorna il totale
      if (this.store.lastCart.length)
        localStorage.setItem("cart", JSON.stringify(this.store.lastCart));
      else {
        localStorage.clear();
        console.log('elimina localstorage');
      };
      if(this.store.cart.length)
        this.store.cart = this.store.lastCart;
    },
    calcoloTotale() {
      this.totale = 0; // Reset del totale
      this.store.lastCart.forEach((cartDish) => {
        this.totale += parseFloat(cartDish.price) * cartDish.quantity; // Somma dei prezzi
      });
      localStorage.setItem("tot", JSON.stringify(this.totale)); // Salva il totale
    },
  },
};
</script>

<template>
  <div>
    <!-- apre la sidebar -->
    <button class="btn bg-light cart" type="button" @click="toggleSidebar">
      <font-awesome-icon :icon="['fas', 'cart-shopping']" class="icon" />

      <!-- mostra il numero di articoli nel carrello nell'icona con un badge numerico -->
      <span v-if="store.lastCart.length > 0" class="cart-notification-number">
        {{ cartItemCount }}
      </span>
    </button>

    <!-- Sidebar -->
    <div class="cart-sidebar" :class="{ 'cart-sidebar-active': showSidebar }">
      <div class="cart-sidebar-header py-2">
        <h4 class="text-light title-kart">Il tuo carrello</h4>
        <button type="button" class="close-btn" @click="closeSidebar">
          <font-awesome-icon icon="xmark" />
        </button>
      </div>

      <div class="cart-sidebar-content">
        <h4 class="title mb-3">Riepilogo dell' ordine</h4>

        <ul v-if="store.lastCart.length">
          <li v-for="(dish, index) in store.lastCart" :key="dish.name">
            <div class="row py-1">
              <div class="col-6">{{ dish.name }} x{{ dish.quantity }}</div>
              <div class="col-6">
                <button class="btn kart-button" @click="deleteSingleDish(dish, index)">
                  -
                </button>
                <button class="btn kart-button ms-3" @click="addToCart(dish)">
                  +
                </button>
              </div>
            </div>
          </li>
        </ul>
        <div v-else>
          <p>
            Non ci sono articoli nel carrello
          </p>
        </div>
      </div>

      <hr />

      <div class="cart-sidebar-footer">
        <button v-if="store.lastCart.length" class="btn button" @click="deleteCart">
          Svuota carrello
        </button>

        <router-link v-if="store.lastCart.length" :to="{ name: 'payPage' }" class="btn button mx-3">Conferma
          ordine</router-link>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade w-100" id="headerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <p class="modal-title fs-5" id="exampleModalLabel">
              Svuota carrello
            </p>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Sei sicuro di voler eliminare il tuo carrello?</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Chiudi
            </button>
            <button type="button" class="btn button" @click="deleteCart()" data-bs-dismiss="modal">
              Svuota
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "src/assets/partials/_variables.scss" as *;
@use "src/assets/partials/_mixin.scss" as *;

.button {
  @include button;
  @include shadow;
}

.button:hover {
  @include button-hover;
  @include shadow;
}

.title-kart {
  font-size: 1.2rem;
  font-weight: 700;
}

.title {
  font-weight: 700;
}

hr {
  color: $primary-color;
}

.kart-button {
  background-color: $primary-color;
  color: $quaternary-color;
}

.kart-button:hover {
  background-color: $secondary-color;
  color: $quaternary-color;
}

.cart-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100%;
  background-color: #f8f9fa;
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  border-left: 0.5px solid #ff800034;
}

.cart-sidebar-active {
  right: 0;
}

.cart-sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: $primary-color;
  color: $quaternary-color;
}

.cart-sidebar-content {
  padding: 20px;
}

.cart-sidebar-footer {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: white;
}

.cart {
  width: 100%;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.057);
  position: relative;
}

.icon {
  color: $primary-color;
}

@media (max-width: 1440px) {
  .cart-notification-dot {
    top: -5px;
    right: -2px;
    width: 8px;
    height: 8px;
  }
}

@media (max-width: 768px) {
  .cart-notification-dot {
    top: -5px;
    right: -2px;
    width: 8px;
    height: 8px;
  }
}

@media (max-width: 480px) {
  .cart-notification-dot {
    top: 1px;
    right: 1px;
    width: 6px;
    height: 6px;
  }
}

@media (max-width: 425px) {
  .cart-notification-dot {
    top: -10px;
    right: 2px;
    width: 6px;
    height: 6px;
  }
}

// stile badge numerico icona carrello
.cart-notification-number {
  position: absolute;
  top: -5px;
  right: -3px;
  font-size: 10px;
  font-weight: 600;
  display: flex;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  z-index: 10;
}
</style>
