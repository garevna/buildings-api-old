<template>
  <v-card flat max-width="600" class="mx-auto mb-12">
    <v-row>
      <v-col
        cols=12
        sm="6"
        md="4"
        lg="3"
        v-for="(icon, index) in $typeIcons"
        :key="index"
      >
        <v-icon :color="$typeColors[index]"> {{ icon }} </v-icon>
        {{ $buildingTypes[index] }}
      </v-col>
    </v-row>
  </v-card>
</template>
