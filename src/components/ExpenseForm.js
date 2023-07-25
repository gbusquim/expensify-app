import { useState } from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import 'react-dates/lib/css/_datepicker.css'

const ExpenseForm = ({ onSubmit, expense }) => {
  
  const [description, setDescription] = useState(expense ? expense.description : '');
  const [note, setNote] = useState(expense ? expense.note : '');
  const [amount, setAmount] = useState(expense ? (expense.amount/100).toString() : '');
  const [createdAt, setCreatedAt] = useState(expense ? moment(expense.createdAt) : moment());
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState('');

  const onDescriptionChange = ({target: { value: description }}) => {
    ///const description = value;
    setDescription(description);
  };

  const onNoteChange = ({target: { value: note }}) => {
    ///const description = value;
    setNote(note);
  };

  const onAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      setAmount(amount);
    }
  };

  const onDateChange = (createdAt) => {
    if (createdAt)
      setCreatedAt(createdAt);
  }

  const onButtonSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) {
      setError("Please provide description and amount!");
    }
    else {
      setError("");
      onSubmit({
        description,
        amount: parseFloat(amount, 10) * 100,
        createdAt: createdAt.valueOf(),
        note
      });
    }
  }

  const onFocusChange = ({focused}) => setFocused(focused);

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={onButtonSubmit}>
        <input 
          type="text"
          placeholder="Description"
          autoFocus
          value={description}
          onChange={onDescriptionChange}
        />
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={onAmountChange}
        />

        <SingleDatePicker
          date={createdAt}
          onDateChange={onDateChange}
          focused={focused}
          onFocusChange={onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />

        <textarea
          placeholder="Add a note to your expense"
          value={note}
          onChange={onNoteChange}
        >
        </textarea>
        <button>Add expense</button>
      </form>
    </div>
  )
}

export default ExpenseForm;