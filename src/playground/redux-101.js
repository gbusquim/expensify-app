import { createStore, combineReducers } from "redux";
import uuid from 'uuid';

 function reduxTests() {

  const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
  });

  const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
  });

  const resetCount = () => ({
    type: 'RESET'
  });

  const setCount = ({ count } = {}) => ({
    type: 'SET',
    count
  })

  const reducer = (state = { count: 0 }, action) => {
    switch(action.type) {
      case 'INCREMENT':
        return {
          count: state.count + action.incrementBy
        };
      case 'DECREMENT':
        return {
          count: state.count - action.decrementBy
        };
      case 'RESET':
        return {
          count: 0
        }; 
      case 'SET':
        return {
          count: action.count
        }; 
      default:
        return state;
    }
  }

  const store = createStore(reducer);

  const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
  });

  store.dispatch(incrementCount({ incrementBy: 10 }));

  store.dispatch(incrementCount());

  store.dispatch(decrementCount({ decrementBy: 5}));

  store.dispatch(decrementCount());

  store.dispatch(resetCount());

  store.dispatch({
    type: "SET",
    count: 900
  });

  unsubscribe();


}

 function combineReducersTest() {

  const addExpense = (
    { 
      description = '', 
      note = '', 
      amount = 0, 
      createdAt = 0 
    } = {}
  ) => ({
    type: 'ADD_EXPENSE',
    expense: {
      id: uuid(),
      description, 
      note, 
      amount, 
      createdAt
    }
  });

  const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
  });

  const editExpense = (id, updates) => ({
    type:'EDIT_EXPENSE',
    id,
    updates
  });

  const expensesReducer = (state = [], action) => {
    switch(action.type) {
      case 'ADD_EXPENSE':
        return [
          ...state,
          action.expense
        ];
      case 'REMOVE_EXPENSE':
        return state.filter(({ id }) => id !== action.id);
      case 'EDIT_EXPENSE':
        return state.map((expense) => {
          if (expense.id === action.id) {
            return {
              ...expense,
              ...action.updates
            }
          }
          else {
            return expense;
          }
        });
      default:
        return state;
    }
  }

  const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
  });

  const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
  });

  const sortByDate = () => ({
    type: 'SORT_BY_DATE'
  });

  const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  };

  const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type) {
      case 'SET_TEXT_FILTER':
        return {
          ...state,
          text: action.text
        };
      case 'SORT_BY_AMOUNT':
        return {
          ...state,
          sortBy: 'amount'
        };
      case 'SORT_BY_DATE':
        return {
          ...state,
          sortBy: 'date'
        };
      default:
        return state;
    }
  }

  const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  }))

  store.subscribe(() => {
    console.log(store.getState())
 });

  const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 }));

  const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300 }));

  store.dispatch(removeExpense({ id: expenseOne.expense.id }));

  store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

  store.dispatch(setTextFilter('rent'));

  store.dispatch(setTextFilter());

  store.dispatch(sortByAmount());

  store.dispatch(sortByDate());

  const demoState = {
    expenses: [{ 
      id: "aa",
      description: "my rent",
      note: "This is an expense for my rent",
      amount: 54500,
      createdAt: 0
    }],
    filters: {
      text: 'rent',
      sortBy: 'amount',
      startDate: undefined,
      endDate: undefined
    }
  };
}

export {reduxTests, combineReducersTest};