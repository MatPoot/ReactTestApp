import Events from './events.js';
import Loan from './loan.js';
import LoanList from './loan-list.js';
import LoanForm from './loan-form.js';

// Part A - Day 3
class App extends React.Component {
    constructor(props) {
        super(props);

        this.saveLoan = this.saveLoan.bind(this);
        this.pickLoan = this.pickLoan.bind(this);
        this.clearLoan = this.clearLoan.bind(this);

        this.state = {
            loans: [],
            currentLoan: undefined
        }
    }

    saveLoan(loanDetails) {
        let curr = null;

        // check for new loan
        if (!this.state.currentLoan) {
            curr = new Loan(loanDetails);
            // add the new loan to the array
            this.setState({loans: this.state.loans.concat(curr)});
        } else {
            curr = this.state.currentLoan;
            // don't know what exactly changed (if anything), so set them all
            curr.set('title', loanDetails.title);
            curr.set('principal', loanDetails.principal);
            curr.set('term', loanDetails.term);
            curr.set('rate', loanDetails.rate);
        }

        this.setState({
            currentLoan: curr
        });
    }

    pickLoan(idx) {
        this.setState({
            currentLoan: this.state.loans[idx]
        });
    }

    clearLoan() {
        this.setState({
            currentLoan: undefined
        });
    }

    render() {
        return (
            <div>
                <div className="col-sm-6 col-xs-12 loan-control">
                    <LoanForm loan={this.state.currentLoan} submitListener={this.saveLoan} resetListener={this.clearLoan} />
                </div>
                <div className="col-sm-6 col-xs-12 loan-display">
                    <LoanList loans={this.state.loans} clickListener={this.pickLoan} />
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('.app-display')
);