<template>
  <v-card flat max-width="600" class="mx-auto mt-10">
    <v-card-text class="text-center">
      <h3>Building management</h3>
    </v-card-text>
    <v-row justify="center" class="my-2 mx-auto">
      <v-text-field
          label="Company Name"
          outlined
          hide-details
          v-model="managementName"
          autocomplete="off"
      ></v-text-field>
    </v-row>
    <v-row justify="center" class="my-2 mx-auto">
      <v-text-field
        label="Email"
        outlined
        hide-details
        v-model="managementEmail"
        autocomplete="off"
      ></v-text-field>
    </v-row>
    <v-row justify="center" class="my-2 mx-auto">
      <v-text-field
        label="Phone"
        outlined
        hide-details
        v-model="managementPhone"
        autocomplete="off"
      ></v-text-field>
    </v-row>
    <v-row justify="center" class="my-2 mx-auto">
      <v-text-field
          label="Address"
          outlined
          hide-details
          v-model="managementAddress"
          autocomplete="off"
      ></v-text-field>
    </v-row>
    <v-row justify="center" class="my-2 mx-auto">
      <v-text-field
          label="Contact person"
          outlined
          hide-details
          v-model="contactPerson"
          autocomplete="off"
      ></v-text-field>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'BuildingManagement',
  props: ['data', 'changed'],
  computed: {
    managementName: {
      get () {
        return this.data.management.name
      },
      set (val) {
        this.setValue('name', val)
      }
    },
    managementEmail: {
      get () {
        return this.data.management.email
      },
      set (val) {
        this.setValue('email', val)
      }
    },
    managementPhone: {
      get () {
        return this.data.management.phone
      },
      set (val) {
        this.setValue('phone', val)
      }
    },
    managementAddress: {
      get () {
        return this.data.management.address
      },
      set (val) {
        this.setValue('address', val)
      }
    },
    contactPerson: {
      get () {
        return this.data.management.contactPerson
      },
      set (val) {
        this.setValue('contactPerson', val)
      }
    }
  },
  methods: {
    setValue (propName, value) {
      const management = Object.assign({}, this.data.management, { [propName]: value })
      localStorage.setItemByName('selectedBuilding', Object.assign(this.data, { management }))
      this.$emit('update:changed', true)
    }
  }
}
</script>
