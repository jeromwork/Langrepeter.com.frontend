

<script setup lang="ts" >
/* eslint no-use-before-define: 0 */  // --> OFF
  import type {Ref} from 'vue'
  import {defineComponent, onMounted, ref, reactive, toRefs, defineExpose} from "vue";
  import {Directory, Filesystem, FileInfo} from "@capacitor/filesystem";
  import {VoiceRecorder} from "capacitor-voice-recorder";
  import {RecordingData} from "capacitor-voice-recorder/dist/esm/definitions";
  import axios from 'axios';
  const recording : Ref<boolean> =  ref(false);
  const playing : Ref<boolean> =  ref(false);
  const autoplay : Ref<boolean> =  ref(true);
  let storedFileNames :FileInfo[] = reactive([])
  const fileName : Ref<string> =  ref('');
  const consoleStr : Ref<string> =  ref('');
  const meaningStr : Ref<string> =  ref('');
  const meaningEng : Ref<string> =  ref('');
  const src : Ref<string> =  ref('https://samples-files.com/samples/Audio/mp3/sample-file-4.mp3');
  const words : Ref<string> =  ref('');
  const lang : Ref<string> =  ref('eng');
  const player = ref<InstanceType<typeof HTMLVideoElement>>();
  const auto = ref<InstanceType<typeof HTMLVideoElement>>();


  /**
   * из json получаем масси объектов
   * из него генерим объекты к примеру Audio
   * Получаем сообщения от Audio и переключаем
   */

  //const audio = ref(new Audio('https://file-examples.com/wp-content/storage/2017/11/file_example_MP3_700KB.mp3')); // path to file

  onMounted(async () =>{
    console.log('onMounted')

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

const audioFiles = [
    'https://audio-samples.github.io/samples/mp3/music/sample-0.mp3',
    'https://audio-samples.github.io/samples/mp3/music_primed/sample-3.mp3',
    'https://audio-samples.github.io/samples/mp3/music_primed/sample-4.mp3',
];

const audios = ref([]);

const playAudio = (audioIndex) => {
    console.log(audioIndex)
    console.log(audios.value)
    console.log(audios.value[audioIndex])
    if (audios.value[audioIndex]) {
        audios.value[audioIndex].play();
        audios.value[audioIndex].addEventListener('ended', () => {
            if(audios.value[audioIndex+1])
                playAudio(audioIndex+1);
            console.log(`Audio ${audioIndex} finished playing`);
            // Perform actions or trigger next audio here
        });
    }



};


onMounted(() => {
    audioFiles.forEach((audioFile, index) => {
        const audio = new Audio(audioFile);
        audio.autoplay = true;

        audio.addEventListener('error', (event) => {
            console.error('Error loading audio:', event.target.error);
        });
        audios.value.push(audio);
       // playAudio(index); // Autoplay each audio file
    });
});

// Optionally, you can also add event listeners to the audio element

  // const play = () => {
  //
  //     console.log('sdkfjwjf')
  //
  //
  //
  //      audio.play();
  //   if(player.value){
  //     player.value.play();
  //   }
  //
  //   setPlaying(true);
  // }
  const setPlaying = (  state :boolean ) => {
    playing.value = state;
  }
  defineExpose({
    src,
    words,
    // ... expose other variables or functions here
  });



</script>


<template>
  <div>
<div ></div>


    <div class="audioWrapper" ref="auto" @click="play">
      <h3>get audio</h3>
    </div>

<!--    <video-->
<!--            :src="src"-->
<!--            :muted="false"-->
<!--            :autoplay="autoplay"-->
<!--            :controls="true"-->
<!--            :loop="loop"-->
<!--            :width="width"-->
<!--            :height="height"-->
<!--            :poster="poster"-->
<!--            :preload="true"-->
<!--            :playsinline="true"-->
<!--            ref="player"-->
<!--    />-->


    <input type="text" v-model="words" placeholder="enter words by ;">


    <button @click="getEcho">getEcho</button>


      <div>
          <button @click="playAudio(0)">Play</button>
      </div>


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
