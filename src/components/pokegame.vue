<template>
  <q-page class="flex flex-center ie">

    <div class="row " style="width: 100%;">
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-md text-center">
        <div class="pokeimagen">
          <img v-if="pokemon.sprites && pokemon.sprites.front_default" :src="pokemon.sprites.front_default"
            :style="{ filter: filterStyle }">
        </div>
        <q-btn color="primary" :label="poke1" @click="validaccion(poke1)" rounded class="q-mr-md q-mt-xs" />
        <q-btn color="secondary" :label="poke2" @click="validaccion(poke2)" rounded class="q-mr-md q-mt-xs" />
        <q-btn color="positive" :label="poke3" @click="validaccion(poke3)" rounded class="q-mr-md q-mt-xs" />
        <q-btn color="negative" :label="poke4" @click="validaccion(poke4)" rounded class="q-mt-xs" />
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 q-pa-md">
        <q-card class="card-hover q-hover">
          <q-card-section style="background-color: crimson;">
            <div class="text-h5 text-center">Pista</div>
          </q-card-section>
          <q-card-section class="text-center bg-grey-10 text-grey-1">
            <div>
              <h5>Estadisticas:</h5>
              <li v-for="(stat, key) in pokemon.stats" :key="key">
                <progress :value="stat.base_stat" max="255"></progress> <span class="stat">{{
            stat.stat.name }}:</span> <span class="stat">{{ stat.base_stat }}</span>
              </li>
            </div>
          </q-card-section>
          <q-card-section class="bg-grey-10 text-grey-1">
            <p class="ty text-center">
              <span v-for="(typeData, index) in pokemon.types" :key="index"
                :style="{ backgroundColor: tipoColores[typeData.type.name] }" class="stat">
                {{ traducirTipo(typeData.type.name) }}
                <span v-if="index !== pokemon.types.length - 1"><br></span>
              </span>
            </p>
          </q-card-section>
        </q-card>
      </div>

    </div>

  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
onMounted(() => {
  traer();
});
import axios from 'axios';
import Swal from 'sweetalert2'
import gi from '../assets/correct.gif'
import err from '../assets/miss.gif'


let pokemon = ref([])
let filterStyle = ref("brightness(0%)");
let poke1 = ref("")
let poke2 = ref("")
let poke3 = ref("")
let poke4 = ref("")





async function traer() {
  let nums = [];
  while (nums.length < 4) {
    let num = random();
    if (!nums.includes(num)) {
      nums.push(num);
    }
  }
  try {
    let promises = nums.map(async num => {
      let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`);
      return response.data.name;
    });
    let pokemonNames = await Promise.all(promises);
    pokemonNames.sort(() => Math.random() - 0.5);
    [poke1.value, poke2.value, poke3.value, poke4.value] = pokemonNames;

    let r = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nums[0]}`);
    filterStyle.value = "brightness(0%)";
    pokemon.value = r.data;
  } catch (error) {
    console.log(error);
  }

}
function random() {
  return Math.floor(Math.random() * 1025) + 1;
}

function validaccion(nombrePokemon) {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)
    .then(response => {
      let pokemonNombre = response.data.name;
      if (pokemonNombre.toLowerCase() === pokemon.value.name.toLowerCase()) {
        filterStyle.value = "brightness(100%)";
        Swal.fire({
          text: `¡Correcto, el Pokémon es ${pokemon.value.name}!`,
          color: "#000000",
          backdrop: `
          rgba(0,123,0,0.4)  `,
          imageUrl: gi,
          imageWidth: 400,
          imageHeight: 200,
          timer: 4000,
          customClass: {
            popup: 'small-alert'
          },
          customClass: {
            confirmButton: 'no-margin-top'
          }
        });
        setTimeout(() => {

          traer();
        }, 5000);
      } else {
        Swal.fire({
          imageUrl: err,
          imageWidth: 400,
          imageHeight: 200,
          color: "#000000",
          backdrop: `
          rgba(123,0,0,0.4)  `,
          text: `Fallaste, ${pokemonNombre} no es este pokemon`,
          timer: 4000,
          customClass: {
            popup: 'small-alert'
          },
          customClass: {
            confirmButton: 'no-margin-top'
          }
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
}


const traduccionesTipos = {
  "normal": "Normal",
  "fighting": "Lucha",
  "flying": "Volador",
  "poison": "Veneno",
  "ground": "Tierra",
  "rock": "Roca",
  "bug": "Bicho",
  "ghost": "Fantasma",
  "steel": "Acero",
  "fire": "Fuego",
  "water": "Agua",
  "grass": "Planta",
  "electric": "Eléctrico",
  "psychic": "Psíquico",
  "ice": "Hielo",
  "dragon": "Dragón",
  "dark": "Siniestro",
  "fairy": "Hada"
};

function traducirTipo(tipo) {
  return traduccionesTipos[tipo] || tipo;
}

const tipoColores = {
  fire: '#E72324',
  water: '#5f55a8',
  grass: '#3DA224',
  normal: '#A0A2A0',
  fighting: '#FF8100',
  flying: '#82BAF0',
  poison: '#923FCC',
  ground: '#92501B',
  rock: '#B0AB82',
  bug: '#92A212',
  ghost: '#713F71',
  steel: '#60A2B9',
  electric: '#FAC100',
  psychic: '#EF3F7A',
  ice: '#3DD9FF',
  dragon: '#4F60E2',
  dark: '#4F3F3D',
  fairy: '#EF71F0',
};
</script>

<style>
.ie {
  background-image: url('../assets/pwp.jpg');
  background-size: cover;
  background-position: center;
}

.pokeimagen img {
  height: 350px;
  width: 350px;
}

.ty {
  border: solid;
  background-color: #8b8b8b;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.small-alert {
  height: 500px;
  /* Ajusta este valor a lo que necesites */
}

.no-margin-top {
  margin: 0 !important;
}
</style>