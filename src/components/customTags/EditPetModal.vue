<template>
  <div>
    <button
      type="button"
      class="btn btn-primary"
      @click="setElementIdAndGetDefaultInputValue(elementId)"
      data-toggle="modal"
      :data-target="'#'+id"
    >Edytuj</button>
    <!-----------------Modals------------------------>
    <div class="modal fade" :id="id">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Wprowadź zmianę</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="editInput"
                v-model="inputValue"
                v-if="type === enumType.TEXT"
              />
              <date-picker
                id="someId"
                :defaultDate="inputValue"
                v-else-if="type === enumType.DATE"
                @date-picked="changeDate"
              ></date-picker>
              <!--<input-dropdown
                v-else-if="type === enumType.SELECT"
                :values="selectValues"
                :defaultValue="getDefaultInputValue()"
              ></input-dropdown>-->
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              @click="editValue()"
              data-dismiss="modal"
            >Ok</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import editPetModalTypeEnum from "../../constants/EditPetModalTypeEnum";
import DatePicker from "./DatePicker";
import InputDropdown from "./InputDropdown";
import editPetModalValues from "../../constants/EditPetModalValues"
export default {
  name: "edit-pet-modal",
  components: {
    DatePicker,
    InputDropdown
  },
  props: [  
    'elementId',
    'type',
    'id'
  ],
  data() {
    return {
      inputValue: "",
      enumType: editPetModalTypeEnum      
    };
  },

  methods: {

    setElementIdAndGetDefaultInputValue(elementId) {
      this.$parent.setElementId(elementId);
      this.inputValue = this.getDefaultInputValue();
    },
    getDefaultInputValue() {
      return this.$parent.getDefaultInputValue();
    },
    editValue() {
      this.$parent.editValue(this.inputValue);
    },
    changeDate(val) {
      this.inputValue = val;
    }
  }
};
</script>

<style scoped>
</style>