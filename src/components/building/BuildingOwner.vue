<template>
  <v-card flat max-width="600" class="mx-auto mt-10">
    <v-card-text class="text-center">
      <h3>Building owner</h3>
    </v-card-text>
    <v-row justify="center" class="my-2 mx-auto">
      <v-text-field
          label="Name"
          outlined
          hide-details
          v-model="name"
      ></v-text-field>
    </v-row>
    <v-row justify="center" class="my-2 mx-auto">
      <v-text-field
        label="Email"
        outlined
        hide-details
        v-model="email"
      ></v-text-field>
    </v-row>
    <v-row justify="center" class="my-2 mx-auto">
      <v-text-field
        label="Phone"
        outlined
        hide-details
        v-model="phone"
      ></v-text-field>
    </v-row>
    <v-row justify="center" class="my-2 mx-auto">
      <v-text-field
          label="Address"
          outlined
          hide-details
          v-model="address"
      ></v-text-field>
    </v-row>
    <v-row justify="center" class="my-2 mx-auto">
      <v-text-field
          label="Contact person"
          outlined
          hide-details
          v-model="person"
      ></v-text-field>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'BuildingOwner',
  props: ['data', 'changed'],
  computed: {
    name: {
      get () {
        return this.data.owner.name
      },
      set (val) {
        this.setValue('name', val)
      }
    },
    email: {
      get () {
        return this.data.owner.email
      },
      set (val) {
        this.setValue('email', val)
      }
    },
    phone: {
      get () {
        return this.data.owner.phone
      },
      set (val) {
        this.setValue('phone', val)
      }
    },
    address: {
      get () {
        return this.data.owner.address
      },
      set (val) {
        this.setValue('address', val)
      }
    },
    person: {
      get () {
        return this.data.owner.contactPerson
      },
      set (val) {
        this.setValue('contactPerson', val)
      }
    }
  },
  methods: {
    setValue (propName, value) {
      const owner = Object.assign({}, this.data.owner, { [propName]: value })
      localStorage.setItemByName('selectedBuilding', Object.assign({}, this.data, { owner }))
      this.$emit('update:changed', true)
    }
  }
}
</script>
