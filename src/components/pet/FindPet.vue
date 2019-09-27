<template>
    <div id="findPet">
        <div class="container" style="margin-top: 50px;">
            <h1 class="display-5 text-center text-dark">Znajdź tego jedynego</h1>
            <br><br>
            <div id="form">
                <form id="findPet" @submit.prevent="setFormToLocalStorage()">
                    <input-dropdown label="Szukasz psa czy kota?" id="species" :values="['Pies', 'Kot']"
                                    v-model="form.species"></input-dropdown>
                    <input-dropdown label="Jakiej płci ma być Twój towarzysz?" id="sex"
                                    :values="['Męska', 'Żeńska']" v-model="form.sex"></input-dropdown>

                    <input-dropdown label="Czy jesteś właścicielem/właścicielką psa?" id="canLiveWithOtherDogs"
                                    :values="['Tak', 'Nie']" v-model="form.canLiveWithOtherDogs"></input-dropdown>
                    <input-dropdown label="Czy jesteś właścicielem/właścicielką kota?" id="canLiveWithOtherCats"
                                    :values="['Tak', 'Nie']" v-model="form.canLiveWithOtherCats"></input-dropdown>
                    <input-dropdown label="Czy w Twoim domu znajdują się dzieci?" id="canLiveWithKids"
                                    :values="['Tak', 'Nie']" v-model="form.canLiveWithKids"></input-dropdown>
                    <div v-if="form.species==='Pies'">
                        <input-dropdown
                                label="Ile razy w tygodniu możesz poświęcić czas na długi spacer z psem? (minimum 1 godzina)"
                                id="activity" :values="[1,2,3,4,5,6,7,'>7']" v-model="form.activity"></input-dropdown>
                    </div>
                    <input-dropdown label="Czy mógłbyś/mogłabyś zaopiekować się chorym zwierzakiem?" id="diseases"
                                    :values="['Tak', 'Nie']" v-model="form.diseases"></input-dropdown>
                    <input-text label="Jakie umaszczenie zwierzaka preferujesz?" type="text"
                                id="coat" placeholder="Wpisz rodzaj umaszczenia" v-model="form.coat"></input-text>
                    <input-dropdown label="Długa sierść, czy krótka?" id="fur" :values="['Długa', 'Krótka']"
                                    v-model="form.fur"></input-dropdown>
                    <br>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary btn-lg">Wyślij</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import InputDropdown from "../customTags/InputDropdown"
    import InputText from "../customTags/InputText"
    import PetCard from "../customTags/PetCard"
    import api from "../backend-api"

    export default {
        name: "FindPet",
        components: {
            InputText,
            InputDropdown,
            PetCard
        },
        data() {
            return {
                form: {
                    species: '',
                    sex: '',
                    age: 5,
                    canLiveWithOtherDogs: '',
                    canLiveWithOtherCats: '',
                    canLiveWithKids: '',
                    activity: '',
                    diseases: '',
                    coat: '',
                    fur: ''
                }
            }
        },
        methods: {
            setFormToLocalStorage() {

                localStorage.setItem('form', JSON.stringify(this.form));
                document.location.replace("/matchedPets");
            }

        }
    }
</script>

<style scoped>

</style>