import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import './Modal.css';

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired, 
  onClose: PropTypes.func.isRequired, 
  children: PropTypes.node.isRequired 
};

export default Modal;
