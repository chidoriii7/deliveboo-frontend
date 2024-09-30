<script>

export default{
    data(){
        return{
            
        }
    }
}

</script>

<template>
    <a href="/">home</a>
     <h3>test pagina menu</h3>
    
    <section class="bg-primary">
        <div class="container py-5">
            <div class="row">
                <div class="col-md-6 py-5 bg-success">

                </div>
                <div class="col-md-6 py-5 bg-danger">

                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container py-4 ">
            <div class="row">
                <div class="col-md-6 row py-2 bg-info scroll">
                    <div class="col-md-6 bg-success border border-secondary py-3 " v-for="dish in dishes" :key="dish.id">
                        <span>{{dish.name}}</span>
                    </div>

                </div>
                <div class="col-md-6 py-5 bg-warning d-flex justify-content-center">
                    <div class="carrello-statico bg-success py-5">

                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<style lang="scss">

.scroll{
    overflow-y: auto;
    height: 800px;
}

.carrello-statico{
    width: 500px;

}


</style>