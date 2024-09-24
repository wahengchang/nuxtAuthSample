<template>
  <form @submit.prevent="submitForm" class="collection-form">
    <v-text-field
      id="name"
      v-model="collection.name"
      label="Collection Name"
      required
      filled
      dense
      solo
      class="collection-form-input"
    ></v-text-field>

    <v-textarea
      id="description"
      v-model="collection.description"
      label="Description"
      filled
      dense
      solo
      class="collection-form-input"
    ></v-textarea>

    <div class="fields-section">
      <h3>Fields</h3>
      <div v-for="(field, index) in collection.fields" :key="index" class="field-item">
        <v-text-field
          v-model="field.name"
          label="Field name"
          required
          filled
          dense
          solo
          class="collection-form-input field-name"
        ></v-text-field>

        <v-select
          v-model="field.type"
          :items="fieldTypes"
          label="Field type"
          filled
          dense
          solo
          class="collection-form-input field-type"
        ></v-select>

        <v-checkbox
          v-model="field.required"
          label="Required"
          class="field-required"
        ></v-checkbox>

        <v-btn @click.prevent="removeField(index)" icon color="error">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
      <v-btn @click.prevent="addField" color="secondary" text>
        <v-icon left>mdi-plus</v-icon>
        Add Field
      </v-btn>
    </div>

    <v-checkbox
      id="isPublic"
      v-model="collection.isPublic"
      label="Make this collection public"
      class="collection-form-input"
    ></v-checkbox>

    <v-btn type="submit" color="primary" block class="collection-button">
      {{ isEdit ? 'Update' : 'Create' }} Collection
    </v-btn>
  </form>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    initialCollection: {
      type: Object,
      default: () => ({
        name: '',
        description: '',
        fields: [],
        isPublic: false
      })
    }
  },
  data() {
    return {
      collection: { ...this.initialCollection },
      fieldTypes: [
        { text: 'Text', value: 'text' },
        { text: 'Number', value: 'number' },
        { text: 'Date', value: 'date' },
        { text: 'Relation', value: 'relation' }
      ]
    }
  },
  methods: {
    addField() {
      this.collection.fields.push({ name: '', type: 'text', required: false })
    },
    removeField(index) {
      this.collection.fields.splice(index, 1)
    },
    async submitForm() {
      try {
        if (this.isEdit) {
          await this.$axios.put(`/api/collections/${this.collection._id}`, this.collection)
        } else {
          await this.$axios.post('/api/collections', this.collection)
        }
        this.$router.push('/collections')
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    }
  }
}
</script>

<style scoped>
.collection-form {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

.collection-form-input {
  margin-bottom: 15px;
}

.collection-button {
  margin-top: 20px;
}

.fields-section {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: left;
}

.fields-section h3 {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 10px;
}

.field-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.field-name {
  flex-grow: 2;
  margin-right: 10px;
}

.field-type {
  flex-grow: 1;
  margin-right: 10px;
}

.field-required {
  margin-right: 10px;
}
</style>