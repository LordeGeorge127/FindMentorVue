<template>
  <form @submit.prevent='submitForm'>
    <div class='form-control' :class='{invalid : !firstName.isValid}'>
      <label for='FirstName'>FirstName</label>
      <input type='text' id='firstname' v-model.trim='firstName.val' @blur="clearValidity('firstName')"/>
    </div>
    <div class='form-control' :class='{invalid : !lastName.isValid}'>
      <label for='LastName'>LastName</label>
      <input type='text' id='lastname' v-model.trim='lastName.val'  @blur="clearValidity('lastName')" />
    </div>
    <div class='form-control' :class='{invalid : !rate.isValid}'>
      <label for='rate'>Rate</label>
      <input type='number' id='rate' v-model.number='rate.val'  @blur="clearValidity('rate')"/>
    </div>
    <div class='form-control'>
      <h3>Area of expertise</h3>
      <div>
        <input type='checkbox' id='frontend' value='frontend' v-model.trim='areas.val' @blur="clearValidity('areas')">
        <label for='frontend'>FrontEnd Development</label>
      </div>
      <div>
        <input type='checkbox' id='backend' value='backend' v-model.trim='areas.val' @blur="clearValidity('areas')">
        <label for='backend'>Backend Development</label>
      </div>
      <div>
        <input type='checkbox' id='career' value='career' v-model.trim='areas.val' @blur="clearValidity('areas')">
        <label for='career'>Career Consultation</label>
      </div>
      <p v-if='!areas.isValid'>Select atleast one expertise</p>
    </div>
    <div class='form-control' :class='{invalid : !description.isValid}'>
      <label for='Description'>Description</label>
      <textarea name='description' id='description' cols='30' rows='5' v-model.trim='description.val' @blur="clearValidity('description')"></textarea>
    </div>
    <p v-if='!formIsValid' class='invalid'>Please fix the above areas and submit again</p>
    <base-button> Register</base-button>
  </form>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  emits: ['save-data'],
  components: { BaseButton },
  data() {
    return {
      firstName: {
        val: '',
        isValid: true
      },
      lastName: {
        val: '',
        isValid: true
      },
      rate: {
        val: null,
        isValid: true
      },
      areas: {
        val: [],
        isValid: true
      },
      description: {
        val: '',
        isValid: true
      },
      formIsValid: true
    };
  },
  methods: {
    clearValidity(input){
      this[input].isValid = true;

    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
      if (this.areas.val.length === 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        rate: this.rate.val,
        desc: this.description.val,
        areas: this.areas.val
      };
      // console.log(formData);
      this.$emit('save-data', formData);
    },

  }
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>