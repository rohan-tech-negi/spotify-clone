import Topbar from '@/components/Topbar'
import { useMusicStore } from '@/stores/useMusicStore';
import React, { useEffect } from 'react'

const HomePage = () => {

  const {
		fetchFeaturedSongs,
		fetchMadeForYouSongs,
		fetchTrendingSongs,
		isLoading,
		madeForYouSongs,
		featuredSongs,
		trendingSongs,
	} = useMusicStore();

  	useEffect(() => {
		fetchFeaturedSongs();
		fetchMadeForYouSongs();
		fetchTrendingSongs();
	}, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  
  return (
    <main className="rounded-md overflow-hidden h-full bg-zinc-900">
      <Topbar />
    </main>
  )
}

export default HomePage