<template>
  <div>


    <q-layout view="hHh lpR fFf">

      <q-header class="bg-red text-white" height-hint="98">
        <q-toolbar>
          <q-toolbar-title>
            <q-avatar class="lo q-mt-xs">
              <img :src="imag">
            </q-avatar>
            Ejercicio Pokemon
          </q-toolbar-title>
        </q-toolbar>

        <q-tabs align="left">
          <q-route-tab to="/" label="PokeHome" />
          <q-route-tab to="/pokedex" label="Pokedex" />
          <q-route-tab to="/pokegame" label="Pokejuego" />
        </q-tabs>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>

      <q-footer elevated class="bg-grey-10 text-white text-center" style="height: 80px;">
        <div class="row juj flex flex-center q-pt-md">
          <div class="col-12 text-center"><img :src="yhy" class="q-mr-md"><img :src="yhy" class="q-mr-md"><img :src="yhy"></div>
        </div>
      </q-footer>


    </q-layout>


  </div>
</template>


<script setup>
import { ref } from "vue"
import imag from './assets/pokebola.jpg'
import yhy from './assets/hyh.png'

</script>



<style>
.juj img {
  height: 50px;
  width: 50px;
}
</style>
