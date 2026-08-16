import { Component } from "react";

// Catches render-time crashes anywhere below it and shows a friendly message
// instead of leaving the user staring at a blank white screen with no clue
// what happened (React's default behavior is to unmount silently).
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("My Little Diary crashed:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-blush-gradient px-6 text-center">
          <p className="text-4xl">🩹</p>
          <h1 className="font-display text-2xl font-semibold text-stone-800">Something went sideways</h1>
          <p className="max-w-xs font-body text-sm leading-relaxed text-stone-500">
            My Little Diary hit a snag loading. Your entries are safe — try reloading the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 rounded-full bg-gradient-to-r from-blush-600 to-blush-700 px-6 py-3 font-rounded text-sm font-semibold text-white shadow-soft"
          >
            Reload
          </button>
          <p className="mt-4 max-w-xs truncate font-body text-xs text-stone-300">{String(this.state.error?.message || this.state.error)}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
