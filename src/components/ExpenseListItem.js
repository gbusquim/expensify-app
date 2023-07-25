import { Link } from "react-router-dom"

const ExpenseListItem = ({ id, description, amount, createdAt }) => {
  return (
    <div>
      <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
      </Link>
      <p>Amount:{amount} - Created at:{createdAt}</p>
    </div>
  );
};

export default ExpenseListItem;