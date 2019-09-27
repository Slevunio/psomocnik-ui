<template>
    <div class="container" style="margin-top: 50px;">
        <h1 class="display-5 text-center text-dark">Nasze zwierzaki</h1>
        <br>
        <div class="card-columns text-center">
            <div v-for="pet in pets" style="display: inline-block">
                <pet-card route="petInfo" :petId="pet.id" :name="pet.name" :image="pet.photosUrls"></pet-card>
            </div>
        </div>
    </div>
</template>

<script>
    import api from "../backend-api"
    import PetCard from "../customTags/PetCard"

    export default {
        name: "OurPets",
        components: {
            PetCard
        },

        data() {
            return {
                pets: []
            }
        },
        mounted() {
            this.readPets();
        },
        methods: {
            readPets() {
                api.readPets().then(response => {
                    this.pets = response;
                });
            }
        }

    }
</script>

<style scoped>
    /* h1 {
         font-family: "Trebuchet MS";
     }

     @media (min-width: 34em) {
         .card-columns {
             -webkit-column-count: 2;
             -moz-column-count: 2;
             column-count: 2;
         }
     }

     @media (min-width: 48em) {
         .card-columns {
             -webkit-column-count: 3;
             -moz-column-count: 3;
             column-count: 3;
         }
     }

     @media (min-width: 62em) {
         .card-columns {
             -webkit-column-count: 4;
             -moz-column-count: 4;
             column-count: 4;
         }
     }

     @media (min-width: 75em) {
         .card-columns {
             -webkit-column-count: 5;
             -moz-column-count: 5;
             column-count: 5;
         }
     }*/
</style>