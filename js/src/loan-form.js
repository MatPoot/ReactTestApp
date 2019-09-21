import Loan from './loan.js';

class LoanForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleReset = this.handleReset.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        // Part A - Day 3
        this.state = (this.props.loan)? {loan: this.props.loan} : { loan : new Loan() }; 
    }

    handleChange(evt) {
        // update the state loan object

        // original, before initial test
        // this.state.loan.set(evt.target.name, evt.target.value); 
        
        // final, after testing
        switch(evt.target.name) {
            case 'principal':
            case 'term':
                this.state.loan.set(evt.target.name, Math.floor(evt.target.value));
                break;
            case 'rate':
                this.state.loan.set(evt.target.name, evt.target.value / 100);
                break;
            default:
                this.state.loan.set(evt.target.name, evt.target.value);
                break;
        }
        
        // update the local state for effects 
        this.setState({ 
            loan: this.state.loan
        });
    }

    handleReset(evt) {

        // Part A - Day 3
         // higher-level reset
         this.props.resetListener();

        // local reset
        this.setState({
            loan : new Loan()
        }); 
    }

    handleSubmit(evt) {
        evt.preventDefault();

        // Part A - Day 3
        // TODO: validate the form the fields
        let l = {
            title: this.state.loan.title,
            principal: +this.state.loan.principal,
            rate: +this.state.loan.rate,
            term: +this.state.loan.term
        }
        // higher-level submit listener
        this.props.submitListener(l);
    }

    render() {
        // Part A - Day 3
        // check for loan prop update
        if (this.props.loan && this.props.loan != this.state.loan) {
            this.state.loan = this.props.loan;
        }
        const payment = this.state.loan.payment().toFixed(2);
        const cost = this.state.loan.cost().toFixed(2);

        return (
            <div>
                <h3>Loan Entry</h3>
                <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
                    <div className="form-group">
                        <label>Title</label>
                        <input name="title" onChange={this.handleChange} type="text" className="form-control" id="loan-title" placeholder="title for the loan" value={this.state.loan.title} />
                    </div>
                    <div>
                        <label>Principal</label>
                        <div className="input-group">
                            <span className="input-group-addon">$</span>
                            <input name="principal" onChange={this.handleChange} type="number" pattern="\d+" className="form-control" id="loan-principal" placeholder="amount to borrow" aria-label="Amount (to the nearest dollar)" step="1" value={this.state.loan.principal} />
                            <span className="input-group-addon">.00</span>
                        </div>
                    </div>
                    <div>
                        <label>Rate</label>
                        <div className="input-group">
                            <input name="rate" onChange={this.handleChange} type="number" step=".01" className="form-control" id="loan-rate" placeholder="interest rate" aria-label="Rate (as a percent)" value={(+(this.state.loan.rate * 100).toFixed(2))} />
                            <span className="input-group-addon">%</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Term</label>
                        <input name="term" onChange={this.handleChange} type="number" pattern="\d+" className="form-control" id="loan-term" placeholder="number of periods" value={this.state.loan.term} />
                    </div>
                    <div className="form-group">
                        <label>Payment </label>
                        <span className="loan-payment" id="loan-payment"> ${payment} </span>
                        <label>Cost </label>
                        <span className="loan-cost  " id="loan-cost"> ${cost} </span>
                    </div>
                    <button type="submit" className="btn btn-default">Save</button>
                    {/* visual hack ... too lazy to update CSS */}
                    <span> </span>
                    <button type="reset" className="btn btn-info">Clear</button>
                </form>
            </div>
        )
    }
}

export default LoanForm;