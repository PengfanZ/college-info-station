import React, {Component} from 'react';
import {Redirect, Link} from "react-router-dom";

class searchIndex extends Component{
    constructor (props){
        super(props);
        this.state = {
            searchInput: this.props.location.state.searchValue,
            encodedInput: encodeURIComponent(this.props.location.state.searchValue),
            exist: true,
            schools: []
        }
    }

    componentDidMount() {
        const urlFront="https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=jGYsoKv4bJJ0H8EgaPYnpshgESDIaK0V4e9UfXs1";
        //Got School id
        fetch(urlFront+"&school.name="+this.state.encodedInput+"&fields=id,school.name")
            .then(res => res.json())
            .then(result => {
                if (result.metadata.total === 0){
                    alert("The school does not exist in U.S.");
                    this.setState({exist: false});
                }
                else{
                    this.setState({schools: result.results}, () => console.log("Schools fetched...", this.state.schools));
                }
            }, (error) => {
                this.setState({error: error, isLoaded: true});
            })    
    }

    render(){
        console.log(this.state.searchInput);
        if (!this.state.exist) 
            return (<Redirect exact to='/' />);
        else{
            return (
            <div>
                <div className="container-md my-5 pt-0">
                    <h2 className="py-5">"Do you mean?"</h2>
                </div>
                <div className="row px-5">
                    <div className='col-lg-6 mx-5'>
                        <ul className="list-group">
                            {this.state.schools.map(result =>
                                <li className="list-group-item" key={result.id}> <Link to={{pathname: "/CollegeInfo", state: {id: result.id}}}>{result["school.name"]}</Link> </li> 
                            )}
                        </ul>
                    </div>
                </div>
            </div>

        )}
    }
}

export default searchIndex;