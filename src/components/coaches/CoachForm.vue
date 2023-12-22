<template>
  <form @submit.prevent='submitForm'>
    <div class='form-control'>
      <label for='FirstName'>FirstName</label>
      <input type='text' id='firstname' v-model.trim='firstName' />
    </div>
    <div class='form-control'>
      <label for='LastName'>LastName</label>
      <input type='text' id='lastname' v-model.trim='lastName' />
    </div>
    <div class='form-control'>
      <label for='rate'>Rate</label>
      <input type='number' id='rate' v-model.number='rate' />
    </div>
    <div class='form-control'>
      <h3>Area of expertise</h3>
      <div>
        <input type='checkbox' id='frontend' value='frontend' v-model.trim='areas'>
        <label for='frontend'>FrontEnd Development</label>
      </div>
      <div>
        <input type='checkbox' id='backend' value='backend' v-model.trim='areas'>
        <label for='backend'>Backend Development</label>
      </div>
      <div>
        <input type='checkbox' id='career' value='career' v-model.trim='areas'>
        <label for='career'>Career Consultation</label>
      </div>
    </div>
    <div class='form-control'>
      <label for='Description'>Description</label>
      <textarea name='description' id='description' cols='30' rows='5' v-model.trim='description'></textarea>
    </div>
    <base-button> Register</base-button>
  </form>
</template>

<script>
import BaseButton from '@/components/ui/BaseButton.vue';

export default {
  emits:['save-data'],
  components: { BaseButton },
  data() {
    return {
      firstName: '',
      lastName: '',
      rate: null,
      areas: [],
      description: ''
    };
  },
  methods: {
    submitForm() {
      const formData = {
        first: this.firstName,
        last: this.lastName,
        rate: this.rate,
        desc: this.description,
        areas: this.areas
      };
      // console.log(formData);
      this.$emit('save-data',formData);
    }

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