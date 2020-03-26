import React from "react"
import Axios from "axios"
import './style.css'

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.getCountryData = this.getCountryData.bind(this)
    }
    state = {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        countries: []
    }
    componentDidMount(){
        this.getData()
    }
    async getData(){
     const res = await Axios.get("https://covid19.mathdro.id/api")
     const resCountries = await Axios.get("https://covid19.mathdro.id/api/countries")
    // console.log(resCountries.data.countries)
     const countries = Object.keys(resCountries.data.countries)
     
     this.setState({
         confirmed: res.data.confirmed.value,
         recovered: res.data.recovered.value,
         deaths: res.data.deaths.value,
         countries
     })   
    }
    async getCountryData(e){
        const resapi = await Axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`)
        this.setState({
            confirmed: resapi.data.confirmed.value,
            recovered: resapi.data.recovered.value,
            deaths: resapi.data.deaths.value,
        })
    }

    // const renderCountryOption = () => {
    //  return this.state.countries.map((country,index)=>{
    //     return (<option key={index}>{country}</option>)
    //  })
    // }

    renderCountryOption(){
        return this.state.countries.map((country,index,value)=>{
            console.log(country)
           return <option key={index}>{country}</option>
           
            })
    }

    render(){
        return(
        <div className="container">
            <h1>Corona Update</h1>
            <select onChange={this.getCountryData}>{this.renderCountryOption()}</select>
            <div className="flex">
                <div className="box confirmed">
                    <h3>Confirmed Cases:</h3>
                    <h4>{this.state.confirmed}</h4>
                </div>
                <div className="box recovered">
                    <h3>Recovered:</h3>
                    <h4>{this.state.recovered}</h4>
                </div>
                <div className="box deaths">
                    <h3>Deaths:</h3>
                    <h3>{this.state.deaths}</h3>
                </div>
            </div>
        </div>
        )
    }
}