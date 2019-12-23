<template>
  <div>
    <div class="container-fluid" style="margin-top:50px;">
      <h1 class="display-4 text-center">Dodaj zwierzę</h1>
      <div class="container">
        <form id="pet" enctype="multipart/form-data" method="POST" @submit.prevent="createPet()">
          <input-text
            type="text"
            name="name"
            label="Imię"
            v-model="pet.name"
            placeholder="Wprowadź imię zwierzęcia"
          ></input-text>
          <date-picker id="takeInDate" label="Data przyjęcia" @date-picked="setTakeInDate"></date-picker>
          <input-dropdown
            label="Gatunek"
            name="species"
            :values="editPetPredefinedValues.SPECIES"
            v-model="pet.species"
          ></input-dropdown>
          <input-dropdown
            label="Płeć"
            name="sex"
            :values="editPetPredefinedValues.SEX"
            v-model="pet.sex"
          ></input-dropdown>
          <input-dropdown
            label="Wiek"
            name="age"
            :values="editPetPredefinedValues.AGE"
            v-model="pet.age"
          ></input-dropdown>
          <input-dropdown
            label="Czy może mieszkać z innymi psami"
            name="canLiveWithOtherDogs"
            :values="editPetPredefinedValues.CAN_LIVE_WITH_OTHER_DOGS"
            v-model="pet.canLiveWithOtherDogs"
          ></input-dropdown>
          <input-dropdown
            label="Czy może mieszkać z innymi Kotami"
            name="canLiveWithOtherCats"
            :values="editPetPredefinedValues.CAN_LIVE_WITH_OTHER_CATS"
            v-model="pet.canLiveWithOtherCats"
          ></input-dropdown>
          <input-dropdown
            label="Czy może mieszkać z dziećmi"
            name="canLiveWithKids"
            :values="editPetPredefinedValues.CAN_LIVE_WITH_KIDS"
            v-model="pet.canLiveWithKids"
          ></input-dropdown>
          <input-dropdown
            label="Aktywność w skali 1-10 (1 - nieaktywny, 10 - bardzo aktywny)"
            :values="editPetPredefinedValues.ACTIVITY"
            name="activity"
            v-model="pet.activity"
          ></input-dropdown>
          <input-dropdown
            label="Umaszczenie"
            name="coat"
            placeholder="Umaszczenie"
            :values="editPetPredefinedValues.COAT"
            v-model="pet.coat"
          ></input-dropdown>
          <input-dropdown
            label="Sierść"
            name="fur"
            :values="editPetPredefinedValues.FUR"
            v-model="pet.fur"
          ></input-dropdown>
          <input-dropdown
            label="Czy jest chory?"
            name="isIll"
            :values="editPetPredefinedValues.IS_ILL"
            v-model="pet.isIll"
          ></input-dropdown>
          <div class="form-group">
            <label for="additionalNotes">
              <h5 class="display-6 text-secondary">Uwagi dodatkowe</h5>
            </label>
            <textarea
              class="form-control"
              rows="3"
              id="additionalNotes"
              v-model="pet.additionalNotes"
            ></textarea>
          </div>
          <br />
          <div>
            <h5 class="display-6 text-secondary">Zdjęcia</h5>
            <div class="photo" v-for="(photo, index) in photosUrls">
              <img :src="photo" class="img-fluid" />
              <button class="button btn btn-danger btn-lg" @click="deletePhoto(index)">Usuń</button>
            </div>
            <input
              type="file"
              id="photos"
              ref="photos"
              class="input-file"
              multiple
              @change="handlePhotosUpload()"
            />
          </div>

          <br />
          <br />
          <div class="text-center">
            <button
              type="submit"
              class="btn btn-lg btn-primary"
              :disabled="isSubmitButtonDisabled"
            >Wyślij</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../backend-api";
import InputText from "../customTags/InputText";
import InputDropdown from "../customTags/InputDropdown";
import DatePicker from "../customTags/DatePicker";
import petAttributes from "../../constants/PetAttributes";

export default {
  name: "AddPet",
  components: {
    InputText,
    InputDropdown,
    DatePicker
  },
  data() {
    return {
      pet: {
        name: "",
        takeInDate: "",
        species: "",
        sex: "",
        age: "",
        canLiveWithOtherDogs: "",
        canLiveWithOtherCats: "",
        canLiveWithKids: "",
        activity: "",
        coat: "",
        fur: "",
        isIll: "",
        additionalNotes: ""
      },
      editPetPredefinedValues: petAttributes,
      photos: [],
      photosUrls: [],
      isSubmitButtonDisabled: "true"
    };
  },
  methods: {
    setTakeInDate(date) {
      this.pet.takeInDate = date;
    },
    handlePhotosUpload() {
      let uploadedPhotos = this.$refs.photos.files;
      for (var i = 0; i < uploadedPhotos.length; i++) {
        this.photos.push(uploadedPhotos[i]);
        this.photosUrls.push(URL.createObjectURL(event.target.files[i]));
      }
    },
    deletePhoto(index) {
      this.photos.splice(index, 1);
      this.photosUrls.splice(index, 1);
    },
    validateForm() {
      for (let item in this.pet) {
        if (item === "additionalNotes") {
          continue;
        } else if (this.pet[item] === "") {
          return;
        }
      }
      this.isSubmitButtonDisabled = false;
    },

    createPet() {
      let formData = new FormData();
      this.pet.age = this.pet.age === "<1" ? "0" : this.pet.age;
      for (let item in this.pet) {
        formData.append(item, this.pet[item]);
      }
      for (let i = 0; i < this.photos.length; i++) {
        formData.append("photos", this.photos[i]);
      }

      api.createPet(formData).then(response => {
        document.location.replace("/managePets");
      });
    }
  },
  watch: {
    pet: {
      handler(val) {
        this.validateForm();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
.photo {
  width: 250px;
  margin: 3px;
}
.btn-lg {
  width: inherit;
}
</style>
