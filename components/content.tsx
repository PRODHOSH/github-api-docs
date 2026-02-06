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
    sections?: Array<{
      heading: string
      content: string
    }>
  }
> = {
  intro: {
    title: 'Introduction',
    subtitle: 'Welcome to the GitHub API Handbook',
    breadcrumb: ['Home', 'Getting Started', 'Introduction'],
    description:
      'The GitHub API allows developers to interact programmatically with nearly every aspect of GitHub. Through this API, you can retrieve public data, analyze repositories, automate workflows, and build custom developer tools.',
    sections: [
      {
        heading: 'What You Will Learn',
        content:
          'This handbook serves as a structured, beginner-to-advanced reference for working with the GitHub REST API. It focuses on practical usage, clear explanations, and real-world developer use cases rather than abstract theory.\n\nYou will learn how to:\n• Authenticate requests securely\n• Fetch user and repository data\n• Extract commits, issues, and pull requests\n• Analyze repository traffic and engagement\n• Build applications that integrate with GitHub\n\nThis guide assumes basic familiarity with HTTP requests and JSON.',
      },
    ],
  },
  auth: {
    title: 'Authentication',
    subtitle: 'Authenticating with the GitHub API',
    breadcrumb: ['Home', 'Getting Started', 'Authentication'],
    description:
      'Most GitHub API requests require authentication using a Personal Access Token (PAT).',
    sections: [
      {
        heading: 'Creating a Token',
        content:
          '1. Open GitHub → Settings\n2. Navigate to Developer Settings → Personal Access Tokens\n3. Click "Generate new token"\n4. Select required scopes (at minimum: repo and read:user)\n5. Copy and securely store your token',
      },
      {
        heading: 'Using the Token',
        content: 'Include it in the request header:\nAuthorization: Bearer YOUR_GITHUB_TOKEN',
      },
      {
        heading: 'Why Authentication is Necessary',
        content:
          '• Higher rate limits\n• Access to private repositories (if permitted)\n• Ability to create, modify, or delete data\n• More detailed analytics and metadata access\n\nUnauthenticated requests are heavily limited and should only be used for testing.',
      },
    ],
    syntax:
      'GET https://api.github.com/user\nHeaders:\nAuthorization: Bearer YOUR_GITHUB_TOKEN',
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
      'GitHub enforces request limits to prevent abuse.',
    sections: [
      {
        heading: 'Limit Tiers',
        content:
          'Unauthenticated requests: Very limited (typically 60 requests per hour)\nAuthenticated requests: Significantly higher limits (typically 5,000 requests per hour)',
      },
      {
        heading: 'Checking Your Rate Limit',
        content: 'GET https://api.github.com/rate_limit',
      },
      {
        heading: 'Best Practices',
        content:
          '• Cache responses where possible\n• Avoid polling too frequently\n• Use pagination correctly\n• Authenticate whenever possible',
      },
    ],
    useCases: [
      'Monitor rate limit headers in responses',
      'Implement exponential backoff for retries',
      'Use GitHub App tokens for higher limits',
    ],
  },
  'get-user': {
    title: 'GET /users/{username}',
    subtitle: 'Get User Profile',
    breadcrumb: ['Home', 'Users API', 'Get User Profile'],
    description:
      'Retrieves public profile information for a GitHub user.',
    syntax:
      'GET https://api.github.com/users/{username}\nHeaders:\nAuthorization: Bearer YOUR_GITHUB_TOKEN',
    parameters: [
      { name: 'username', type: 'string', desc: 'GitHub username (required)' },
    ],
    response: `{
  "login": "octocat",
  "id": 583231,
  "avatar_url": "https://avatars.githubusercontent.com/u/583231?v=4",
  "name": "The Octocat",
  "company": "@github",
  "bio": "There once was...",
  "location": "San Francisco",
  "public_repos": 8,
  "followers": 3938,
  "following": 9,
  "created_at": "2011-01-25T18:44:36Z",
  "updated_at": "2023-10-15T12:34:56Z"
}`,
    sections: [
      {
        heading: 'Response includes',
        content:
          '• login – username\n• name – full name\n• bio – profile bio\n• avatar_url – profile image\n• public_repos – number of public repos\n• followers – follower count\n• following – following count\n• created_at – account creation date',
      },
    ],
    useCases: [
      'Build a GitHub profile viewer',
      'Display user statistics on a website',
      'Analyze developer activity',
    ],
  },
  'list-followers': {
    title: 'GET /users/{username}/followers',
    subtitle: 'List Followers',
    breadcrumb: ['Home', 'Users API', 'List Followers'],
    description:
      'Retrieves a list of users who follow a given user.',
    syntax:
      'GET https://api.github.com/users/{username}/followers\nQuery Parameters: per_page, page',
    parameters: [
      { name: 'username', type: 'string', desc: 'GitHub username (required)' },
      { name: 'per_page', type: 'integer', desc: 'Results per page (1-100)' },
      { name: 'page', type: 'integer', desc: 'Page number for pagination' },
    ],
    useCases: [
      'Analyze community reach',
      'Build social-style follower visualizations',
      'Identify influential developers',
    ],
  },
  'list-following': {
    title: 'GET /users/{username}/following',
    subtitle: 'List Following',
    breadcrumb: ['Home', 'Users API', 'List Following'],
    description:
      'Retrieves users that a given user is following.',
    syntax:
      'GET https://api.github.com/users/{username}/following\nQuery Parameters: per_page, page',
    parameters: [
      { name: 'username', type: 'string', desc: 'GitHub username (required)' },
      { name: 'per_page', type: 'integer', desc: 'Results per page (1-100)' },
    ],
    useCases: [
      'Understand developer interests',
      'Track networking patterns',
      'Identify potential collaborators',
    ],
  },
  'get-repo': {
    title: 'GET /repos/{owner}/{repo}',
    subtitle: 'Get Repo Details',
    breadcrumb: ['Home', 'Repositories API', 'Get Repo Details'],
    description:
      'Fetches metadata about a specific repository.',
    syntax:
      'GET https://api.github.com/repos/{owner}/{repo}\nHeaders:\nAuthorization: Bearer YOUR_GITHUB_TOKEN',
    parameters: [
      { name: 'owner', type: 'string', desc: 'Repository owner username' },
      { name: 'repo', type: 'string', desc: 'Repository name' },
    ],
    response: `{
  "id": 1296269,
  "name": "Hello-World",
  "full_name": "octocat/Hello-World",
  "owner": {"login": "octocat", "id": 1},
  "description": "This your first repo!",
  "private": false,
  "html_url": "https://github.com/octocat/Hello-World",
  "language": "JavaScript",
  "stargazers_count": 80,
  "watchers_count": 80,
  "forks_count": 9,
  "open_issues_count": 0,
  "created_at": "2011-01-26T19:01:12Z",
  "updated_at": "2023-10-15T12:34:56Z"
}`,
    sections: [
      {
        heading: 'Returns',
        content:
          '• Repository name\n• Description\n• Primary language\n• Stars, forks, watchers\n• License\n• Topics\n• Last updated time',
      },
    ],
    useCases: [
      'Display repo info in dashboards',
      'Analyze popularity',
      'Compare multiple repositories',
    ],
  },
  'list-repos': {
    title: 'GET /users/{username}/repos',
    subtitle: 'List Repos',
    breadcrumb: ['Home', 'Repositories API', 'List Repos'],
    description:
      'Retrieves all public repositories of a user.',
    syntax:
      'GET https://api.github.com/users/{username}/repos\nQuery Parameters: sort, order, per_page, page',
    parameters: [
      { name: 'username', type: 'string', desc: 'GitHub username' },
      { name: 'sort', type: 'string', desc: 'created, updated, pushed, full_name' },
      { name: 'order', type: 'string', desc: 'asc or desc' },
      { name: 'per_page', type: 'integer', desc: 'Results per page (1-100)' },
    ],
    useCases: [
      'Portfolio displays',
      'Automated repo analysis',
      'Bulk data collection',
    ],
  },
  'get-readme': {
    title: 'GET /repos/{owner}/{repo}/readme',
    subtitle: 'Get README',
    breadcrumb: ['Home', 'Repositories API', 'Get README'],
    description:
      'Fetches the README file of a repository.',
    syntax:
      'GET https://api.github.com/repos/{owner}/{repo}/readme\nHeaders:\nAccept: application/vnd.github.v3.raw',
    parameters: [
      { name: 'owner', type: 'string', desc: 'Repository owner username' },
      { name: 'repo', type: 'string', desc: 'Repository name' },
    ],
    useCases: [
      'Display README in custom UI',
      'Extract documentation content',
      'Analyze project descriptions',
    ],
  },
  'list-branches': {
    title: 'GET /repos/{owner}/{repo}/branches',
    subtitle: 'List Branches',
    breadcrumb: ['Home', 'Repositories API', 'List Branches'],
    description:
      'Retrieves all branches in a repository.',
    syntax:
      'GET https://api.github.com/repos/{owner}/{repo}/branches\nQuery Parameters: per_page, page',
    parameters: [
      { name: 'owner', type: 'string', desc: 'Repository owner username' },
      { name: 'repo', type: 'string', desc: 'Repository name' },
    ],
    useCases: [
      'Track development workflow',
      'Identify active branches',
      'Monitor version control structure',
    ],
  },
  'list-commits': {
    title: 'GET /repos/{owner}/{repo}/commits',
    subtitle: 'List Commits',
    breadcrumb: ['Home', 'Commits & Contributions', 'List Commits'],
    description:
      'Retrieves commit history for a repository.',
    syntax:
      'GET https://api.github.com/repos/{owner}/{repo}/commits\nQuery Parameters: sha, path, author, since, until, per_page',
    parameters: [
      { name: 'owner', type: 'string', desc: 'Repository owner username' },
      { name: 'repo', type: 'string', desc: 'Repository name' },
      { name: 'sha', type: 'string', desc: 'SHA or branch name' },
      { name: 'author', type: 'string', desc: 'Filter by commit author' },
    ],
    sections: [
      {
        heading: 'Returns',
        content:
          '• Commit message\n• Author\n• Timestamp\n• Files changed',
      },
    ],
    useCases: [
      'Activity tracking',
      'Contribution analysis',
      'Code history visualization',
    ],
  },
  'get-commit': {
    title: 'GET /repos/{owner}/{repo}/commits/{sha}',
    subtitle: 'Get Commit Details',
    breadcrumb: ['Home', 'Commits & Contributions', 'Get Commit Details'],
    description:
      'Fetches detailed information about a specific commit.',
    syntax:
      'GET https://api.github.com/repos/{owner}/{repo}/commits/{sha}\nHeaders:\nAuthorization: Bearer YOUR_GITHUB_TOKEN',
    parameters: [
      { name: 'owner', type: 'string', desc: 'Repository owner username' },
      { name: 'repo', type: 'string', desc: 'Repository name' },
      { name: 'sha', type: 'string', desc: 'Commit SHA hash' },
    ],
    sections: [
      {
        heading: 'Returns',
        content:
          '• Full commit message\n• Parent commits\n• Files modified\n• Lines added/removed',
      },
    ],
  },
  'contributor-stats': {
    title: 'GET /repos/{owner}/{repo}/stats/contributors',
    subtitle: 'Contributor Stats',
    breadcrumb: ['Home', 'Commits & Contributions', 'Contributor Stats'],
    description:
      'Retrieves contribution statistics for a repository.',
    syntax:
      'GET https://api.github.com/repos/{owner}/{repo}/stats/contributors\nHeaders:\nAuthorization: Bearer YOUR_GITHUB_TOKEN',
    parameters: [
      { name: 'owner', type: 'string', desc: 'Repository owner username' },
      { name: 'repo', type: 'string', desc: 'Repository name' },
    ],
    useCases: [
      'Identify top contributors',
      'Analyze team productivity',
      'Visualize coding patterns',
    ],
  },
  'list-issues': {
    title: 'GET /repos/{owner}/{repo}/issues',
    subtitle: 'List Issues',
    breadcrumb: ['Home', 'Issues & Discussions', 'List Issues'],
    description:
      'Retrieves all issues in a repository.',
    syntax:
      'GET https://api.github.com/repos/{owner}/{repo}/issues\nQuery Parameters: state, labels, sort, direction, per_page',
    parameters: [
      { name: 'owner', type: 'string', desc: 'Repository owner username' },
      { name: 'repo', type: 'string', desc: 'Repository name' },
      { name: 'state', type: 'string', desc: 'open, closed, or all' },
      { name: 'labels', type: 'string', desc: 'Comma-separated label names' },
    ],
    sections: [
      {
        heading: 'Returns',
        content:
          '• Issue title\n• Creator\n• Status (open/closed)\n• Comments\n• Creation date',
      },
    ],
    useCases: [
      'Community management',
      'Bug tracking dashboards',
      'Issue analytics',
    ],
  },
  'issue-comments': {
    title: 'GET /repos/{owner}/{repo}/issues/{issue_number}/comments',
    subtitle: 'Get Issue Comments',
    breadcrumb: ['Home', 'Issues & Discussions', 'Get Issue Comments'],
    description:
      'Retrieves comments on a specific issue.',
    syntax:
      'GET https://api.github.com/repos/{owner}/{repo}/issues/{issue_number}/comments\nQuery Parameters: per_page, page',
    parameters: [
      { name: 'owner', type: 'string', desc: 'Repository owner username' },
      { name: 'repo', type: 'string', desc: 'Repository name' },
      { name: 'issue_number', type: 'integer', desc: 'Issue number' },
    ],
    useCases: [
      'Analyze discussions',
      'Build comment visualization tools',
      'Integrate with chatbots',
    ],
  },
  'list-prs': {
    title: 'GET /repos/{owner}/{repo}/pulls',
    subtitle: 'List PRs',
    breadcrumb: ['Home', 'Pull Requests', 'List PRs'],
    description:
      'Retrieves all pull requests for a repository.',
    syntax:
      'GET https://api.github.com/repos/{owner}/{repo}/pulls\nQuery Parameters: state, sort, direction, per_page',
    parameters: [
      { name: 'owner', type: 'string', desc: 'Repository owner username' },
      { name: 'repo', type: 'string', desc: 'Repository name' },
      { name: 'state', type: 'string', desc: 'open, closed, or all' },
      { name: 'sort', type: 'string', desc: 'created, updated, popularity, long-running' },
    ],
    sections: [
      {
        heading: 'Returns',
        content:
          '• PR title\n• Author\n• Status\n• Creation date',
      },
    ],
  },
  'pr-reviews': {
    title: 'GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews',
    subtitle: 'PR Reviews',
    breadcrumb: ['Home', 'Pull Requests', 'PR Reviews'],
    description:
      'Retrieves reviews for a specific pull request.',
    syntax:
      'GET https://api.github.com/repos/{owner}/{repo}/pulls/{pull_number}/reviews',
    parameters: [
      { name: 'owner', type: 'string', desc: 'Repository owner username' },
      { name: 'repo', type: 'string', desc: 'Repository name' },
      { name: 'pull_number', type: 'integer', desc: 'Pull request number' },
    ],
    useCases: [
      'Code review analysis',
      'Team performance tracking',
      'Automated feedback tools',
    ],
  },
  'repo-views': {
    title: 'GET /repos/{owner}/{repo}/traffic/views',
    subtitle: 'Repo Views',
    breadcrumb: ['Home', 'Analytics & Traffic', 'Repo Views'],
    description:
      'Retrieves view statistics for a repository.',
    syntax:
      'GET https://api.github.com/repos/{owner}/{repo}/traffic/views\nPermissions: Push access required',
    sections: [
      {
        heading: 'Returns',
        content:
          '• Total views\n• Unique visitors\n• Daily breakdown',
      },
    ],
    useCases: [
      'Measure project adoption',
      'Track developer interest',
    ],
  },
  'repo-clones': {
    title: 'GET /repos/{owner}/{repo}/traffic/clones',
    subtitle: 'Repo Clones',
    breadcrumb: ['Home', 'Analytics & Traffic', 'Repo Clones'],
    description:
      'Retrieves clone statistics for a repository.',
    syntax:
      'GET https://api.github.com/repos/{owner}/{repo}/traffic/clones\nQuery Parameters: per, per_page',
    parameters: [
      { name: 'owner', type: 'string', desc: 'Repository owner username' },
      { name: 'repo', type: 'string', desc: 'Repository name' },
    ],
    useCases: [
      'Measure project adoption',
      'Track developer interest',
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
    sections,
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

          {/* Sections */}
          {sections && sections.length > 0 && (
            <>
              {sections.map((section, idx) => (
                <section key={idx} className="mb-10">
                  <h2 className="text-lg font-semibold text-slate-100 mb-3">
                    {section.heading}
                  </h2>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {section.content}
                  </p>
                </section>
              ))}
            </>
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
