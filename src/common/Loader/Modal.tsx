import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[400px]">
        <div className="p-4 border-b">
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        <div className="p-4">
          <p>{content}</p>
        </div>
        <div className="p-4 flex justify-end gap-2">
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              {confirmLabel}
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;