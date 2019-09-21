class LoanList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    // Part A - Day 3
    this.props.clickListener(evt.target.dataset.idx);
  }

  render() {
    return !this.props.loans || this.props.loans.length === 0 ? (
      <div>
        <h3>Loan List</h3>
        <div className="list-group">
          <button type="button" className="list-group-item">
            No Loans Entered
          </button>
        </div>
      </div>
    ) : (
      <div>
        <h3>Loan List</h3>
        <div className="list-group">
          {this.props.loans.map((loan, idx) => (
            <button
              key={idx}
              data-idx={idx}
              type="button"
              className="list-group-item"
              onClick={this.handleClick}
            >
              {loan.get('title')}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default LoanList;
