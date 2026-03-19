'use client';

import React from 'react';
import { Bot, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service like Sentry
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-card">
            <div className="error-icon-wrapper">
              <Bot size={48} className="error-icon" />
            </div>
            <h1>Something went wrong</h1>
            <p>Our assistant encountered an unexpected error while rendering this part of the page.</p>
            
            <div className="error-actions">
              <button 
                onClick={() => window.location.reload()} 
                className="btn btn-primary"
              >
                <RefreshCw size={18} />
                Try Refreshing
              </button>
              <Link href="/" className="btn btn-ghost">
                <Home size={18} />
                Back to Home
              </Link>
            </div>
          </div>
          <style jsx>{`
            .error-boundary-container {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 400px;
              padding: 40px;
              text-align: center;
            }
            .error-card {
              background: var(--card);
              border: 1px solid var(--border);
              border-radius: var(--r);
              padding: 48px;
              max-width: 500px;
              width: 100%;
              box-shadow: var(--shadow);
            }
            .error-icon-wrapper {
              width: 80px;
              height: 80px;
              background: rgba(255, 90, 90, 0.1);
              border-radius: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 24px;
              color: var(--red);
            }
            h1 {
              font-family: var(--font-display);
              font-size: 24px;
              font-weight: 800;
              margin-bottom: 12px;
              color: var(--text);
            }
            p {
              color: var(--text2);
              font-size: 15px;
              line-height: 1.6;
              margin-bottom: 32px;
            }
            .error-actions {
              display: flex;
              gap: 12px;
              justify-content: center;
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
