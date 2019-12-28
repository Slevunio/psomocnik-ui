<template>
    <div>
        <div class="container" style="margin-top: 50px;">
            <h1 class="display-5 text-center text-dark">Znajdź tego jedynego</h1>
            <br><br>
            <div id="form">
                <form id="findPet" @submit.prevent="setFormToLocalStorage()">
                    <div class="row">
                        <div class="col-sm-6">
                            <input-dropdown label="Szukasz psa czy kota?" id="species" :values="editPetPredefinedValues.SPECIES"
                                            v-model="form.species"></input-dropdown>
                            <input-dropdown label="Jakiej płci ma być Twój towarzysz?" id="sex"
                                            :values="editPetPredefinedValues.SEX"
                                            v-model="form.sex"></input-dropdown>
                            <div v-if="form.species==='Pies'">
                                <input-dropdown label="W jakim wieku ma być Twój pies?" id="ageDog"
                                                :values="['Dziecko pies', 'Pies', 'Pan/Pani pies']"
                                                v-model="form.age"></input-dropdown>
                            </div>
                            <div v-else-if="form.species==='Kot'">
                                <input-dropdown label="W jakim wieku ma być Twój kot?" id="ageCat"
                                                :values="['Dziecko kot', 'Kot', 'Pan/Pani kot']"
                                                v-model="form.age"></input-dropdown>
                            </div>
                            <input-dropdown label="Czy jesteś właścicielem/właścicielką psa?" id="canLiveWithOtherDogs"
                                            :values="editPetPredefinedValues.CAN_LIVE_WITH_OTHER_DOGS"
                                            v-model="form.canLiveWithOtherDogs"></input-dropdown>
                            <input-dropdown label="Czy jesteś właścicielem/właścicielką kota?" id="canLiveWithOtherCats"
                                            :values="editPetPredefinedValues.CAN_LIVE_WITH_OTHER_CATS"
                                            v-model="form.canLiveWithOtherCats"></input-dropdown>
                            <input-dropdown label="Czy w Twoim domu znajdują się dzieci?" id="canLiveWithKids"
                                            :values="editPetPredefinedValues.CAN_LIVE_WITH_KIDS"
                                            v-model="form.canLiveWithKids"></input-dropdown>
                            <div v-if="form.species==='Pies'">
                                <input-dropdown
                                        label="Ile razy w tygodniu możesz poświęcić czas na długi spacer z psem? (minimum 1 godzina)"
                                        id="activityDog" :values="[1,2,3,4,5,6,7,'>7']"
                                        v-model="form.activity"></input-dropdown>
                            </div>
                            <div v-else-if="form.species==='Kot'">
                                <input-dropdown
                                        label="Ile razy w tygodniu możesz poświęcić czas na zabawę z kotem? (minimum 20 minut)"
                                        name="activityCat" :values="[1,2,3,4,5,6,7,'>7']"
                                        v-model="form.activity"></input-dropdown>
                            </div>
                            <input-dropdown label="Czy mógłbyś/mogłabyś zaopiekować się chorym zwierzakiem?"
                                            id="isIll"
                                            :values="editPetPredefinedValues.IS_ILL"
                                            v-model="form.isIll"></input-dropdown>
                            <input-dropdown label="Jakie umaszczenie zwierzaka preferujesz?" id="coat"
                                            :values="editPetPredefinedValues.COAT"
                                            v-model="form.coat"></input-dropdown>
                            <input-dropdown label="Długa sierść, czy krótka?" id="fur" :values="editPetPredefinedValues.FUR"
                                            v-model="form.fur"></input-dropdown>
                            <br>
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" id="submitForm" class="btn btn-primary btn-lg"
                                :disabled="isSubmitButtonDisabled">
                            Wyślij
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import InputDropdown from "../customTags/InputDropdown"
    import InputText from "../customTags/InputText"    
    import api from "../backend-api"
    import petAttributes from "../../constants/PetAttributes";

    export default {
        name: "FindPet",
        components: {
            InputText,
            InputDropdown
        },
        data() {
            return {
                form: {
                    species: '',
                    sex: '',
                    age: '',
                    canLiveWithOtherDogs: '',
                    canLiveWithOtherCats: '',
                    canLiveWithKids: '',
                    activity: '',
                    isIll: '',
                    coat: '',
                    fur: ''
                },
                editPetPredefinedValues: petAttributes,
                isSubmitButtonDisabled: true
            }
        },
        methods: {
            setFormToLocalStorage() {
                this.form.activity === '>7' ? this.form.activity = 8 : this.form.activity = this.form.activity;
                localStorage.setItem('form', JSON.stringify(this.form));
                document.location.replace("/matchedPets");
            },
            validateForm() {
                for (let item in this.form) {
                    if (this.form[item] === '') {
                        return;
                    }
                }
                this.isSubmitButtonDisabled = false;
            }
        },
        watch: {
            /*
            Validate form every time pet object changes
            */
            form: {
                handler(val) {
                    this.validateForm();
                },
                deep: true
            }
        }
    }
</script>

<style scoped>

</style>
