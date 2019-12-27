<template>
    <div class="container" style="margin-top: 50px;">
        <h1 class="display-5 text-center text-dark">Nasze zwierzaki</h1>
        <br>
        <div class="card-columns text-center">
            <div v-for="pet in pets">
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

</style>