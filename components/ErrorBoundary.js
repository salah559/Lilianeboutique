import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brandDark">
          <div className="text-center px-6">
            <h1 className="text-4xl font-bold text-brandGold mb-4">عذراً، حدث خطأ</h1>
            <p className="text-white/70 mb-6">نعمل على حل المشكلة. يرجى تحديث الصفحة.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-pink-400 text-white rounded-full font-bold hover:scale-105 transition-transform"
            >
              تحديث الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
