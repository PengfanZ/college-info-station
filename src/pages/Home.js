import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
//import CollegeInfo from './CollegeInfo';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
          title: 'College',
          searchValue: '',
          redirect: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (event) {
        this.setState({searchValue: event.target.value});
    }

    handleSubmit (event) {
        event.preventDefault();
        if (this.state.searchValue)
            this.setState({redirect: '/searchIndex'})
        else
            alert("Please Input A College Name");
    }

    render (){
        if (this.state.redirect){
            console.log(this.state.searchValue);
            return (
                <div>
                    <Redirect push to={{
                        pathname: this.state.redirect,
                        state: {searchValue: this.state.searchValue}
                    }}/>
                </div>
            )
        }

        return (
            <div className="container">
                <div className="h-100 d-flex align-items-center flex-column justify-content-center fixed-top" id="header">
                    <h3 className="display-4">Start Your Journey Here</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="search" className="form-control form-control-xl" value={this.state.searchValue} 
                            onChange={this.handleChange} placeholder='Type a US college name'></input>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn btn-success btn-block btn-lg" value="Go"></input>
                        </div>
                    </form>
                    <div className="jumbotron text-center fixed-bottom" style={{marginBottom:0}}>
                        <p>Supported by <a href="https://collegescorecard.ed.gov/data/documentation/">College Scorecard API</a> | All data are from 2018</p>
                    </div>
                </div>


            </div>
        );
    }
}

export default Home;