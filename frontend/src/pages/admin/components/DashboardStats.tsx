import { useMusicStore } from '@/stores/useMusicStore';
import React from 'react'

const DashboardStats = () => {

  const { stats } = useMusicStore();
  return (
    <div>DashboardStats</div>
  )
}

export default DashboardStats