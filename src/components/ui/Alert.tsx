import { useEffect } from 'react';

type AlertProps = {
  type: 'success' | 'danger' | 'info' | 'warning';
  message: string;
  onClose?: () => void;
  autoDismiss?: number;
};

export default function Alert({ type, message, onClose, autoDismiss }: AlertProps) {
  useEffect(() => {
    if (!autoDismiss) return;

    const timer = setTimeout(() => onClose?.(), autoDismiss);
    return () => clearTimeout(timer);
  }, [autoDismiss, onClose]);

  return (
    <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
      {message}
      {onClose && (
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      )}
    </div>
  );
}
