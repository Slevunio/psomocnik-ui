<template>
    <div class="container-fluid" style="margin-top:50px;">
        <div class="col-12 text-center">
            <h1 class="display-3">Dodaj zwierzę</h1>
        </div>
        <div class="container">
            <form id="pet" @submit.prevent="createPet()">

                <input-text type="text" name="name" label="Imię" v-model="pet.name"
                            placeholder="Wprowadź imię zwierzęcia"></input-text>
                <input-text type="datetime-local" name="takeInDate" label="Data przyjęcia" v-model="pet.takeInDate"
                            placeholder="yyyy-mm-dd --:--"></input-text>
                <add-pet-input-radio label="Gatunek" name="species" :values="['Pies', 'Kot']" v-model="pet.species"></add-pet-input-radio>

                <add-pet-input-radio label="Płeć" name="sex" :values="['Męska', 'Żeńska']" v-model="pet.sex"></add-pet-input-radio>
                <input-text type="number" label="Wiek" name="age" placeholder="Wprowadź wiek zwierzęcia"
                            v-model="pet.age"></input-text>
                <add-pet-input-radio label="Czy może mieszkać z innymi psami" name="canLiveWithOtherDogs"
                             :values="['Tak', 'Nie']" v-model="pet.canLiveWithOtherDogs"></add-pet-input-radio>
                <add-pet-input-radio label="Czy może mieszkać z innymi Kotami" name="canLiveWithOtherCats"
                             :values="['Tak', 'Nie']" v-model="pet.canLiveWithOtherCats"></add-pet-input-radio>
                <add-pet-input-radio label="Czy może mieszkać z dziećmi" name="canLiveWithKids" :values="['Tak', 'Nie']"
                             v-model="pet.canLiveWithKids"></add-pet-input-radio>
                <input-text type="number" label="Aktywność w skali 1-10 (1 - nieaktywny, 10 - bardzo aktywny)"
                            name="activity" placeholder="Aktywność" v-model="pet.activity"></input-text>
                <h5>Choroby</h5>
                <div id="petDiseases" v-for="disease in diseasesArray">
                    <input-text type="text" placeholder="Wprowadź chorobę" v-model="disease.value"></input-text>
                </div>
                <div class="col">
                    <button type="button" id="addDisButton" class="btn btn-psomocnik btn-lg" v-on:click="addDis()">Dodaj
                        chorobę
                    </button>
                </div>
                <br>
                <!--<div class="form-group">
                    <label for="images" class="btn btn-psomocnik btn-lg">Dodaj zdjęcie</label>
                    <input type="file" class="form-control-file" id="images">
                </div>
                -->
                <div class="row">
                    <div class="col text-center">
                        <button type="submit" class="btn btn-lg btn-psomocnik">Wyślij</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import api from '../backend-api'
    import InputText from '../customTags/InputText'
    import AddPetInputRadio from '../customTags/AddPetInputRadio'

    export default {
        name: "AddPet",
        components: {
            InputText,
            AddPetInputRadio
        },
        data() {
            return {
                //Pet properties
                pet: {
                    name: '',
                    takeInDate: '',
                    species: '',
                    sex: '',
                    age: '',
                    canLiveWithOtherDogs: '',
                    canLiveWithOtherCats: '',
                    canLiveWithKids: '',
                    activity: '',
                    diseases: ''
                },
                //buffor for diseases -> will be converted to diseasesString
                diseasesArray: []
            }
        },
        methods: {
            addDis() {
                this.diseasesArray.push({value: ''});
            },
            diseasesToString() {
                for (var i = 0; i < this.diseasesArray.length; i++) {
                    if (i !== this.diseasesArray.length - 1) {
                        this.pet.diseases += this.diseasesArray[i].value + ", ";
                    } else
                        this.pet.diseases += this.diseasesArray[i].value;
                }
            },
            createPet() {

                this.diseasesToString();
                api.createPet(this.pet).then(
                    document.location.replace("/managePets")
                );
            }
        }
    }
</script>

<style scoped>

</style>