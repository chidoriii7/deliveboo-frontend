<script>
export default {
  name: 'CardServiceComponent',

  data() {
    return {
      services: [
        {
          image:
            'https://a.storyblok.com/f/62776/1000x800/a0cab248af/partner.jpg',
          title: 'Diventa nostro partner',
          description:
            'Raggiungi più clienti con Deliveroo. Gestiamo noi la consegna, così tu puoi dedicarti a offrire i migliori piatti e prodotti.',
          link: '#'
        },
        {
          image:
            'https://a.storyblok.com/f/62776/1000x800/686a5c87b6/rider.jpg',
          title: 'Consegna con noi',
          description:
            'La libertà di consegnare dove e quando vuoi, con ottimi guadagni, convenzioni e sconti riservati a te.',
          link: '#'
        },
        {
          image:
            'https://a.storyblok.com/f/62776/800x638/02b3179ae5/dfw_2021_relaunch_shot_06_edit_lr.jpg',
          title: 'Deliveboo for Work',
          description:
            'Da pranzi aziendali a budget personalizzati per i dipendenti, possiamo offrire la soluzione giusta per qualsiasi esigenza.',
          link: '#'
        }
      ]
    };
  }
};
</script>

<template>
  <div class="row  justify-content-around py-4">
    <div v-for="(service, index) in services" :key="index" class="col-lg-4 d-flex">
      <div class="col card-custom h-100 d-flex flex-column p-2">
        <div class="mb-5">
          <img :src="service.image" class="card-img-top rounded" alt="" />
        </div>
        <div class="card-body flex-grow-1 mb-4">
          <h5 class="mb-3 title">{{ service.title }}</h5>
          <p class="text">{{ service.description }}</p>
        </div>
        <div class="card-footer mt-auto mb-3">
          <a :href="service.link" class="button">Inizia Ora</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'src/assets/partials/_variables.scss' as *;
@use 'src/assets/partials/_mixin.scss' as *;


.rounded {
  border-radius: 2.5rem;
  height: 100%;
}

.title {
  @include title
}

.text{
  font-size: 1rem;
  line-height: 1.8rem;
}

.button {
@include button
}

.card-custom {
  width: 100%;
}

.card-footer {
  display: flex;
  justify-content: flex-start;
}

.card-body {
  flex-grow: 1; /* Rende la parte centrale della card espandibile */
}

</style>
