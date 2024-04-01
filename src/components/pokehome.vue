<template>
    <q-page class="flex flex-center ba">
        <div class="row" style="width: 100%; ">
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-md">
                <q-card class="card-hover q-hover" @click="clic()">
                    <q-card-section style="background-color: crimson;">
                        <div class="text-h6 text-center">Busca los pokemones que quieras con la Pokedex</div>
                    </q-card-section>
                    <q-card-section class="text-center bg-grey-10">

                        <q-avatar size="250px">
                            <img :src="pok"><br>
                        </q-avatar>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-md">
                <q-card class="card-hover q-hover" @click="cli()">
                    <q-card-section style="background-color: crimson;">
                        <div class="text-h6 text-center">Adivina Pokemones con este minijuego</div>
                    </q-card-section>
                    <q-card-section class="text-center bg-grey-10" >

                        <q-avatar size="250px">
                            <img :src="qui"><br>
                        </q-avatar>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script setup>

import { ref } from "vue"
import pok from '../assets/pokex.jpg'
import qui from '../assets/quien.jpg'
import fondo from '../assets/fon.jpg'
import {router} from "../routes/routes.js"


function clic(){
    router.push('/pokedex')
}

function cli(){
    router.push('/pokegame')

}

</script>

<style>

.ba{
    background-image: url('../assets/fon.jpg');
  background-size: cover;
  background-position: center;
}

.card-hover{
    transition: transform 0.3s ease;
    cursor: pointer;
}
.card-hover:hover{
    transform: scale(0.9);
}
</style>