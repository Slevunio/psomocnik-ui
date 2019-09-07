<template>
    <div class="container-fluid" style="margin-top: 50px">
        <div class="container">
            <span class="text-center"><h1 class="display-4">Nasze zwierzaki</h1> </span>
            <br>
            <div class="card-columns text-center">
            <span v-for="pet in pets" style="display: inline-block">
                <pet-card route="petInfo" :petId="pet.id" :name="pet.name" :image="pet.photosIds[0]"></pet-card>
            </span>
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
                    this.pets = response.data;
                });
            }
        }

    }
</script>

<style scoped>
    h1 {
        font-family: "Trebuchet MS";
    }
</style>