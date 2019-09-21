import {expect} from 'chai';
import sinon from 'sinon';
import Loan from '../js/dist/loan.js';

let l = null;

describe('Loan', function() {
    beforeEach(function() {
        l = new Loan();
    });
    describe("#Loan constructor", function() {
        context('when called without arguments', function() {
            it('should initialize default property title', function() {
                expect(l.title).to.be.a('string');
            });
            it('should initialize default property principal', function() {
                expect(l.principal).to.be.a('number');
            });
            it('should initialize default property rate', function() {
                expect(l.rate).to.be.a('number');
            });
            it('should initialize default property term', function() {
                expect(l.term).to.be.a('number');
            });
        });
        context('when called with arguments', function() {
            it('should initialize all desired properties', function() {
                l = new Loan({
                    title: 'Title',
                    principal: 1,
                    rate: 0.01,
                    term: 1
                });
                expect(l.title).to.equal('Title');
                expect(l.principal).to.equal(1);
                expect(l.rate).to.equal(0.01);
                expect(l.term).to.equal(1);
            });
        });
    });
    describe('#set()', function() {
        it('should set the desired property on the loan', function() {
            l.set('term', 1);
            expect(l.term).to.equal(1);
        });
        it('should trigger the \'change\' event', function() {
            // stub the trigger function to achieve isolation (don't want to actually 
            // call the original trigger function)
            let triggerSpy = sinon.stub(l, 'trigger');

            // alternative to create true dependency separation
            // var triggerSpy = l.trigger = sinon.spy();

            // stub the trigger function on the loan
            l.set('term', 1);
            // ensure that the call to trigger was made with 'change' as the argument
            expect(triggerSpy.calledWith('change')).to.equal(true);
        });
    });
    describe('#get()', function() {
        it('should get the desired property from the loan', function() {
            l.term = 1;
            expect(l.get('term')).to.equal(1);
        });
    });
    describe('#payment', function() {
        it('should return the correct payment amount', function() {
            l.principal = 1000;
            l.term = 1;
            l.rate = 0.05;
            expect(l.payment()).to.be.within(85.60, 85.62);
        });
    });
    describe('#cost()', function() {
        it('should return the correct cost of the loan', function() {
            // cost() will rely on l.payment(), so we will stub/fake it
            let stub = sinon.stub();

            if (l.payment) {
                sinon.stub(l, 'payment').callsFake(() => 85.6074817884668);
            } else {
                stub.callsFake(() => 85.6074817884668);
                l.payment = stub;
            }

            // set to reflect true cost of loan payment
            l.principal = 1000;
            l.term = 1;

            expect(+l.cost().toFixed(2)).to.equal(27.29);
        });
    });
});
