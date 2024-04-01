<template>
  <q-page class="ba">
    <div class="header">
      <div class="hea">
        <input type="text" v-model="id" placeholder="Ingrese nombre/id"><br>
      </div>
    </div>
    
    <div style="position: relative;">
      <div class="linea-superior"></div>
      <div class="linea-inferior"></div>
      <div class="circulo-blanco"></div>
      <div class="circulo-rojo"></div>
      <button @click="traer()" class="pokeb"></button>
    </div>
    
    <div v-if="filteredTypes.length > 0" class="card1">
      <div class="pdr" v-for="(typeData, index) in filteredTypes" :key="index"
        :style="{ backgroundColor: tipoFondos[typeData.type.name] }">
    
        <div class="cont1">
          <h5>Datos:</h5>
          <p class="stat"> Nombre: <span style="color: aliceblue;">{{ pokemon.name }}</span> </p>
          <p class="stat"> Peso: <span style="color: aliceblue;">{{ pokemon.weight/10 }} kg</span> </p>
          <p class="stat"> Id: <span style="color: aliceblue;">{{ pokemon.id }}</span> </p>
          <p class="stat"> Altura: <span style="color: aliceblue;">{{ pokemon.height/10 }} m</span> </p>
        </div>
    
        <div class="card2">
          <div class="imagen_pokemon">
            <img v-if="pokemon.sprites && pokemon.sprites.front_default" :src="pokemon.sprites.front_default">
          </div>
          <h3 class="stat">Tipo:</h3>
          <p class="tip">
            <span v-for="(typeData, index) in pokemon.types" :key="index"
              :style="{ backgroundColor: tipoColores[typeData.type.name] }" class="stat">
              {{ traducirTipo(typeData.type.name) }}
              <span v-if="index !== pokemon.types.length - 1"><br></span>
            </span>
          </p>
        </div>
    
        <div class="cont2">
          <h3>Estadísticas:</h3>
          <li v-for="(stat, key) in pokemon.stats" :key="key">
            <progress :value="stat.base_stat" max="255"></progress> <span class="stat">{{ stat.stat.name }}:</span> <span class="stat">{{ stat.base_stat }}</span>  
          </li>
        </div>
    
      </div>
    </div>
    
  </q-page>
</template>
  
  <script setup>
  import { ref,computed } from "vue"
  import axios from 'axios';
  import Swal from 'sweetalert2'
  import gi from '../assets/pokegif.gif'
  import err from '../assets/err.gif'
  
  
  const filteredTypes = computed(() => {
    // Filtramos la lista para obtener solo el primer tipo
    return pokemon.value?.types?.slice(0, 1) || [];
  });
  
  let pokemon = ref([])
  
  
  
  
  const tipoFondos = {
    fire: '#E72324',
    water: '#5f55a8',
    grass: '#3DA224',
    normal: '#A0A2A0',
    fighting: '#FF8100',
    flying: '#82BAF0',
    poison: '#923FCC',
    ground: '#92501B',
    rock:  '#B0AB82',
    bug:  '#92A212',
    ghost: '#713F71',
    steel:  '#60A2B9',
    electric: '#FAC100',
    psychic: '#EF3F7A',
    ice: '#3DD9FF',
    dragon: '#4F60E2',
    dark: '#4F3F3D',
    fairy: '#EF71F0',
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
    rock:  '#B0AB82',
    bug:  '#92A212',
    ghost: '#713F71',
    steel:  '#60A2B9',
    electric: '#FAC100',
    psychic: '#EF3F7A',
    ice: '#3DD9FF',
    dragon: '#4F60E2',
    dark: '#4F3F3D',
    fairy: '#EF71F0',
  };
  
  let id = ref("")
  
   

  async function traer() {
  
    if(id.value === ""){
      Swal.fire({
      imageUrl: err,
      imageWidth: 400,
      imageHeight: 200,
      backdrop: `
      rgba(123,50,0,0.4)  `,
      customClass: {
            popup: 'small-alert'
          },
          customClass: {
            confirmButton: 'no-margin-top'
          },
      text: "Por favor digite un nombre o id Pokemon",
      });
      }else{
        try {
      let r = await axios.get("https://pokeapi.co/api/v2/pokemon/" + id.value)
      pokemon.value = r.data
      console.log(r.data);
      console.log(id.value);
  
      Swal.fire({
      title: '¡Un Pokémon salvaje apareció!',
      imageUrl: gi,
      imageWidth: 400,
      imageHeight: 200,
      backdrop: `
          rgba(0,123,0,0.4)  `,
      customClass: {
            popup: 'small-alert'
          },
          customClass: {
            confirmButton: 'no-margin-top'
          }
});
    } catch (error) {
      Swal.fire({
      imageUrl: err,
      imageWidth: 400,
      imageHeight: 200,
      backdrop: `
      rgba(123,50,0,0.4)  `,
      text: "Por favor digite un nombre o id Pokemon Valido",
      customClass: {
            popup: 'small-alert'
          },
          customClass: {
            confirmButton: 'no-margin-top'
          }
      });
    }
      }
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
  </script>
  
  <style>
  
  * {
    margin: 0;
    
  }
  
  .pdr {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 15px;
    z-index: 1;
    border: solid;
    margin-top: 7%;
    margin-bottom: 3%;
  }
  
  .imagen_pokemon img {
    width: 200px;
    height: 200px;
    border-radius: 10px;
  }
  
  .card1 {
    display: flex;
    justify-content: center;
  }
  
  
  .cont1{
      border: solid  #0d00ff;;
      background: gray;
      text-align: center;
      border-radius: 10px;
      margin: 30px;
    } 

    .cont2{
      margin: 30px;
    }
  
  .stat{
    font-size: 140%;
    font-weight: bold;
    font-family: sans-serif;
  }
  
  .card2 {
    border: solid;
    border-color: #0d00ff;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: gray;
    margin: 30px;
  }
  
  .tip {
    border: solid;
    width: 70%;
    background-color: #8b8b8b;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  
  .tipos {
    height: 300px;
    width: 300px;
  }
  
  /* header---------------------------------------------- */
  
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 15vh;
    background: red;
    flex-direction: column;
  }
  
  .hea{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  
  .logo{
    height: 100px;
    width: 100px;
  }
  
  .header input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center; 
    font-size: 130%;
  }
  
  
  /* header---------------------------------------------- */
  
  
  
  /* pokebola----------------------------------------------- */
  .linea-superior {
    position: absolute;
    top: 50%;
    width: 100%;
    height: 12px;
    background-color: black;
  }
  
  .linea-inferior {
    position: absolute;
    bottom: 50%;
    width: 100%;
    height: 12px;
    background-color: black;
  }
  
  .circulo-blanco {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background-color: white;
    border: 15px solid black;
    border-radius: 50%;
    z-index: 1;
  }
  
  .pokeb {
    position: absolute;
    width: 30px;
    height: 30px;
    border: 4px solid #7f8c8d;
    border-radius: 50%;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    box-shadow: 0 0 0 7px black;
    background: #ff0000;
    z-index: 10;
    animation: blink 0.5s alternate infinite;
    cursor: pointer;
  }
  
  .pokeb:hover {
    animation-play-state: running;
  }
  
  @keyframes blink {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.1);
    }
  }
  
  
  /* pokebola----------------------------------------------- */
  
  @media  (max-width: 1000px) {
    .pdr {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 15px;
    z-index: 1;
    border: solid;
    margin-top: 10%;
    margin-bottom: 3%;
    flex-direction: column;
  }

  .card1 {
    display: flex;
    justify-content: center;
    height: auto;
  }
  }
  
  @media  (max-width: 800px){
  
  
    .linea-superior {
      position: absolute;
      top: 35%;
      width: 100%;
      height: 6px;
      background-color: black;
    }
    
    .linea-inferior {
      position: absolute;
      bottom: 65%;
      width: 100%;
      height: 6px;
      background-color: black;
    }
    
    .circulo-blanco {
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px;
      height: 50px;
      background-color: white;
      border: 15px solid black;
      border-radius: 50%;
      z-index: 1;
    }
    .pokeb {
      position: absolute;
      width: 30px;
      height: 30px;
      border: 4px solid #7f8c8d;
      border-radius: 50%;
      top: calc(35% - 15px);
      left: calc(50% - 15px);
      box-shadow: 0 0 0 0px black;
      background: #ff0000;
      z-index: 10;
      animation: blink 0.5s alternate infinite;
      cursor: pointer;
    }
  }

  
  </style>
