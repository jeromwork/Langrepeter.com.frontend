import SequenceItem from './SequenceItem'

export default interface EchoPlayerSettings {
    player: string;
    showWord: boolean;
    countRepeats: number;
    baseLang: string;
    targetLang: string;
    marginBetween: number;
    marginInside: number;
    sequence: SequenceItem[];
}
