
import { useEffect, useState } from 'react';
import './Toast.css';

interface ToastProps {
  message: string;
  duration?: number;
}

export const Toast = ({ message, duration = 3000 }: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="toast-container">
      <div className="toast-message">
        <div className="toast-bubble">
          {message}
        </div>
      </div>
    </div>
  );
};