<template>
    <div id="matchedPets">
        <div class="container" style="margin-top: 50px;">
            <h1 class="display-5 text-center text-dark">Moje dopasowania</h1>
            <br>
            <div class="card-columns text-center">
                <div v-for="pet in matchedPets">
                    <pet-card route="petInfo" :petId="pet.id" :name="pet.name" :match-with-user-accuracy="pet.matchWithUserAccuracy" :image="pet.photosUrls"></pet-card>
                </div>
            </div>
            <div class="text-center">
                <button type="button" class="btn btn-primary btn-lg" @click="backToForm()">Wróć</button>
            </div>
        </div>
    </div>
</template>

<script>
    import api from "../backend-api"
    import PetCard from "../customTags/PetCard"

    export default {
        name: "MatchedPets",
        components: {
            PetCard
        },

        data() {
            return {
                matchedPets: []
            }
        },
        mounted() {
            this.findMatchedPets();
        },
        methods: {
            findMatchedPets() {
                let form = JSON.parse(localStorage.getItem('form'));
                api.findMatchedPets(form).then(response => {
                    this.matchedPets = response;
                })
            },

            backToForm() {
                localStorage.removeItem('form');
                document.location.replace("/findPet");
            }
        }
    }
</script>

<style scoped>

</style>