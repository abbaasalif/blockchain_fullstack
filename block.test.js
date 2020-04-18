const Block = require("./block");
const {GENESIS_DATA} = require('./config');
const cryptoHash = require('./crypto-hash');
describe('Block', () => {
    const timestamp = 'a-date';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain','data'];
    const block = new Block({timestamp,lastHash,hash,data });

    it('has a timestamp, has a lastHash, has a hash, has a data property ',() => {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
       
    });


    describe('genesis()',() => {
        const genesisBlock = Block.genesis();

        console.log('Genesis_Block',genesisBlock);

        it('returns a Block instance',() =>{
            expect(genesisBlock instanceof Block).toBe(true);


        });
        it('returns the data of genesis block',() =>{
            expect(genesisBlock).toEqual(GENESIS_DATA);

        });

    });

    describe('mineBlock()',() =>{
        const lastBlock = Block.genesis();
        const data = 'mined data';
        const minedBlock = Block.mineBlock({lastBlock,data});

        it('returns a Block Instance',() => {
            expect(lastBlock instanceof Block).toBe(true);
        });

        it('sets the `lastHash` to be the `hash` of the previous block',() =>{
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);


        });
        it('sets the `data`',() => {
            expect(minedBlock.data).toEqual(data);
        });
        it('sets a `timestamp`',() => {
            expect(minedBlock.timestamp).not.toEqual(undefined);

        });

        it('creates a `SHA-256` based on the proper inputs',() => {
            expect(minedBlock.hash).
            toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data));
        });



    });
    

});