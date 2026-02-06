import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ChevronRight } from 'lucide-react'

interface ContentProps {
  pageId: string
}

const contentMap: Record<
  string,
  {
    title: string
    subtitle: string
    breadcrumb: string[]
    description: string
    syntax?: string
    parameters?: Array<{
      name: string
      type: string
      desc: string
    }>
    response?: string
    useCases?: string[]
  }
> = {
  intro: {
    title: 'Introduction',
    subtitle: 'Welcome to the GitHub API',
    breadcrumb: ['Home', 'Getting Started', 'Introduction'],
    description:
      'The GitHub API is a REST API that provides access to GitHub data and functionality. You can use the API to automate tasks, extend GitHub, and build applications that integrate with GitHub.',
    syntax: 'Base URL: https://api.github.com\nAPI Version: 2022-11-28\nFormat: JSON',
    useCases: [
      'Automate repository management and workflows',
      'Build custom applications and integrations',
      'Analyze repository metrics and contributor data',
      'Manage issues, pull requests, and discussions',
    ],
  },
  auth: {
    title: 'Authentication',
    subtitle: 'Authenticating with the GitHub API',
    breadcrumb: ['Home', 'Getting Started', 'Authentication'],
    description:
      'GitHub supports two main authentication methods: OAuth for user authorization and Personal Access Tokens for API access. Choose the method that best fits your use case.',
    syntax:
      'Authorization: Bearer YOUR_GITHUB_TOKEN\n\nHeaders:\nAccept: application/vnd.github+json\nX-GitHub-Api-Version: 2022-11-28',
    useCases: [
      'OAuth for third-party applications',
      'Personal Access Tokens for CLI tools',
      'GitHub App authentication for advanced workflows',
    ],
  },
  'rate-limits': {
    title: 'Rate Limits',
    subtitle: 'Understanding GitHub API rate limits',
    breadcrumb: ['Home', 'Getting Started', 'Rate Limits'],
    description:
      'The GitHub API has rate limits to ensure fair access for all users. Rate limits vary depending on authentication type and endpoint.',
    syntax:
      'Unauthenticated: 60 requests per hour\nAuthenticated: 5,000 requests per hour\nGraphQL: 5,000 points per hour',
    useCases: [
      'Monitor rate limit headers in responses',
      'Implement exponential backoff for retries',
      'Use GitHub App tokens for higher limits',
    ],
  },
  'get-user': {
    title: 'GET /users/{username}',
    subtitle: 'Retrieve public profile information for a GitHub user',
    breadcrumb: ['Home', 'Users API', 'Get User Profile'],
    description:
      'This endpoint returns detailed information about a GitHub user, including profile metadata, followers, and public repositories.',
    syntax:
      'GET https://api.github.com/users/{username}\nHeaders:\nAuthorization: Bearer YOUR_GITHUB_TOKEN',
    parameters: [
      { name: 'username', type: 'string', desc: 'GitHub username (required)' },
    ],
    response: `{
  "login": "octocat",
  "id": 583231,
  "node_id": "MDQ6VXNlcjU4MzIzMQ==",
  "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/octocat",
  "name": "The Octocat",
  "company": "@github",
  "blog": "https://github.blog",
  "location": "San Francisco",
  "bio": "There once was...",
  "public_repos": 8,
  "followers": 3938,
  "following": 9
}`,
    useCases: [
      'Build a profile dashboard',
      'Analyze developer influence and activity',
      'Create user directories and discovery tools',
    ],
  },
  'list-repos': {
    title: 'GET /users/{username}/repos',
    subtitle: 'List repositories owned by a user',
    breadcrumb: ['Home', 'Repositories API', 'List Repos'],
    description:
      'This endpoint returns a list of repositories owned by a GitHub user. You can sort by various criteria and filter by type.',
    syntax:
      'GET https://api.github.com/users/{username}/repos\nQuery Parameters: sort, order, per_page, page',
    parameters: [
      { name: 'username', type: 'string', desc: 'GitHub username' },
      { name: 'sort', type: 'string', desc: 'created, updated, pushed, full_name' },
      { name: 'order', type: 'string', desc: 'asc or desc' },
      { name: 'per_page', type: 'integer', desc: 'Results per page (1-100)' },
    ],
    useCases: [
      'Create portfolio showcases',
      'Analyze code contribution history',
      'Build repository search and discovery tools',
    ],
  },
  'list-commits': {
    title: 'GET /repos/{owner}/{repo}/commits',
    subtitle: 'List commits on a repository',
    breadcrumb: ['Home', 'Commits & Contributions', 'List Commits'],
    description:
      'This endpoint lists the commit history for a repository. You can filter by author, date range, and other criteria.',
    syntax:
      'GET https://api.github.com/repos/{owner}/{repo}/commits\nQuery Parameters: sha, path, author, since, until, per_page',
    parameters: [
      { name: 'owner', type: 'string', desc: 'Repository owner username' },
      { name: 'repo', type: 'string', desc: 'Repository name' },
      { name: 'sha', type: 'string', desc: 'SHA or branch name' },
      { name: 'author', type: 'string', desc: 'Filter by commit author' },
    ],
    useCases: [
      'Analyze code contribution patterns',
      'Generate project history reports',
      'Track feature implementation timelines',
    ],
  },
  'list-issues': {
    title: 'GET /repos/{owner}/{repo}/issues',
    subtitle: 'List issues in a repository',
    breadcrumb: ['Home', 'Issues & Discussions', 'List Issues'],
    description:
      'This endpoint returns a list of issues for a repository. You can filter by state, labels, assignee, and other criteria.',
    syntax:
      'GET https://api.github.com/repos/{owner}/{repo}/issues\nQuery Parameters: state, labels, sort, direction, per_page',
    parameters: [
      { name: 'owner', type: 'string', desc: 'Repository owner username' },
      { name: 'repo', type: 'string', desc: 'Repository name' },
      { name: 'state', type: 'string', desc: 'open, closed, or all' },
      { name: 'labels', type: 'string', desc: 'Comma-separated label names' },
    ],
    useCases: [
      'Track project issue metrics',
      'Build issue management dashboards',
      'Monitor project health and progress',
    ],
  },
  'list-prs': {
    title: 'GET /repos/{owner}/{repo}/pulls',
    subtitle: 'List pull requests',
    breadcrumb: ['Home', 'Pull Requests', 'List PRs'],
    description:
      'This endpoint lists pull requests for a repository. You can filter by state, sort by various criteria, and paginate through results.',
    syntax:
      'GET https://api.github.com/repos/{owner}/{repo}/pulls\nQuery Parameters: state, sort, direction, per_page',
    parameters: [
      { name: 'owner', type: 'string', desc: 'Repository owner username' },
      { name: 'repo', type: 'string', desc: 'Repository name' },
      { name: 'state', type: 'string', desc: 'open, closed, or all' },
      { name: 'sort', type: 'string', desc: 'created, updated, popularity, long-running' },
    ],
    useCases: [
      'Monitor pull request activity',
      'Analyze review turnaround times',
      'Build contribution analytics tools',
    ],
  },
  'repo-views': {
    title: 'GET /repos/{owner}/{repo}/traffic/views',
    subtitle: 'Repository traffic views',
    breadcrumb: ['Home', 'Analytics & Traffic', 'Repo Views'],
    description:
      'This endpoint provides traffic information for a repository, including the number of views over time.',
    syntax:
      'GET https://api.github.com/repos/{owner}/{repo}/traffic/views\nPermissions: Push access required',
    useCases: [
      'Track repository popularity and reach',
      'Analyze project growth metrics',
      'Monitor engagement trends',
    ],
  },
}

export function Content({ pageId }: ContentProps) {
  const content = contentMap[pageId] || contentMap['intro']
  const {
    title,
    subtitle,
    breadcrumb,
    description,
    syntax,
    parameters,
    response,
    useCases,
  } = content

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950">
      {/* Header Banner */}
      <div className="bg-blue-950 border-b border-blue-900 px-8 py-3">
        <p className="text-sm text-blue-200">
          <span className="font-semibold">GitHub API Handbook:</span> A reference guide for developers. Not affiliated with GitHub.{' '}
          <a
            href="https://prodhosh.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-100"
          >
            Created by Prodhosh
          </a>
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="px-8 py-4 border-b border-slate-800 flex items-center gap-2 text-sm text-slate-400">
          {breadcrumb.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {idx > 0 && <ChevronRight size={16} />}
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="px-8 py-8">
          {/* Title */}
          <h1 className="text-4xl font-bold text-slate-50 mb-2 font-mono">{title}</h1>
          <p className="text-lg text-slate-400 mb-8">{subtitle}</p>

          {/* Description */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-slate-100 mb-3">Description</h2>
            <p className="text-slate-300 leading-relaxed">{description}</p>
          </section>

          {/* Syntax / Request */}
          {syntax && (
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-slate-100 mb-3">Request</h2>
              <pre className="bg-slate-900 border border-slate-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-slate-300 font-mono text-sm whitespace-pre-wrap">
                  {syntax}
                </code>
              </pre>
            </section>
          )}

          {/* Parameters */}
          {parameters && parameters.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-slate-100 mb-3">Parameters</h2>
              <div className="space-y-3">
                {parameters.map((param, idx) => (
                  <div key={idx} className="border-l-2 border-blue-500 pl-4">
                    <div className="flex items-baseline gap-2 mb-1">
                      <code className="text-blue-400 font-mono">{param.name}</code>
                      <span className="text-slate-500 text-sm">({param.type})</span>
                    </div>
                    <p className="text-slate-400 text-sm">{param.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Response Example */}
          {response && (
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-slate-100 mb-3">Response Example</h2>
              <pre className="bg-slate-900 border border-slate-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-slate-300 font-mono text-sm">{response}</code>
              </pre>
            </section>
          )}

          {/* Use Cases */}
          {useCases && useCases.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-semibold text-slate-100 mb-3">Use Cases</h2>
              <ul className="space-y-2">
                {useCases.map((useCase, idx) => (
                  <li key={idx} className="text-slate-300 flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    {useCase}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
