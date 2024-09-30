<script>
import HeaderEmptyComponent from "../components/headers/HeaderEmptyComponent.vue";
import FooterComponent from "../components/footers/FooterComponent.vue";
import UserFormInfo from "../components/apiComponents/UserFormInfo.vue";
import BraintreePayment from "../components/apiComponents/BraintreePayment.vue";

export default {
  name: "PayPage",
  components: {
    UserFormInfo,
    BraintreePayment,
    HeaderEmptyComponent,
    FooterComponent,
  },
  data() {
    return {
      cart: [],
      totale: null,
      formData: null,
      isFormValid: false,
    };
  },
  mounted() {
    // Recupera il carrello e il totale dal localStorage (o un'altra fonte)
    if (localStorage.getItem("cart")) {
      this.cart = JSON.parse(localStorage.getItem("cart"));
      this.totale = JSON.parse(localStorage.getItem("tot"));
    }
  },
  watch: {
    formData: {
      deep: true,
      handler() {
        // Se i dati del form vengono modificati, disabilita il pagamento
        this.isFormValid = false;
      },
    },
  },
  methods: {
    handleFormSubmit(formData) {
      // Salva i dati del form
      this.formData = formData;
    },
    handleFormValid(isValid) {
      // Solo se il form è valido mostriamo il componente di pagamento
      this.isFormValid = isValid;
    },
    clearCart() {
      // Svuota il carrello e rimuovi dal localStorage
      this.cart = [];
      this.totale = 0;
      localStorage.clear();
    },
  },
};
</script>

<template>
  <HeaderEmptyComponent />
  <div class="container bg-white py-5">
    <div class="row margin-top">
      <!-- Form e BraintreePayment -->
      <div class="col-12 col-lg-8">
        <h2 class="mb-5 title">Informazioni di consegna</h2>
        <UserFormInfo
          @formSubmitted="handleFormSubmit"
          @formValid="handleFormValid"></UserFormInfo>
        <!-- Passa il cart e il totale al componente BraintreePayment -->
        <BraintreePayment
          ref="braintreePayment"
          :total="totale"
          :formData="formData"
          :cart="cart"
          @clear-cart="clearCart"
          v-if="isFormValid"></BraintreePayment>
      </div>

      <!-- Tabella per visualizzare il carrello -->
      <div class="col-12 col-lg-4">
        <h3 class="mb-4  title">Riepilogo</h3>
        <div class="table-responsive">
          <table class="table table-striped mb-2">
            <thead>
              <tr>
                <th scope="col" class="tab-header">Piatto</th>
                <th scope="col" class="tab-header">Qtà</th>
                <th scope="col" class="tab-header">Unità</th>
                <th scope="col" class="tab-header">Totale</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dish in cart" :key="dish.id">
                <td class="text">{{ dish.name }}</td>
                <td class="text">{{ dish.quantity }}</td>
                <td class="text">€{{ parseFloat(dish.price).toFixed(2) }}</td>
                <td class="text">
                  €{{ (dish.price * dish.quantity).toFixed(2) }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="3" class="text-end">Totale</th>
                <th>€{{ parseFloat(totale).toFixed(2) }}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent />
</template>

<style lang="scss" scoped>
@use "src/assets/partials/_variables.scss" as *;
@use "src/assets/partials/_mixin.scss" as *;

.margin-top{
  margin-top: 5rem;
}

.title{
  font-weight: 600;
}

.recap-order {
  background-color: $secondary-color;
}

.table {
  margin-top: 20px;
}

.text-end {
  text-align: right;
}

.tab-header{
  font-weight: 600;
}

@media (max-width: 768px) {
  .tab-header {
    font-size: 14px;
  }
  .text {
    font-size: 14px;
  }
}
</style>
