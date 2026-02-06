'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { ChevronDown } from 'lucide-react'

interface SidebarSection {
  title: string
  items: Array<{
    id: string
    label: string
  }>
}

const sections: SidebarSection[] = [
  {
    title: 'Getting Started',
    items: [
      { id: 'intro', label: 'Introduction' },
      { id: 'auth', label: 'Authentication' },
      { id: 'rate-limits', label: 'Rate Limits' },
    ],
  },
  {
    title: 'Users API',
    items: [
      { id: 'get-user', label: 'Get User Profile' },
      { id: 'list-followers', label: 'List Followers' },
      { id: 'list-following', label: 'List Following' },
    ],
  },
  {
    title: 'Repositories API',
    items: [
      { id: 'get-repo', label: 'Get Repo Details' },
      { id: 'list-repos', label: 'List Repos' },
      { id: 'get-readme', label: 'Get README' },
      { id: 'list-branches', label: 'List Branches' },
    ],
  },
  {
    title: 'Commits & Contributions',
    items: [
      { id: 'list-commits', label: 'List Commits' },
      { id: 'get-commit', label: 'Get Commit Details' },
      { id: 'contributor-stats', label: 'Contributor Stats' },
    ],
  },
  {
    title: 'Issues & Discussions',
    items: [
      { id: 'list-issues', label: 'List Issues' },
      { id: 'issue-comments', label: 'Get Issue Comments' },
    ],
  },
  {
    title: 'Pull Requests',
    items: [
      { id: 'list-prs', label: 'List PRs' },
      { id: 'pr-reviews', label: 'PR Reviews' },
    ],
  },
  {
    title: 'Analytics & Traffic',
    items: [
      { id: 'repo-views', label: 'Repo Views' },
      { id: 'repo-clones', label: 'Repo Clones' },
      { id: 'traffic-sources', label: 'Traffic Sources' },
    ],
  },
]

interface SidebarProps {
  selectedId?: string
  onSelectItem: (id: string) => void
}

export function Sidebar({ selectedId = 'intro', onSelectItem }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['Getting Started', 'Users API', 'Repositories API'])
  )
  const [searchTerm, setSearchTerm] = useState('')
  const [frequentlyUsed, setFrequentlyUsed] = useState(false)

  const toggleSection = (sectionTitle: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionTitle)) {
      newExpanded.delete(sectionTitle)
    } else {
      newExpanded.add(sectionTitle)
    }
    setExpandedSections(newExpanded)
  }

  const filteredSections = sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(
      (section) =>
        section.items.length > 0 || section.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-semibold text-slate-50 flex items-center gap-2 mb-2">
          <span className="text-2xl">📘</span> GitHub API Handbook
        </h1>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-slate-800">
        <Input
          type="text"
          placeholder="Search docs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-800 border-slate-700 text-slate-50 placeholder:text-slate-500"
        />
      </div>

      {/* Toggle */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-3">
        <Switch
          checked={frequentlyUsed}
          onCheckedChange={setFrequentlyUsed}
          className="data-[state=checked]:bg-blue-600"
        />
        <label className="text-sm text-slate-300 cursor-pointer">Frequently used in API</label>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto">
        <nav className="py-4">
          {filteredSections.map((section) => (
            <div key={section.title} className="mb-2">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium text-slate-300 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              >
                <span>{section.title}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    expandedSections.has(section.title) ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedSections.has(section.title) && (
                <div className="pl-4">
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onSelectItem(item.id)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        selectedId === item.id
                          ? 'text-blue-400 bg-slate-800'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <div className="text-xs text-slate-400 text-center leading-relaxed">
          <p className="text-slate-500 mb-2">Built for developers</p>
          <p className="text-slate-600 text-[11px]">
            Not affiliated with GitHub. Created by{' '}
            <a
              href="https://prodhosh.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Prodhosh
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
