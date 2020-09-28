/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import dynamic from 'next/dynamic'
import { VideoSkeleton } from '../placeholders'

export const WithCtaVideo = dynamic(
  () => import('../cta/cta-video').then((mod) => mod.CtaVideo) as any,
  {
    ssr: false,
    loading: () => <VideoSkeleton />,
  }
)
