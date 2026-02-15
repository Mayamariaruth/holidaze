/**
 * Loader component for showing a spinner.
 *
 * Can be rendered as an inline spinner or as a full-page overlay.
 * Supports different sizes and optional spinner color.
 *
 * @param {Object} props Component props
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] Size of the spinner
 * @param {boolean} [props.overlay=false] Whether to show a full-page overlay
 * @param {string} [props.color='primary'] Optional CSS color for the spinner
 * @returns {JSX.Element} Spinner element
 *
 * @example
 * <Loader size="lg" overlay color="primary" />
 */
interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  overlay?: boolean;
  color?: string;
}

export default function Loader({ size = 'md', overlay = false, color = 'primary' }: LoaderProps) {
  // Determine spinner size class
  const spinnerSizeClass =
    size === 'sm' ? 'spinner-border-sm' : size === 'lg' ? 'spinner-border-lg' : '';

  // Spinner element
  const spinner = (
    <div className="d-flex align-items-center gap-2">
      <div className={`spinner-border ${spinnerSizeClass}`} role="status" style={{ color }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  // Wrap in overlay if requested
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
