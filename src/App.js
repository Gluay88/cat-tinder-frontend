import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CatIndex from './pages/CatIndex';
import CatShow from './pages/CatShow';
import CatNew from './pages/CatNew';
import CatEdit from './pages/CatEdit';
import NotFound from './pages/NotFound';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import cats from './mockCats'
import './App.css'




class App extends Component {
    constructor(props){
      super(props)
        this.state = {
          cats: []
        }
    }

    componentDidMount(){
      this.readCat()
    }

    readCat = () => {
      fetch("http://localhost:3000/cats")
      .then(response => response.json())
      .then(catsArray => this.setState({cats: catsArray}))
      .catch(errors => console.log("Cat read errors:", errors))
    }


    // createCat = (cat) => {
    //   console.log("Cat has been created", cat);
    // }

    createCat = (newCat) => {
      fetch("http://localhost:3000/cats", {
        body: JSON.stringify(newCat),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
      .then(response => response.json())
      .then(payload => this.readCat())
      .catch(errors => console.log("Cat create errors:", errors))
    }

    updateCat = (cat, id) => {
      console.log("cat:", cat)
      console.log("id:", id)
    }

  render() {
    return(
    <div>
      <Header />
          <Router>
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route 
                  path="/catindex"
                  render={(props) => <CatIndex cats={this.state.cats} />}
                  />

                  <Route
                  path="/catshow/:id"
                  render={(props) => {
                    let paramId = +props.match.params.id
                    let cat = this.state.cats.find(cat => cat.id === paramId)
                    return <CatShow cat={cat} />
                  }} 
                  />
                  
                  <Route
                  path="/catnew"
                  render={(props) => <CatNew createCat={this.createCat} />}
                  />


                  <Route path="/catedit/:id"
                    render={(props) => {
                    let id = props.match.params.id
                    let cat = this.state.cats.find(cat => cat.id === +id)
                    return <CatEdit updateCat={this.updateCat} cat={cat} />
                  }} />

                  <Route component={NotFound}/>

              </Switch>
          </Router>
      <Footer />
    </div>
    )
  }
}

export default App;
