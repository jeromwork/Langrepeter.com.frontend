<template>
  <div>
    <span v-if="recording">recording</span> ||
    <span >{{consoleStr}}</span>||
    <span >{{fileName}}</span>||

    <div class="audioWrapper">
      <h3>recording test</h3>
    </div>
    <select v-model="lang">
      <option value="eng" selected>eng</option>
      <option value="rus" selected>rus</option>
    </select>

    <input type="text" v-model="meaningStr" placeholder="meaning">

    <input v-if="lang !== 'eng'" type="text" v-model="meaningEng" placeholder="meaning eng">
    <button @click="startRecording">startRecording</button>
    <button @click="stopRecording">stopRecording</button>

    storedFileNames
    <div v-if="storedFileNames" v-for="file in storedFileNames">
      <button  style="border-color: #2c3e50" @click="playFile(file.name)">      {{file.name}}</button>

    </div>
  </div>
</template>

<script lang="ts">
  import type {Ref} from 'vue'
  import {defineComponent, onMounted, ref, reactive, toRefs} from "vue";
  import {Directory, Filesystem, FileInfo} from "@capacitor/filesystem";
  import {VoiceRecorder} from "capacitor-voice-recorder";
  import {RecordingData} from "capacitor-voice-recorder/dist/esm/definitions";
  import _ from "lodash"
  import axios from 'axios';
  export default defineComponent({
  components: {  },
  name: "AudioRecorder",

  setup() {
    const recording : Ref<boolean> =  ref(false);
    let storedFileNames :FileInfo[] = reactive([])
    const fileName : Ref<string> =  ref('');
    const consoleStr : Ref<string> =  ref('');
    const meaningStr : Ref<string> =  ref('');
    const meaningEng : Ref<string> =  ref('');
    const lang : Ref<string> =  ref('eng');



    async function  startRecording() {

      if(recording.value || meaningStr.value === '' || (lang.value !== 'eng' && meaningEng.value === '')){
        return;
      }
      recording.value = true
      await VoiceRecorder.startRecording();
      // await AudioRecorder.authorize();
      // await AudioRecorder.start({
      //   fileName: "test.m4a",
      //   duration: 6.0,
      // });
      // isRecording.value = true;
    };

    async function   stopRecording (){
      if(!recording.value ){
        return;
      }


          VoiceRecorder.stopRecording().then(async (result:RecordingData) => {
            if(result.value && result.value.recordDataBase64){
              const recordData = result.value.recordDataBase64;
              consoleStr.value += 'duration '+ result.value.msDuration+'; '
              // fileName.value = new Date().getTime() + '.wav';
              // // consoleStr.value = JSON.stringify(Directory, null, 3)
              // await Filesystem.writeFile({
              //   path:fileName.value,
              //   directory:Directory.Data,
              //   data:recordData
              // })
              //and then we need to send this file to server
              let formData = new FormData();
              formData.append('file', recordData);
              formData.append('meaning', meaningStr.value);
              formData.append('meaningEng', (lang.value === 'eng') ? meaningStr.value : meaningEng.value );
              formData.append('lang', lang.value);

              await axios.post( 'http://192.168.1.57:80/api/video/sample',
                      formData,
                      {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        }
                      }
              ).then(function(res){
                consoleStr.value += ' SUCCESS!! ';
                //consoleStr.value += JSON.stringify(res, null, 3)
              })
                      .catch(function(error){
                        consoleStr.value += JSON.stringify(error, null, 3)
                        consoleStr.value += ' FAILURE!! ';
                      });

              await loadFiles();
              meaningStr.value = '';
              meaningEng.value = '';
              recording.value = false
            }

          })
    }


    onMounted(async () =>{
      console.log('onMounted')
      await loadFiles();
      await VoiceRecorder.requestAudioRecordingPermission()
    });

    const  loadFiles = async () => {
      Filesystem.readdir({
        path:'',
        directory:Directory.Data
      }).then(result => {
        storedFileNames = _.merge(storedFileNames, result.files);
      })
    }

  const playFile = async(fileName:any) => {
      const audioFile = await Filesystem.readFile({
        path:fileName,
        directory:Directory.Data
      });

      const base64Sound = audioFile.data
    const audioRef = new Audio(`data:audio/aac;base64,${base64Sound}`);
      audioRef.oncanplaythrough =() => audioRef.play();
      audioRef.load();

  }
    return {
      startRecording,
      stopRecording,
      recording,
      fileName,
      consoleStr,
      storedFileNames,
      playFile,
      meaningStr,
      lang,
      meaningEng,


      // startPlaying,
      // stopPlaying,
      // isRecording,
      // audioSrc,
    };
  },
});
</script>

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
