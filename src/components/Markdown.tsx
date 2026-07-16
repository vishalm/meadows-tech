// Shared markdown renderer for chat surfaces (AI Tutor section + floating
// ChatWidget). The tutor replies in markdown (bold, lists, tables, code,
// blockquotes, task lists), so both surfaces route assistant messages through
// this one component to stay DRY and consistently styled.
//
// Safety: react-markdown does NOT render raw HTML by default (no rehype-raw),
// so model output cannot inject markup - the tree is built from the parsed
// AST only. Links are forced to open in a new tab with noopener.
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const components: Components = {
  // Open links safely in a new tab.
  a: ({ node: _node, ...props }) => (
    <a {...props} target="_blank" rel="noopener noreferrer" />
  ),
  // Keep tables scrollable inside narrow chat bubbles instead of overflowing.
  table: ({ node: _node, ...props }) => (
    <div className="md-table-wrap">
      <table {...props} />
    </div>
  ),
};

export function Markdown({ children, className }: { children: string; className?: string }) {
  return (
    <div className={className ? `md ${className}` : 'md'}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
