<template>
  <div>

    <Card style="width: 25em">
      <template #header>
        <img src="https://www.primefaces.org/wp-content/uploads/2020/02/primefacesorg-primevue-2020.png" style="height: 15rem" />
      </template>
      <template #title>
        Advanced Card
      </template>
      <template #subtitle>
        Card subtitle
      </template>
      <template #content>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
          quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Save" />
        <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
      </template>
    </Card>

    <div class="audioWrapper">
      <h3>get audio</h3>
    </div>


    <input type="text" v-model="words" placeholder="enter words by ;">


    <button @click="getEcho">getEcho</button>

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
  name: "Repeaters",

  setup() {
    const recording : Ref<boolean> =  ref(false);
    let storedFileNames :FileInfo[] = reactive([])
    const fileName : Ref<string> =  ref('');
    const consoleStr : Ref<string> =  ref('');
    const meaningStr : Ref<string> =  ref('');
    const meaningEng : Ref<string> =  ref('');
    const words : Ref<string> =  ref('');
    const lang : Ref<string> =  ref('eng');


    onMounted(async () =>{
      console.log('onMounted')

      await VoiceRecorder.requestAudioRecordingPermission()
    });

  const getEcho = async() => {
    //and then we need to send this file to server
    let formData = new FormData();
    formData.append('words', words.value);
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

  }
    return {
      fileName,
      consoleStr,
      storedFileNames,
      meaningStr,
      lang,
      meaningEng,
      words,
      getEcho,


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
