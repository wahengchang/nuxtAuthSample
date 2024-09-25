<template>
    <v-form ref="form" v-model="isFormValid" @submit.prevent="submitForm">
      <v-text-field
        v-model="formData.name"
        label="Collection Name"
        id="collection-name"
      ></v-text-field>
  
      <v-textarea
        v-model="formData.description"
        label="Description"
        id="collection-description"
      ></v-textarea>
  
      <v-switch
        v-model="formData.isPublic"
        label="Public Collection"
        id="collection-isPublic"
      ></v-switch>
      <v-row v-for="(field, index) in formData.fields" :key="index" class="mb-4">
        <v-col cols="5">
          <v-text-field
            v-model="field.name"
            label="Field Name"
            :id="'field-name-' + index"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="field.type"
            :items="fieldTypes"
            item-text="label"
            item-value="value"
            label="Field Type"
            :id="'field-type-' + index"
          >
            <template v-slot:selection="{ item }">
              <v-icon v-if="item.icon" left>{{ item.icon }}</v-icon>
              {{ item.label }}
            </template>
            <template v-slot:item="{ item }">
              <v-icon v-if="item.icon" left>{{ item.icon }}</v-icon>
              {{ item.label }}
            </template>
          </v-select>
        </v-col>
        <v-col cols="3">
          <v-switch
            v-model="field.required"
            label="Required"
          ></v-switch>
        </v-col>
        <v-col cols="1">
          <v-btn @click="removeField(index)" color="error" icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
  
      <v-btn @click="addField" color="secondary" class="mb-4" id="add-field">
        Add Field
      </v-btn>
  
      <v-btn
        id="submit-collection"
        type="submit"
        color="primary"
        :disabled="!isFormValid"
      >
        {{ submitButtonText }}
      </v-btn>
  
      <v-btn @click="cancel" text>
        Cancel
      </v-btn>
    </v-form>
  </template>
  
  <script>
  import { fieldTypes } from '~/utils/fieldTypes'

  export default {
    name: 'CollectionForm',
    props: {
      collection: {
        type: Object,
        default: () => ({
          name: '',
          description: '',
          isPublic: false,
          fields: []
        })
      },
      submitButtonText: {
        type: String,
        default: 'Save'
      }
    },
    data() {
        console.log(this.collection)
      return {
        formData: { ...this.collection },
        isFormValid: true,
        fieldTypes
      }
    },
    methods: {
      addField() {
        if (!this.formData.fields) {
          this.formData = { ...this.formData, fields: [] }
        }
        this.formData.fields.push({ name: '', type: '', required: false })
      },
      removeField(index) {
        this.formData.fields.splice(index, 1)
      },
      async submitForm() {
        if (this.$refs.form) {
          this.$emit('submit', this.formData)
        }
      },
      cancel() {
        this.$emit('cancel')
      }
    }
  }
  </script>