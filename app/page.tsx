'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Content } from '@/components/content'

export default function Page() {
  const [selectedPage, setSelectedPage] = useState('intro')

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar selectedId={selectedPage} onSelectItem={setSelectedPage} />
      <Content pageId={selectedPage} />
    </div>
  )
}
