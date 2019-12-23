<template>
  <div>
    <div class="container-fluid" style="margin-top:50px;" id="pet">
      <div class="container">
        <h1 class="display-3 text-center">Edytuj zwierzę</h1>
        <br />
        <table class="table table-secondary">
          <thead>
            <tr>
              <th>Imię</th>
              <td id="name">
                <input-text v-model="pet.name" :defaultVal="pet.name"></input-text>
              </td>
            </tr>
            <tr>
              <th>Data przyjęcia</th>
              <td id="takeInDate">
                <date-picker id="someId" @date-picked="changeDate" :defaultValue="pet.takeInDate"></date-picker>
              </td>
            </tr>
            <tr>
              <th>Gatunek</th>
              <td>
                <input-dropdown
                  :values="editPetPredefinedValues.SPECIES"
                  :defaultVal="pet.species"
                  v-model="pet.species"
                ></input-dropdown>
              </td>
            </tr>
            <tr>
              <th>Płeć</th>
              <td>
                <input-dropdown
                  :values="editPetPredefinedValues.SEX"
                  :defaultVal="pet.sex"
                  v-model="pet.sex"
                ></input-dropdown>
              </td>
            </tr>
            <tr>
              <th>Wiek</th>
              <td>
                <input-dropdown
                  :values="editPetPredefinedValues.AGE"
                  :defaultVal="pet.age"
                  v-model="pet.age"
                ></input-dropdown>
              </td>
            </tr>
            <tr>
              <th>Może mieszkać z innymi psami</th>
              <td>
                <input-dropdown
                  :values="editPetPredefinedValues.CAN_LIVE_WITH_OTHER_DOGS"
                  :defaultVal="pet.canLiveWithOtherDogs"
                  v-model="pet.canLiveWithOtherDogs"
                ></input-dropdown>
              </td>
            </tr>
            <tr>
              <th>Może mieszkać z innymi kotami</th>
              <td>
                <input-dropdown
                  :values="editPetPredefinedValues.CAN_LIVE_WITH_OTHER_CATS"
                  :defaultVal="pet.canLiveWithOtherCats"
                  v-model="pet.canLiveWithOtherCats"
                ></input-dropdown>
              </td>
            </tr>
            <tr>
              <th>Może mieszkać z dziećmi</th>
              <td>
                <input-dropdown
                  :values="editPetPredefinedValues.CAN_LIVE_WITH_KIDS"
                  :defaultVal="pet.canLiveWithKids"
                  v-model="pet.canLiveWithKids"
                ></input-dropdown>
              </td>
            </tr>
            <tr>
              <th>Aktywność (skala 1-10)</th>
              <td>
                <input-dropdown
                  :values="editPetPredefinedValues.ACTIVITY"
                  :defaultVal="pet.activity"
                  v-model="pet.activity"
                ></input-dropdown>
              </td>
            </tr>
            <tr>
              <th>Umaszczenie</th>
              <td>
                <input-dropdown
                  :values="editPetPredefinedValues.COAT"
                  :defaultVal="pet.coat"
                  v-model="pet.coat"
                ></input-dropdown>
              </td>
            </tr>
            <tr>
              <th>Długość sierści</th>
              <td>
                <input-dropdown
                  :values="editPetPredefinedValues.FUR"
                  :defaultVal="pet.fur"
                  v-model="pet.fur"
                ></input-dropdown>
              </td>
            </tr>
            <tr>
              <th>Czy jest chory?</th>
              <td>
                <input-dropdown
                  :values="editPetPredefinedValues.IS_ILL"
                  :defaultVal="pet.isIll"
                  v-model="pet.isIll"
                ></input-dropdown>
              </td>
            </tr>
            <tr>
              <th>Zdjęcia</th>
              <td>
                <div class="photo" v-for="(photo, index) in pet.photosUrls">
                  <img :src="photo" class="img-fluid" />
                  <button class="button btn-danger btn-lg" @click="deletePhoto(index)">Usuń</button>
                </div>
                <div class="photo" v-for="(photo, index) in addedPhotosUrls">
                  <img :src="photo" class="img-fluid" />
                  <button class="button btn btn-danger btn-lg" @click="deleteAddedPhoto(index)">Usuń</button>
                </div>
                <input
                  type="file"
                  id="photos"
                  ref="addedPhotos"
                  class="input-file"
                  multiple
                  @change="handlePhotosUpload()"
                />
              </td>
            </tr>
            <tr>
              <th>Uwagi dodatkowe</th>
              <td>
                <input-text
                  multiline="true"
                  v-model="pet.additionalNotes"
                  :defaultVal="pet.additionalNotes"
                ></input-text>
              </td>
            </tr>
          </thead>
        </table>
        <div class="col-12 text-center">
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#submitModal"
            :disabled="isSubmitButtonDisabled"
          >Zatwierdź</button>
        </div>
        <!-------------------------------------submitModal--------------------------------------->
        <div class="modal fade" id="submitModal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body text-center">
                <h4>Zatwierdzić zmiany?</h4>
              </div>
              <div class="modal-footer text-center">
                <button
                  type="submit"
                  class="btn btn-primary"
                  v-on:click.capture="editPet()"
                  data-dismiss="modal"
                >Ok</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal">Anuluj</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../backend-api";
import datePicker from "../customTags/DatePicker";
import InputText from "../customTags/InputText";
import InputDropdown from "../customTags/InputDropdown";
import petAttributes from "../../constants/PetAttributes";

export default {
  name: "EditPet",
  components: {    
    datePicker,
    InputText,
    InputDropdown
  },

  data() {
    return {
      pet: "",
      addedPhotos: [],
      addedPhotosUrls: [],
      editPetPredefinedValues: petAttributes,
      isSubmitButtonDisabled: "true"
    };
  },
  mounted() {
    this.getPet();
  },

  methods: {
    getPet() {
      api.readPet(this.getPetId()).then(response => {
        this.pet = response;
      });
    },
    getPetId() {
      var splitted = window.location.href.split("/");
      return splitted[splitted.length - 1];
    },
    editPet() {
      let formData = new FormData();
      this.pet.age = this.pet.age === "<1" ? "0" : this.pet.age;

      formData.append("pet", JSON.stringify(this.pet));
      for (let i = 0; i < this.addedPhotos.length; i++) {
        formData.append("addedPhotos", this.addedPhotos[i]);
      }
      api.updatePet(formData, this.pet.id).then(response => {
        document.location.replace("/managePets");
      });
    },
    changeDate(val) {
      this.pet.takeInDate = val;
    },
    deletePhoto(index) {
      this.pet.photosUrls.splice(index, 1);
    },
    deleteAddedPhoto(index) {
      this.addedPhotos.splice(index, 1);
      this.addedPhotosUrls.splice(index, 1);
    },
    handlePhotosUpload() {
      let uploadedPhotos = this.$refs.addedPhotos.files;
      for (let i = 0; i < uploadedPhotos.length; i++) {
        this.addedPhotos.push(uploadedPhotos[i]);
        this.addedPhotosUrls.push(URL.createObjectURL(event.target.files[i]));
      }
    },
    validateForm() {
      for (let item in this.pet) {
        if (item === "additionalNotes" || item === "photosUrls") {
          continue;
        } else if (this.pet[item] === "") {
          this.isSubmitButtonDisabled = true;
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
thead th {
  font-size: 18px;
  vertical-align: middle;
}

.photo {
  width: 250px;
  margin: 3px;
}
.btn-lg {
  width: inherit;
}
</style>
