import type { Song } from '@/types';
import React from 'react'


type SectionGridProps = {
	title: string;
	songs: Song[];
	isLoading: boolean;
};

const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {
  if (isLoading) return <SectionGridSkeleton />;
  return (
    <div>SectionGrid</div>
  )
}

export default SectionGrid