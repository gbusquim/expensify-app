import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import { Provider } from 'react-redux';
import getVisibleExpenses from './selectors/expenses'
import {reduxTests, combineReducersTest} from './playground/redux-101';
import './styles/styles.scss';

const store = configureStore();

store.dispatch(addExpense({ description: 'Water bill', amount: 300 }));

store.dispatch(addExpense({ description: 'Gas Bill', createdAt: 1000 }));

store.dispatch(addExpense({ description: 'Rent', amount: 10000 }));

store.dispatch(setTextFilter(""));

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);


console.log(visibleExpenses);



//combineReducersTest();
//reduxTests();
const root = ReactDOM.createRoot(document.getElementById('root'));
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

root.render(jsx);