<template>
    <div class="container-fluid" style="margin-top: 50px">
        <div class="container">
            <h1 class="display-4 text-center">Znajdź tego jedynego</h1>
            <br><br>
            <div v-if="pets.length===0">
                <form id="findPet" @submit.prevent="findPet()">
                    <input-radio label="Szukasz psa czy kota?" name="species" :values="['Pies', 'Kot']"
                                 v-model="form.species"></input-radio>
                    <input-radio label="Jakiej płci ma być Twój towarzysz?" name="sex"
                                 :values="['Męska', 'Żeńska']" v-model="form.sex"></input-radio>

                    <input-radio label="Czy jesteś właścicielem/właścicielką psa?" name="canLiveWithOtherDogs"
                                 :values="['Tak', 'Nie']" v-model="form.canLiveWithOtherDogs"></input-radio>
                    <input-radio label="Czy jesteś właścicielem/właścicielką kota?" name="canLiveWithOtherCats"
                                 :values="['Tak', 'Nie']" v-model="form.canLiveWithOtherCats"></input-radio>
                    <input-radio label="Czy w Twoim domu znajdują się dzieci?" name="canLiveWithKids"
                                 :values="['Tak', 'Nie']" v-model="form.canLiveWithKids"></input-radio>
                    <!--<input-text
                            label="Ile razy w tygodniu możesz poświęcić czas na ćwiczenia z pupilem? (minimum 1 godzina)"
                            type="number"
                            name="" placeholder="Wpisz wartość"></input-text> add new attribute to Pet entity (smth about behaviour)-->
                    <div v-if="form.species==='Pies'">
                        <input-text
                                label="Ile razy w tygodniu możesz poświęcić czas na długi spacer z psem? (minimum 1 godzina)"
                                type="number"
                                name="activity" placeholder="Wpisz wartość" v-model="form.activity"></input-text>
                    </div>
                    <input-radio label="Czy mógłbyś/mogłabyś zaopiekować się chorym zwierzakiem?" name="diseases"
                                 :values="['Tak', 'Nie']" v-model="form.diseases"></input-radio>
                    <input-text label="Jakie umaszczenie zwierzaka preferujesz?" type="text"
                                name="coat" placeholder="Wpisz rodzaj umaszczenia" v-model="form.coat"></input-text>
                    <!--change to enum-->
                    <input-radio label="Długa sierść, czy krótka?" name="fur" :values="['Długa', 'Krótka']"
                                 v-model="form.fur"></input-radio>
                    <br>
                    <div class="text-center">
                        <button type="submit" class="btn btn-psomocnik btn-lg">Wyślij</button>
                    </div>
                </form>
            </div>
            <div v-else>
                <table class="table">
                    <thead>
                    <tr>
                        <th>
                            Dopasowanie
                        </th>
                        <th>
                            % zgodności
                        </th>
                    </tr>
                    </thead>
                    <tr v-for="pet in pets">
                        <td>
                            <pet-card route="petInfo" :petId="pet.id" :name="pet.name"
                                      :image="pet.photosIds[0]"></pet-card>
                        </td>
                        <td>
                            {{pet.percentageMatchWithUserAccuracy}}%
                        </td>
                    </tr>
                </table>
                <div class="text-center">
                    <button type="button" class="btn btn-psomocnik btn-lg" @click="backToForm()">Wróć</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import InputRadio from "../customTags/InputRadio"
    import InputText from "../customTags/InputText"
    import PetCard from "../customTags/PetCard"
    import api from "../backend-api"

    export default {
        name: "FindPet",
        components: {
            InputText,
            InputRadio,
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
                },
                pets: [],
                cookie: ''
            }
        },

        /* mounted() {
             this.getPetsFromCookies();
         },*/
        methods: {
            findPet() {
                api.findPet(this.form).then(
                    response => {
                        this.pets = response;
                       // this.matchedPetsToCookies(JSON.stringify(response.data));
                    }
                );

            },

            /*matchedPetsToCookies(stringPet) {
                var date = new Date();
                date.setMinutes(date.getMinutes()+30);
                this.cookie = "matchedPets=" + stringPet + "; expires=" + date.toUTCString() + "; path=/findPet;";
                document.cookie = this.cookie;
                this.getPetsFromCookies();
            },*/

            backToForm() {
                /*document.cookie = "matchedPets=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/findPet;";
                this.cookie='';*/
                for(var i=0; i<this.pets.length; i++){
                    this.pets.pop();
                };
            }/*,
            getPetsFromCookies(){
                //alert(document.cookie);
                var values=[];
                var matchedPets = document.cookie.split("}");
                for(var i=0; i<matchedPets.length;i++){
                    var splitted = matchedPets[i].split(",");
                    for(var j=0; j<splitted.length; j++){
                        values.push(splitted[j].split(":")[1]);
                    }
                }
            }*/
        }
    }
</script>

<style scoped>
    h1 {
        font-family: "Trebuchet MS";
        font-weight: bold;
    }
</style>