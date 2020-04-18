const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain',() => {
    const blockchain = new Blockchain();

    it('contains a `chain` Array instance ',() =>{
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with the genesis block',() => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });
    
    it('adds a new block to the chain',() => {
        const newData = 'foo bar';
        blockchain.addBlock({data:newData});

        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);

    });

    describe('isValidChain()',() => {
        describe('when the chain doesnt start with the genesis block',() => {
            it('retuns false',() =>{
                blockchain.chain[0] = { data: 'fake-genesis'};

                expect(blockchain.isValidChain(blockchain.chain)).toBe(false);

            });


        });
        describe('when the chain starts with the genesis block and has multiple blocks',() => {
            describe('and a last hash reference has changed',() =>{
                it('returns false', () => {
                    blockchain.addBlock({ data : 'Bears'});
                    blockchain.addBlock({ data : 'Beets'});
                    blockchain.addBlock({ data : 'Batllestar Galactica'});
                    blockchain.chain[2].lastHash = 'broken-hash';

                    expect(blockchain.isValidChain(blockchain.chain)).toBe(false);

                    
                });
            });

            describe('and chain contains a block with an invalid block with an invalid field',() =>{
                it('returns false', () => {});
            });
            
            describe('and the chain does not contain any invalid blocks',() =>{
                it('returns true',() =>{

                });
            });


        });
    });
});