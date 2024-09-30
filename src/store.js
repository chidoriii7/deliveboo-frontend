import { reactive } from "vue";

export const store = reactive({
  cart: [],
  lastCart: [],
  results: [],
  types: '',
  url: "http://localhost:8000/api/",

  // endpoint per ristoranti
  restaurants: "restaurants/",

  // endpoint per ordini
  orders: "orders/",

  // endpoint per tipi
  type: "types",

  // Memorizziamo l'ultimo stato dei tipi selezionati
  lastTypes: [],

  placeholder: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTofG8ztxXbOG0LINKzNcGGQRuGNiQXxvktkg&s',

});
