import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import { PieChart } from 'react-minimal-pie-chart';
import admission from '../img/admission.jpg';
import sizeImage from '../img/size.jpg';
import cost from '../img/cost.jpg';
import graduation from '../img/graduation.jpg';
import future from '../img/future.jpg';
import college from '../img/college.jpg';

class CollegeInfo extends Component{
    constructor (props){
        super (props);
        this.state = {
            CollegeName: '',
            AdmissionRate: '',
            City: '',
            Ownership: null,
            HomePage: '',
            //e.g. ?New%20York%20University
            //EncodedName: encodeURIComponent(this.props.location.state.searchValue),
            AverageSat: null,
            Enrollment: null,
            InStateTuition: null,
            OutStateTuition: null,
            "4 Year Graduation Rate": null,
            MedianEarning: null,
            NumOfGradStudent: null,
            //academics
            Biology: 0,
            Business: 0,
            Computer: 0,
            Education: 0,
            Engineering: 0,
            History: 0,
            Mathematics: 0,
            PhysicalScience: 0,
            SocialScience: 0,
            //school id (unique)
            id: this.props.location.state.id,
            exist: true,
            //not for college info
            error: null,
            isLoaded: false
        };
    }

    componentDidMount() {
        //let name='';
        const urlFront="https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=jGYsoKv4bJJ0H8EgaPYnpshgESDIaK0V4e9UfXs1";
        //Got School id

                        fetch(urlFront+"&id="+this.state.id+"&fields=school.name,school.city,school.school_url,"+
                        "school.ownership,latest.admissions.admission_rate.overall,latest.admissions.sat_scores.average.overall,"+
                        "latest.student.size,latest.cost.tuition.out_of_state,latest.completion.completion_rate_4yr_150nt,"+
                        "2007.earnings.10_yrs_after_entry.median,latest.student.grad_students,latest.cost.tuition.in_state,"+
                        "latest.academics.program_percentage.computer,latest.academics.program_percentage.education,"+
                        "latest.academics.program_percentage.engineering,latest.academics.program_percentage.biological,"+
                        "latest.academics.program_percentage.mathematics,latest.academics.program_percentage.social_science,"+
                        "latest.academics.program_percentage.business_marketing,latest.academics.program_percentage.history,"+
                        "latest.academics.program_percentage.physical_science")
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            //Judge Ownership
                            let ownership;
                            if (result.results[0]["school.ownership"]===1)
                                ownership="Public";
                            else if (result.results[0]["school.ownership"]===2)
                                ownership="Private Nonprofit";
                            else
                                ownership="Private For-profit";
                            this.setState ({
                                CollegeName: result.results[0]["school.name"],
                                isLoaded: true,
                                AdmissionRate: result.results[0]["latest.admissions.admission_rate.overall"],
                                City: result.results[0]["school.city"],
                                Ownership: ownership,
                                HomePage: result.results[0]["school.school_url"],
                                OutStateTuition: result.results[0]["latest.cost.tuition.out_of_state"],
                                InStateTuition: result.results[0]["latest.cost.tuition.in_state"],
                                "4 Year Graduation Rate": result.results[0]["latest.completion.completion_rate_4yr_150nt"],
                                MedianEarning: result.results[0]["2007.earnings.10_yrs_after_entry.median"],
                                NumOfGradStudent: result.results[0]["latest.student.grad_students"],
                                Enrollment: result.results[0]["latest.student.size"], 
                                AverageSat: result.results[0]["latest.admissions.sat_scores.average.overall"],
                                Biology: result.results[0]["latest.academics.program_percentage.biological"],
                                Business: result.results[0]["latest.academics.program_percentage.business_marketing"],
                                Computer: result.results[0]["latest.academics.program_percentage.computer"],
                                Education: result.results[0]["latest.academics.program_percentage.education"],
                                Engineering: result.results[0]["latest.academics.program_percentage.engineering"],
                                History: result.results[0]["latest.academics.program_percentage.history"],
                                Mathematics: result.results[0]["latest.academics.program_percentage.mathematics"],
                                PhysicalScience: result.results[0]["latest.academics.program_percentage.physical_science"],
                                SocialScience: result.results[0]["latest.academics.program_percentage.social_science"]
                            });
                        });
    }


    render () {
        //console.log(this.state.EncodedName);
        if (!this.state.exist) 
            return (<Redirect exact to='/' />);
        else if (!this.state.isLoaded){
            return (
                <div className="loader "></div>
            );
        }
        else if (this.state.error){
            return <div>Error: {this.state.error.message}</div>;
        }
        else{
            return (
                <div>
                <div className="container-md my-5 pt-5 pt-md-0">
                    <h2 className="py-5">{this.state.CollegeName}</h2>

                    <div className="row">
                        <div className='col-lg-6'>
                            <div className="card bg-light mb-3" style={{maxWidth: "23rem"}}>
                            <img src={college} className="card-img-top" alt="college" />
                            <div className="card-header">Basic Info</div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">City/Region: {this.state.City}</li>
                                    <li className="list-group-item">Ownership: {this.state.Ownership}</li>
                                    <li className="list-group-item">School HomePage: <a href={"https://"+this.state.HomePage}>{this.state.HomePage}</a></li>
                                </ul>
                            </div>
                            </div>
                        </div>

                        <div className='col-lg-6'>
                            <div className="card border-info mb-3" style={{maxWidth: "23rem"}}>
                                <img src={admission} className="card-img-top" alt="Admission" />
                                <div className="card-header">Admission</div>
                                <div className="card-body">
                                    <label>Admission Rate:</label>
                                    <PieChart 
                                        data={[
                                            {title: 'admitted students', value: (this.state.AdmissionRate*100).toFixed(2), color: '#ff6361'},
                                        ]} 
                                        totalValue={100}
                                        animate
                                        lineWidth={20} 
                                        label={({ dataEntry }) => (dataEntry.value) + '%'}
                                        labelStyle={{
                                            opacity: 0.75,
                                            pointerEvents: 'none',
                                            fontSize: "1em"
                                        }}
                                        labelPosition={0} 
                                        style={{ height: '150px'  }} 
                                        startAngle={180}
                                        animationDuration={2000}
                                    />

                                    <label>Average SAT Scores:</label>
                                    <PieChart
                                        data={[
                                            {title: 'Average Sat Score', value: this.state.AverageSat, color: '#29B6F6'},
                                        ]} 
                                        totalValue={1600}
                                        animate
                                        lineWidth={20} 
                                        label={({ dataEntry }) => dataEntry.value}
                                        labelStyle={{
                                            opacity: 0.75,
                                            pointerEvents: 'none',
                                            fontSize: "1em"
                                        }}
                                        labelPosition={0} 
                                        style={{ height: '150px'  }} 
                                        startAngle={0}
                                        animationDuration={2000}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg">
                            <div className="card bg-info mb-3 text-white" style={{maxWidth: "23rem"}}>
                                <img src={sizeImage} className="card-img-top" alt="student size" />
                                <div className="card-header">Size</div>
                                <div className="card-body">
                                    <ul>
                                        <li>Undergraduate Student Size: {this.state.Enrollment}</li>
                                        <li>Grad Student Size: {this.state.NumOfGradStudent}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg">
                            <div className="card border-warning mb-3" style={{maxWidth: "23rem"}}>
                            <img src={cost} className="card-img-top" alt="tuition" />
                            <div className="card-header">Cost</div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Tuition for Out-State Students: ${this.state.OutStateTuition}</li>
                                    <li className="list-group-item">Tuition for In-State Students: ${this.state.InStateTuition}</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-lg">
                            <div className="card text-white bg-dark mb-3" style={{maxWidth: "23rem"}}>
                            <img src={graduation} className="card-img-top" alt="graduation" />
                            <div className="card-header">Academics</div>
                            <div className="card-body">
                                <h5 className="card-title">Percentages of Degree Awarded</h5>
                                <ul>
                                    <li>Biological And Biomedical Science: {(this.state.Biology*100).toFixed(2)}%</li>
                                    <li>Business, Management, Marketing: {(this.state.Business*100).toFixed(2)}%</li>
                                    <li>Computer And Information Sciences: {(this.state.Computer*100).toFixed(2)}%</li>
                                    <li>Education: {(this.state.Education*100).toFixed(2)}%</li>
                                    <li>Engineering: {(this.state.Engineering*100).toFixed(2)}%</li>
                                    <li>History: {(this.state.History*100).toFixed(2)}%</li>
                                    <li>Mathematics and Statistics: {(this.state.Mathematics*100).toFixed(2)}%</li>
                                    <li>Physical Sciences: {(this.state.PhysicalScience*100).toFixed(2)}%</li>
                                    <li>Social Science: {(this.state.SocialScience*100).toFixed(2)}%</li>
                                </ul>
                            </div>
                            </div>
                        </div>

                        <div className="col-lg">
                            <div className="card border-success mb-3" style={{maxWidth: "23rem"}}>
                            <img src={future} className="card-img-top" alt="future" />
                            <div className="card-header">Future</div>
                            <div className="card-body">
                            <label>Four Years Graudation Rate: </label>
                            <PieChart
                                data={[
                                    {title: 'Four Year Graduation Rate', value: (this.state["4 Year Graduation Rate"]*100).toFixed(2), color: "lightgreen" },
                                ]} 
                                totalValue={100}
                                animate
                                lineWidth={20} 
                                label={({ dataEntry }) => (dataEntry.value)+"%"}
                                labelStyle={{
                                    opacity: 0.75,
                                    pointerEvents: 'none',
                                    fontSize: "1em",
                                }}
                                labelPosition={0} 
                                style={{ height: '150px', paddingBottom: '1em', paddingTop: '1em'  }} 
                                startAngle={0}
                                animationDuration={2000}
                            />
                                <p>Median Salary 10 years after graduating: ${this.state.MedianEarning}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="jumbotron text-center container-fluid" style={{marginBottom:0}}>
                    <p>Supported by <a href="https://collegescorecard.ed.gov/data/documentation/">College Scorecard API</a> | All data are from 2018</p>
                </div>
                </div>
            )
        }
    }
}

export default CollegeInfo;