import { createApp } from 'vue';
import router from './router';
import './style.scss'; // Assicurati che il file SCSS sia qui

import App from './App.vue';

// Importa Poppins (ad esempio pesi 400 e 700)
import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';

// Importa Inter
import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

// Bootstrap
import * as bootstrap from 'bootstrap';

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


import { // Aggiungi le icone per l'accordion
    faCode, faPaintBrush, faRocket, faHandshake, faLaptopCode,
    faMobileAlt, faCloud, faDatabase, faSearch, faHeart,
    faUser, faMapMarkerAlt, faChevronDown, faChevronUp,
    faCartShopping, faArrowLeft, faPepperHot, faWheatAwnCircleExclamation, faLeaf, faCow, faTimes, faXmark
} from '@fortawesome/free-solid-svg-icons';

// FontAwesome brand
import { faInstagram, faFacebook, faTwitter, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';

// Aggiungi le icone alla libreria
library.add(faCode, faPaintBrush, faRocket, faHandshake, faLaptopCode, faMobileAlt,
    faCloud, faDatabase, faSearch, faHeart, faUser, faMapMarkerAlt,
    faChevronDown, faChevronUp, faInstagram, faFacebook, faYoutube, faCartShopping, faXTwitter, faArrowLeft, faPepperHot, faWheatAwnCircleExclamation, faLeaf, faCow, faTimes, faXmark);

const app = createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
