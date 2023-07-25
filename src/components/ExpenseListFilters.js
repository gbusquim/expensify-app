import { useState } from "react";
import { connect } from "react-redux";
import { setTextFilter, sortByAmount, sortByDate , setStartDate, setEndDate} from "../actions/filters";
import { DateRangePicker } from "react-dates";

const ExpenseListFilters = (props) => {
  
  const [focused, setFocused] = useState(null);

  const onDatesChange = ({startDate, endDate}) => {
    props.dispatch(setStartDate(startDate));
    props.dispatch(setEndDate(endDate));
  };

  const onFocusChange = (focused) => {
    setFocused(focused);
  }

  return (
    <div>
      <input 
        type="text" 
        value={props.filters.text} 
        onChange={(e) => 
          props.dispatch(setTextFilter(e.target.value))
        }
      />

      <select
        value={props.filters.sortBy}
        onChange = {(e) => {
          e.target.value === 'amount' ?
            props.dispatch(sortByAmount()) :
            props.dispatch(sortByDate());
        }}
      >
        <option value="date">Date</option>
        <option value="amount">Amount</option>
      </select>
      <DateRangePicker
        startDate={props.filters.startDate}
        endDate={props.filters.endDate}
        onDatesChange={onDatesChange}
        focusedInput={focused}
        onFocusChange={onFocusChange}
        showClearDates={true}
        numberOfMonths={1}
        isOutsideRange={() => false}
      />



    </div>
)};

const mapToStateProps = (state) => {
  return {
    filters: state.filters
  };
};

export default connect(mapToStateProps)(ExpenseListFilters);