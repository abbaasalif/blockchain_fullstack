const cryptoHash = require('./crypto-hash');

describe('cryptoHash()',() =>{
    
    it('generates 256 bit encryption',() => {
        expect(cryptoHash('foo'))
        .toEqual('2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae');


    });
    it('produces same hashwith the input arguements in any order',() =>{
        expect(cryptoHash('one','two','three'))
        .toEqual(cryptoHash('three','one','two'));

    });

});