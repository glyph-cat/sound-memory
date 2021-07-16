import ReactModularAudioPlayer from 'react-modular-audio-player'
// import styles from './index.module.css'

export interface AudioPlayerProps {
  src: string
}

function AudioPlayer(props: AudioPlayerProps): JSX.Element {
  const { src } = props
  return (
    <ReactModularAudioPlayer
      hideForward
      hideRewind
      hideLoop
      hideName
      audioFiles={[{ src, title: '', artist: '' }]}
    />
  )
}

export default AudioPlayer
