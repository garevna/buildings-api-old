<template>
  <v-dialog v-model="opened" max-width="480px" class="pa-4">
    <v-card flat class="pb-8">
      <v-toolbar dark dense color="#900">
        <v-icon class="mr-4"> $delete </v-icon>
        <v-toolbar-title> Delete </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('update:opened', false)">
          <v-icon large> $close </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="text-center mt-10">
        <h4>Are you sure you want to delete<br>this building?</h4>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#09b" text large @click="$emit('update:opened', false)">Cancel</v-btn>
        <v-btn color="#09b" text large @click="confirmDelete">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'PopupDelete',
  props: ['opened', 'delete'],
  methods: {
    confirmDelete () {
      this.$emit('update:delete', true)
      this.$emit('update:opened', false)
    }
  }
}
</script>
