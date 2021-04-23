import React, {Component} from 'react';

class Trending extends Component {
    constructor(){
        super();
        this.state = {
            schools: []
        };
    }
    
    componentDidMount(){
        fetch('/api/trending')
            .then(res => res.json())
            .then(schools => this.setState({schools: schools}, () => console.log("Schools fetched...", schools)))
    }

    render() {
        return (
            <div className="container-md my-5 pt-5 pt-md-0">
                <h2 className="py-5">Trending</h2>
                <ul>
                    {this.state.schools.map(school =>
                            <li key={school.id}>{school.name} {school.view}</li> 
                    )}
                </ul>
            </div>
        );
    }
}

export default Trending;