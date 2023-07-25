import { connect } from "react-redux";
import { editExpense, removeExpense } from "../actions/expenses";
import ExpenseForm from "./ExpenseForm";


const EditExpensePage = (props) =>  {
  console.log(props);
  return (
    <div>
      <ExpenseForm
        expense={props.expense}
        onSubmit={(expense) => { 
          console.log('updated:', expense);
          props.dispatch(editExpense(props.expense.id, expense));
          props.history.push("/");
        }}
      />
      <button onClick={() => {
        props.dispatch(removeExpense({id: props.expense.id})); 
        props.history.push("/");
      }}
      >Remove</button>
    </div>
  )
}

const mapToStateProps = (state, props) => {
  return {
    expense: state.expenses.find((expense) =>
      expense.id === props.match.params.id
    )
}}

export default connect(mapToStateProps)(EditExpensePage);