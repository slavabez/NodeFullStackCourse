import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const Header = () => <h2>Header</h2>;
const Dashboard= () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>Survey New</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {

    render(){
        return (<div>
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                </div>
            </BrowserRouter>
        </div>)
    }


}

export default App;