

<script setup lang="ts" >
  import type {Ref} from 'vue'
  import {defineComponent, onMounted, ref, reactive, toRefs, defineExpose} from "vue";
  import {Directory, Filesystem, FileInfo} from "@capacitor/filesystem";
  import {VoiceRecorder} from "capacitor-voice-recorder";
  import {RecordingData} from "capacitor-voice-recorder/dist/esm/definitions";
  import _ from "lodash"
  import axios from 'axios';
  const recording : Ref<boolean> =  ref(false);
  const playing : Ref<boolean> =  ref(false);
  let storedFileNames :FileInfo[] = reactive([])
  const fileName : Ref<string> =  ref('');
  const consoleStr : Ref<string> =  ref('');
  const meaningStr : Ref<string> =  ref('');
  const meaningEng : Ref<string> =  ref('');
  const src : Ref<string> =  ref('https://samples-files.com/samples/Audio/mp3/sample-file-4.mp3');
  const words : Ref<string> =  ref('');
  const lang : Ref<string> =  ref('eng');
  const player = ref<InstanceType<typeof HTMLVideoElement>>();


  onMounted(async () =>{
    console.log('onMounted')
    // const audio = new Audio('https://file-examples.com/wp-content/storage/2017/11/file_example_MP3_700KB.mp3'); // path to file
    // await audio.play();
    // await VoiceRecorder.requestAudioRecordingPermission()
  });

  // const getEcho = async() => {
  //   //and then we need to send this file to server
  //   let formData = new FormData();
  //   formData.append('words', words.value);
  //   formData.append('lang', lang.value);
  //
  //   await axios.post( 'http://192.168.1.57:80/api/video/sample',
  //           formData,
  //           {
  //             headers: {
  //               'Content-Type': 'multipart/form-data'
  //             }
  //           }
  //   ).then(function(res){
  //     consoleStr.value += ' SUCCESS!! ';
  //     //consoleStr.value += JSON.stringify(res, null, 3)
  //   })
  //           .catch(function(error){
  //             consoleStr.value += JSON.stringify(error, null, 3)
  //             consoleStr.value += ' FAILURE!! ';
  //           });
  //
  // }

  const play = () => {
    if(player.value){
      player.value.play();
    }

    setPlaying(true);
  }
  const setPlaying = (  state :boolean ) => {
    playing.value = state;
  }
  defineExpose({
    src,
    words,
    // ... expose other variables or functions here
  });


  toRefs({
    recording,
    playing,
    storedFileNames,
    fileName,
    consoleStr,
    meaningStr,
    meaningEng,
    src,
    words,
    lang,
    player,
  });
</script>


<template>
  <div>


    <div class="audioWrapper">
      <h3>get audio</h3>
    </div>

    <video
            :src="src"
            :muted="muted"
            :autoplay="autoplay"
            :controls="controls"
            :loop="loop"
            :width="width"
            :height="height"
            :poster="poster"
            :preload="preload"
            :playsinline="true"
            ref="player"
    />


    <input type="text" v-model="words" placeholder="enter words by ;">


    <button @click="getEcho">getEcho</button>

  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .recordingText {
    font-weight: bold;
    color: red;
    padding: 16px;
  }
  .audioWrapper {
    padding: 16px;
  }
  .hide-audio {
    display: none;
  }
</style>
