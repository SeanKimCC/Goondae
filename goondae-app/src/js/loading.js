import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';

class LoadingScreen extends React.Component{
	render(){
		const loadingScreenClass = "loading-screen " + (this.props.isLoading ? "" : "hidden");
		const spinnerClass = this.props.isLoading ? "lds-dual-ring" : "";
		return(
			<div className={loadingScreenClass}>
				<div className={spinnerClass}></div>
			</div>	
		);
	}
}
export default LoadingScreen;
