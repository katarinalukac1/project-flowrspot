import React from 'react';
import ReactDOM from 'react-dom';
import './scss/_style.scss'
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import App from './App';
import FlowerList from './components/FlowerList';

const Reducer = combineReducers({
    form: formReducer
});

const store = createStore(Reducer);

const router = (
    <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/flowers" component={FlowerList} /> 
                <Route path="/sightings" component={App} />
                <Route path="/favorites" component={App} /> 
            </Switch>
    </BrowserRouter>
);

ReactDOM.render(<Provider store={store}> {router} </Provider>, document.getElementById('root'));