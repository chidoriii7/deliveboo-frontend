<script>
export default {
  name: "UserFormInfo",
  data() {
    return {
      formData: {
        user_name: "",
        user_email: "",
        user_address: "",
        user_phone: "",
        delivery_time: "",
        notes: "",
        delivery_date: "", // Assicurati di inizializzarlo
      },
      errors: {},
    };
  },
  mounted() {
    // Imposta la data corrente
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    this.formData.delivery_date = `${year}-${month}-${day}`;
  },
  methods: {
    submitForm() {
      this.errors = {};

      // Validazione lato client
      if (!this.formData.user_name) {
        this.errors.user_name = "Il nome è obbligatorio";
      }
      if (
        !this.formData.user_email ||
        !this.validateEmail(this.formData.user_email)
      ) {
        this.errors.user_email = "È richiesta un'e-mail valida (es: esempio@dominio.com)";
      }
      if (!this.formData.user_address) {
        this.errors.user_address = "L'indirizzo è obbligatorio";
      }
      if (
        !this.formData.user_phone ||
        !this.validatePhone(this.formData.user_phone)
      ) {
        this.errors.user_phone = "È richiesto un numero di telefono valido";
      }
      if (!this.formData.delivery_time) {
        this.errors.delivery_time = "È richiesta l'ora di consegna";
      }

      // Se non ci sono errori, emetti l'evento per inviare i dati al genitore
      if (Object.keys(this.errors).length === 0) {
        this.formData.delivery_datetime = `${this.formData.delivery_date}T${this.formData.delivery_time}`;
        this.$emit("formSubmitted", this.formData);
        this.$emit("formValid", true); // Emesso evento per indicare che il form è valido
      } else {
        this.$emit("formValid", false); // Emesso evento per indicare che il form non è valido
      }
    },
    validateEmail(email) {
      const patternEmail = /^[^\s@]+@[^\s@]+\.(com|it|fr|uk|de|org|net|gov)$/; //  domini
      return patternEmail.test(email);
    },
    validatePhone(phone) {
      // richiedi almeno 10 cifre
      const patternPhone = /^\+?[0-9]{10,15}$/;
      return patternPhone.test(phone);
    },
  },
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="row g-3">
      <!-- Prima colonna -->
      <div class="col-12 col-md-6">
        <!-- Nome utente -->
        <div class="mb-3">
          <label for="user_name" class="form-label">
            Nome e Cognome <span class="text-danger">*</span>
          </label>
          <input type="text" id="user_name" v-model="formData.user_name" class="form-control"
            :class="{ 'is-invalid': errors.user_name }" placeholder="Inserisci nome e cognome" />
          <div v-if="errors.user_name" class="invalid-feedback">
            {{ errors.user_name }}
          </div>
        </div>

        <!-- Email -->
        <div class="mb-3">
          <label for="user_email" class="form-label">
            Email <span class="text-danger">*</span>
          </label>
          <input type="email" id="user_email" v-model="formData.user_email" class="form-control"
            :class="{ 'is-invalid': errors.user_email }" placeholder="Inserisci la tua e-mail" />
          <div v-if="errors.user_email" class="invalid-feedback">
            {{ errors.user_email }}
          </div>
        </div>

        <!-- Indirizzo -->
        <div class="mb-3">
          <label for="user_address" class="form-label">
            Indirizzo <span class="text-danger">*</span>
          </label>
          <input type="text" id="user_address" v-model="formData.user_address" class="form-control"
            :class="{ 'is-invalid': errors.user_address }" placeholder="Inserisci il tuo indirizzo" />
          <div v-if="errors.user_address" class="invalid-feedback">
            {{ errors.user_address }}
          </div>
        </div>
      </div>

      <!-- Seconda colonna -->
      <div class="col-12 col-md-6">
        <!-- Telefono -->
        <div class="mb-3">
          <label for="user_phone" class="form-label">
            Telefono <span class="text-danger">*</span>
          </label>
          <input type="text" id="user_phone" v-model="formData.user_phone" class="form-control"
            :class="{ 'is-invalid': errors.user_phone }" placeholder="Inserisci il tuo numero di telefono" />
          <div v-if="errors.user_phone" class="invalid-feedback">
            {{ errors.user_phone }}
          </div>
        </div>

        <!-- Ora di consegna -->
        <div class="mb-3">
          <label for="delivery_time" class="form-label">
            Ora della consegna <span class="text-danger">*</span>
          </label>
          <input type="time" id="delivery_time" v-model="formData.delivery_time" class="form-control"
            :class="{ 'is-invalid': errors.delivery_time }" />
          <div v-if="errors.delivery_time" class="invalid-feedback">
            {{ errors.delivery_time }}
          </div>
        </div>

        <!-- Note -->
        <div class="mb-3">
          <label for="notes" class="form-label">Note</label>
          <textarea id="notes" v-model="formData.notes" class="form-control" :class="{ 'is-invalid': errors.notes }"
            maxlength="255" placeholder="Aggiungi note sul tuo ordine oppure specifica richieste particolari qui"
            style="height: 130px"></textarea>
          <div v-if="errors.notes" class="invalid-feedback">
            {{ errors.notes }}
          </div>
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div class="text-center mt-4">
      <button type="button" class="btn button mb-3" @click="submitForm">
        Conferma Dati
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
@use "src/assets/partials/_variables.scss" as *;
@use "src/assets/partials/_mixin.scss" as *;

.button {
  @include button;
  @include shadow;
}

.invalid-feedback {
  display: block;
}

.form-label{
  font-size: 1rem;
  color: #616161;
}

/* Personalizzazione per smartphone */
@media (max-width: 576px) {
  .form-label {
    font-size: 0.9rem;
  }

  input,
  textarea,
  button {
    font-size: 0.9rem;
  }

  textarea {
    height: 100px;
  }
}

/* Stile per gli input attivi */
input:focus,
textarea:focus {
  border-color: orange;
  /* Colore del bordo quando attivo */
  box-shadow: 0 0 5px rgba(255, 165, 0, 0.5);
  /* Effetto ombra */
}

/* Personalizzazione per tablet */
@media (min-width: 577px) and (max-width: 768px) {
  .form-label {
    font-size: 1rem;
  }

  input,
  textarea,
  button {
    font-size: 1rem;
  }
}
</style>
