import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
          <div className="glass max-w-md rounded-2xl p-10">
            <p className="font-display text-xl font-semibold text-ink">
              This section hit a rendering error.
            </p>
            <p className="mt-3 text-sm text-muted">
              Refresh the page to try again — the rest of the site is unaffected.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-full border border-blue/50 bg-blue/10 px-6 py-2 text-sm font-medium text-blue transition hover:bg-blue/20"
            >
              Reload page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
