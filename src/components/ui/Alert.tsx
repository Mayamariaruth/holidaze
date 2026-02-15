import { useEffect } from 'react';

/**
 * Alert component for displaying messages to the user.
 *
 * Supports success, danger, info, and warning types.
 * Can auto-dismiss after a specified timeout.
 *
 * @param {Object} props Component props
 * @param {'success' | 'danger' | 'info' | 'warning'} props.type Alert type
 * @param {string} props.message Text message to display
 * @param {() => void} [props.onClose] Optional callback to close the alert
 * @param {number} [props.autoDismiss] Optional timeout in ms to automatically close the alert
 * @returns {JSX.Element} Alert element
 *
 * @example
 * <Alert type="success" message="Operation completed!" autoDismiss={3000} />
 */
type AlertProps = {
  type: 'success' | 'danger' | 'info' | 'warning';
  message: string;
  onClose?: () => void;
  autoDismiss?: number;
};

export default function Alert({ type, message, onClose, autoDismiss }: AlertProps) {
  // Auto-dismiss logic using useEffect
  useEffect(() => {
    if (!autoDismiss) return;

    const timer = setTimeout(() => onClose?.(), autoDismiss);
    return () => clearTimeout(timer);
  }, [autoDismiss, onClose]);

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}

      {/* Optional close button */}
      {onClose && (
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      )}
    </div>
  );
}
