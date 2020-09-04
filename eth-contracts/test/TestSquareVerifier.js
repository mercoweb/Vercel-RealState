// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var TestSquareVerifier = artifacts.require('Verifier');
var proof = require("../../zokrates/output_files/zokrates/proof.json");
var inc_proof = require("../../zokrates/output_files/zokrates/inc_proof.json");



contract('TestSquareVerifier', accounts => {

    const account_one = accounts[0];


    describe('zokrates', function () {
        beforeEach(async function () { 
            this.contract = await TestSquareVerifier.new({from: account_one});

        })

        
        // Test verification with correct proof
        it('should test proof verification', async function () { 

            let verify = await this.contract.verifyTx(proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs, {from: account_one});

            let event = verify.logs[0].event;
            let result = verify.logs[0].args.s;
            
            assert.equal(event, "Verified", "Should return verified");
            assert.equal(result, "Transaction successfully verified.", "Should return successfully");
            
        })


        // Test verification with incorrect proof
        it('should fail verification test', async function () { 

            let verify = await this.contract.verifyTx(inc_proof.proof.a, inc_proof.proof.b, inc_proof.proof.c, inc_proof.inputs, {from: account_one});

            let logs = [];
            logs = verify.logs;

            assert.equal(logs.length, 0, "Should return zero length array");
            
        })

    });


})
