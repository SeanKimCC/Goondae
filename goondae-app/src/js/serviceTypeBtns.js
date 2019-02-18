import React from 'react';

class TypeBtn extends React.Component{
	
	render() {
		return (
			<button
				type="button"
				month-value={this.props.monthValue}
				military-type={this.props.serviceType} // not sure if necessary
				className={this.props.classNames}
				onClick={() => this.props.onClick()}
			>
			{this.props.serviceType}
			</button>
		);
	}
	
}

class ServiceTypeBtnsGroup extends React.Component {
	
	// constructor(props){
	// 	super(props);
		
	// 	this.state = {
	// 		numTypes : 8,
	// 		serviceTypes : ["육군", "해군", "공군", "해병", "의경", "해경", "소방원", "사회복무요원"],
	// 		numMonths : [21, 23, 24, 21, 21, 23, 23, 24],
	// 	}
	// }
	
	render(){
		const serviceTypes = this.props.serviceTypes;
		const numTypes = this.props.numTypes;
		const numMonthsArray = this.props.numMonths;
		const selectedType = this.props.selectedType;
		
		const typeBtns = serviceTypes.map((serviceType, selectedTypeNum) =>{
			
			const numMonths = numMonthsArray[selectedTypeNum];
			var classNames = "btn btn-secondary goonbokmu-btn ";
			if (selectedTypeNum === 0){
				classNames += "btn-first ";
			} else if(selectedTypeNum === serviceTypes.length - 1){
				classNames += "btn-last ";
			}
			
			if(selectedTypeNum === selectedType){
				classNames += "btn-selected"; // todo: change to a proper class
			}
			
			return (
				<TypeBtn 
					key={selectedTypeNum}
					onClick={() => this.props.onClick(selectedTypeNum)}
					type="button" 
					monthValue={numMonths}
					classNames={classNames}
					serviceType={serviceType}>
				</TypeBtn>
			);
		});
		
		return(
			<div 
				className="btn-group"
				role="group"
				data-toggle="buttons"
				//style="padding-top:5px;padding-bottom:5px"
			>
				{typeBtns}
			</div>
		);
		
	}
	
	
}

export default ServiceTypeBtnsGroup;