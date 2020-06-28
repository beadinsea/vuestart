import React, { useState, useEffect } from 'react'

import { bannerReducer } from '@/reducers'

export default function Banner() {
  const [ banners, setBanners ] = useState([])

  useEffect()

  return <BannerUI banners={banners} />
}

function BannerUI() {
  <div></div>
}
