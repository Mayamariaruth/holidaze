interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  overlay?: boolean;
  color?: string; // optional spinner color
}

export default function Loader({ size = 'md', overlay = false, color = 'primary' }: LoaderProps) {
  const spinnerSizeClass =
    size === 'sm' ? 'spinner-border-sm' : size === 'lg' ? 'spinner-border-lg' : '';

  const spinner = (
    <div className="d-flex align-items-center gap-2">
      <div className={`spinner-border ${spinnerSizeClass}`} role="status" style={{ color }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (overlay) {
    return (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75"
        style={{ zIndex: 1250 }}
      >
        {spinner}
      </div>
    );
  }

  return spinner;
}
