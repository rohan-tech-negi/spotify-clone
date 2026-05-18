import React from 'react'

const SongsTable = () => {
  const { songs, isLoading, error, deleteSong } = useMusicStore();

	if (isLoading) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-zinc-400'>Loading songs...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='flex items-center justify-center py-8'>
				<div className='text-red-400'>{error}</div>
			</div>
		);
	}
  return (
    <div>SongsTable</div>
  )
}

export default SongsTable