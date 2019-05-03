import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root');

class LoginModal extends React.Component{

	render() {
		var subtitle = this.props.subtitle;
		return (
		  <div>
			<Modal
			  isOpen={this.props.modalIsOpen}
			  onRequestClose={this.props.closeModal}
			  style={customStyles}
			  contentLabel="Example Modal"
			>

			  <h2>Hello</h2>
			  <button onClick={this.props.closeModal}>close</button>
			  <div>I am a modal</div>
			  <form>
				<input />
				<button>tab navigation</button>
				<button>stays</button>
				<button>inside</button>
				<button>the modal</button>
			  </form>
			</Modal>
		  </div>
		);
	}
}
export default LoginModal;