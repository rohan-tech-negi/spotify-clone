import { usePlayerStore } from '@/stores/usePlayerStore';
import React from 'react'

const PlaybackControls = () => {
    const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();

    const [volume, setVolume] = useState(75);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
  return (
    <div>PlaybackControls</div>
  )
}

export default PlaybackControls