<template>
  <div>
    <div id="dropin-container"></div>
    <!-- bottone di debug modale -->
    <!-- <button @click="modalTrigger">modale</button> -->
    <div class="text-center">
      <button @click="processPayment" class="btn button mb-3">Paga ora</button>
    </div>

    <!-- Modale per pagamento riuscito -->
    <div
      class="modal fade"
      id="paymentSuccessModal"
      tabindex="-1"
      aria-labelledby="paymentSuccessModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="paymentSuccessModalLabel">
              Grazie il tuo ordine é stato ricevuto.
            </h4>
            <!-- <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button> -->
          </div>
          <div class="modal-body">
            <p class="fw-semibold">
              Controlla la tua e-mail per la conferma dell'ordine e le
              informazioni dettagliate sulla consegna.
            </p>
            <div class="d-flex align-items-center">
              <h6 class="me-2 mb-0">ID Pagamento:</h6>
              <span>{{ transactionId }}</span>
            </div>
          </div>
          <div class="modal-footer">
            <a
              href="/"
              class="px-3 bg-custom-primary fs-6 custom-btn me-2 mt-2 text-white"
              @click="handleRedirect"
              >OK</a
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Modale per pagamento fallito -->
    <div
      class="modal fade"
      id="paymentErrorModal"
      tabindex="-1"
      aria-labelledby="paymentErrorModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="paymentErrorModalLabel">
              Errore di pagamento
            </h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h6 class="mb-3">
              Si é verificato un errore con l'elaborazione del pagamento. Per
              favore, riprova.
            </h6>
            <div class="d-flex align-items-center">
              <h6 class="me-2 mb-0">ID Errore:</h6>
              <span>{{ errorMessage }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dropin from "braintree-web-drop-in";
import { Modal } from "bootstrap";
import { store } from "../../store";

export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      clientToken: "",
      dropinInstance: null,
      transactionId: "",
      errorMessage: "",
      store
    };
  },
  async mounted() {
    this.getClientToken();
  },
  methods: {
    modalTrigger() {
      const successModal = new Modal(
        document.getElementById("paymentSuccessModal")
      );
      successModal.show();
    },
    async getClientToken() {
      try {
        const response = await axios.get("/api/payment/token");
        this.clientToken = response.data.token;

        if (this.clientToken) {
          this.initializeBraintree();
        } else {
          console.error("Errore: Il token Braintree non è stato ricevuto.");
        }
      } catch (error) {
        console.error("Errore nel recuperare il token:", error);
      }
    },
    initializeBraintree() {
      dropin.create(
        {
          authorization: this.clientToken,
          container: "#dropin-container",
        },
        (createErr, instance) => {
          if (createErr) {
            console.error(
              "Errore nell'inizializzazione di Braintree:",
              createErr
            );
            return;
          }
          this.dropinInstance = instance;
        }
      );
    },
    processPayment() {
      if (!this.dropinInstance) {
        console.error(
          "L'istanza di Braintree Drop-In non è stata inizializzata."
        );
        return;
      }

      this.dropinInstance.requestPaymentMethod((err, payload) => {
        if (err) {
          console.error("Errore nel richiedere il metodo di pagamento:", err);
          this.errorMessage =
            "Errore nel richiedere il metodo di pagamento. " + err.message;
          const errorModal = new Modal(
            document.getElementById("paymentErrorModal")
          );
          errorModal.show();
          return;
        }

        // Effettua il pagamento
        axios
          .post("/api/payment/process", {
            payment_method_nonce: payload.nonce,
            amount: this.total.toFixed(2),
          })
          .then((response) => {
            this.transactionId = response.data.transaction_id;

            // Mostra la modale di pagamento riuscito
            const successModal = new Modal(
              document.getElementById("paymentSuccessModal")
            );
            successModal.show();

            // Invia i dati del form al backend
            this.sendFormData();

            // Svuota il carrello dopo il pagamento riuscito
            this.clearCart();
          })
          .catch((error) => {
            console.error("Errore nel processare il pagamento:", error);
            this.errorMessage =
              "Errore nel processare il pagamento. " + error.message;
            const errorModal = new Modal(
              document.getElementById("paymentErrorModal")
            );
            errorModal.show();
          });
      });
    },
    sendFormData() {
      // Prepara i dati da inviare al backend
      const orderData = {
        restaurant_id: localStorage.getItem("lastRestaurant"),
        user_name: this.formData.user_name,
        user_email: this.formData.user_email,
        user_address: this.formData.user_address,
        user_phone: this.formData.user_phone,
        delivery_time: this.formData.delivery_time,
        total_price: parseFloat(this.total).toFixed(2),
        notes: this.formData.notes || null,
        dishes: this.cart,
      };

      axios
        .post(store.url + store.orders, orderData)
        .then((response) => {
          console.log("Ordine inviato con successo:", response.data);
        })
        .catch((error) => {
          console.error("Errore nell'invio dell'ordine:", error);
        });
    },
    clearCart() {
      // svuota il carrello
      this.$emit("clear-cart"); // emette un evento verso il paypage per svuotare il carrello

      // se il carrello è memorizzato nello store o nel localStorage, aggiorna anche quello
      localStorage.clear();
    },
  },
};
</script>

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

.button {
  @include button;
  @include shadow;
}

.invalid-feedback {
  display: block;
}

/* Stile per gli input attivi */
input:focus,
textarea:focus {
  border-color: orange; /* Colore del bordo quando attivo */
  box-shadow: 0 0 5px rgba(255, 165, 0, 0.5); /* Effetto ombra */
}
</style>
