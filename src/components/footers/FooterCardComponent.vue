
<script>
export default {
    name: 'FooterCardComponent',

    data() {
        return {
            cards: [
                {
                    title: 'Scopri Deliveboo',
                    links: [
                        'Investitori',
                        'Chi Siamo',
                        'Ristoranti',
                        'Altro',
                        'Pressroom',
                        'Programmazione',
                        'Design',
                        'Lavora con noi',
                        'Diventa nostro partner'
                    ]
                },
                {
                    title: 'Note legali',
                    links: [
                        'Termini e condizioni',
                        'informazioni sulla privacy',
                        'Ristoranti',
                        'Cookies',
                        'Classificazione dei partner',
                        'Richieste da parte delle Autorità',
                        'Pubbliche',
                    ]
                },
                {
                    title: 'Aiuto',
                    links: [
                        'Contatti',
                        'FAQ',
                        'Tipi di cucina',
                    ]
                },
                {
                    title: 'Porta Deliveboo con te',
                    links: [],
                    image: 'https://seeklogo.com/images/A/app-store-google-play-logo-4A2747BF5E-seeklogo.com.png',
                }
            ]
        }
    },
    components: {

    },
    methods: {

    }
}


</script>

<template>
    <div class="row">
        <div v-for="(card, index) in cards" :key="index" class="col-lg-3 col-md-6 col-sm-12 p-2">
            <div class="col-md-12 bg-card ">
                <!-- Titolo della card -->
                <p class="text-light title">{{ card.title }}</p>

                <!-- Lista di link -->
                <ul v-if="card.links.length">

                    <li v-for="(link, index) in card.links" :key="index" class="link">
                        {{ link }}
                    </li>

                </ul>

                <!-- Mostra immagine se esiste -->
                <div v-if="card.image">
                    <img :src="card.image" alt="App badge" class="cta" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;

.title {
    font-size: 1.1rem;
    font-weight: 700;
}

.bg-card {
    background-color: $tertiary-color;
    color: $quaternary-color;
    padding: 1.2rem;
    height: 100%;
    border-radius: 0.2rem;
}

.link {
    @include link
}

.cta {
    width: 60%;
}
</style>