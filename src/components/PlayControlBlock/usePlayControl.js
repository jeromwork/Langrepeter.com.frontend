import { ref, watchEffect, onMounted } from 'vue';
import { useAudio } from '@vueuse/core';

const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const usePlayControl = (src) => {
    const audio = useAudio(src, { autoplay: false, muted: false });

    const isPlaying = ref(false);
    const currentTime = ref(0);
    const duration = ref(null);

    watchEffect(() => {
        if (isPlaying.value) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    watchEffect(() => {
        audio.currentTime.value = currentTime.value;
    });

    const togglePlay = () => {
        isPlaying.value = !isPlaying.value;
    };

    const onTimeUpdate = () => {
        currentTime.value = audio.currentTime.value;
    };

    const onLoadedMetadata = () => {
        duration.value = audio.duration.value;
    };

    const onEnded = () => {
        isPlaying.value = false;
    };

    onMounted(() => {
        audio.onTimeUpdate(onTimeUpdate);
        audio.onLoadedMetadata(onLoadedMetadata);
        audio.onEnded(onEnded);
    });

    return {
        audio,
        isPlaying,
        currentTime,
        duration,
        togglePlay,
        formatTime
    };
};

export default usePlayControl;
