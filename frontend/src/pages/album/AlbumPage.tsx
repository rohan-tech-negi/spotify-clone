import React from 'react'
import { useParams } from 'react-router-dom';

const AlbumPage = () => {

    const { albumId } = useParams();
    // console.log(albumId)

    

  return (
    <div>AlbumPage</div>
  )
}

export default AlbumPage