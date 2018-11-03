import request from 'request'
import smoke from './lib'
import express from 'express'
const app = express()
import mongo from 'mongodb'
import MongoClient from 'express'

var url = "mongodb://localhost:27017/";
var dbo;

import {Login as login} from "bitsharesjs";
import {Login as login2} from "bitsharesjs";

var auths = {
    active: [
        ["GPH5Abm5dCdy3hJ1C5ckXkqUH2Me7dXqi9Y7yjn9ACaiSJ9h8r8mL", 1]
    ]
}

        login.setRoles(["active", "owner", "memo"]);

Apis.instance("wss://bitshares.openledger.info/ws", true).init_promise.then((res) => {
    console.log("connected to:", res[0].network);
    var toGet = 10000;
    Apis.instance().db_api().exec( "get_order_book", ["BTS", "SMOKE", 50]).then(function(objects) {
            for (var o in objects){
            	console.log(o)
            	for (var ob in objects[o]){
            	if (o == 'bids'){
            		sells.push({amount: parseFloat(objects[o][ob].quote), price: 1/parseFloat(objects[o][ob].price)})
            	} else {
            		if (parseFloat(objects[o][ob].price) > 0){

            		buys.push({amount: parseFloat(objects[o][ob].quote), price:1/parseFloat(objects[o][ob].price)})
            	}
            }
            }
        }
        buys.sort(function(a,b) { return a.price - b.price;});
var priceAtVolume = doLoop(0, 0, toGet);
console.log(priceAtVolume)

})

function doLoop(index, amt, target){
	var count = 0;
	for (var s in sells){
		if (count >= index){
    	amt = amt + parseFloat(sells[s].amount) * parseFloat(sells[s].price)
    	if (amt <= target){
    		return doLoop( index + 1, amt, target)
    	}
    	else {
    		return {amt:amt, price:sells[s].price}
    	}
    }
    count++;
}
}
});
var buys = []
var sells = []
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  dbo = db.db("mydb");
  dbo.createCollection("invoices", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
  });
});
import {PrivateKey, key} from "bitsharesjs";

let pkey = "5KVZuteavNxjRomBfxxbbY8SsCUPv8aAJL9kTFVtdwosrbhwMHu";

console.log("\nPrivate key:", pkey.toWif());
console.log("Public key :", pkey.toPublicKey().toString(), "\n");

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('view engine', 'ejs');
app.get('/', function(req, res) {
	console.log('lala');
    res.render('pages/index');
});

app.post('/form1', (req, res) => {
	
var input = req.body.input;
var output = req.body.output;
var account = req.body.account;
var amt = parseFloat(req.body.amt);


});
var port = 80;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


app.post('/paybear/callback', (req, res) => {
	console.log(req.body);
  if(req.body) {
  var data = req.body;
  var invoice = data.invoice;
console.log(data);
  //save data.confirmations - number of confirmations to DB

  if(data.confirmations >= data.maxConfirmations) {
    var amountPaid = data.inTransaction.amount / Math.pow(10, data.inTransaction.exp);
    //compare $amountPaid with order total
    //compare $invoice with one saved in the database to ensure callback is legitimate
    //mark the order as paid
      var myquery = { invoice: invoice};
	  var newvalues = { $set: {paid: true, amountPaid: amountPaid } };
	  dbo.collection("invoices").updateOne(myquery, newvalues, function(err, res) {
	    if (err) throw err;
	    console.log("1 document updated");
	  });
	     var query = { invoice: invoice };
  dbo.collection("invoices").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    request('https://api.coinmarketcap.com/v2/listings/', function(err, data3) {
		data3 = JSON.parse(data3.body)

		for (var d in data3.data){	
			if (data3.data[d].symbol == result[0].output){
			
request('https://api.coinmarketcap.com/v2/ticker/' + data3.data[d].id + '/', function(err, data) {
			data = JSON.parse(data.body)
console.log(data.data)
    var price = (data.data.quotes.USD.price);
	
	request('https://api.coinmarketcap.com/v2/listings/', function(err, data3) {
		data3 = JSON.parse(data3.body)
		for (var d in data3.data){
			if (data3.data[d].symbol == result[0].input){
								
					request('https://api.coinmarketcap.com/v2/ticker/' + data3.data[d].id + '/', function(err, data2) {
						data2 = JSON.parse(data2.body);

					amt = (data2.data.quotes.USD.price) * amountPaid;

					var toGet = ((amt / price) * fees).toString().substr(0, ((amt / price) * fees).toString().indexOf('.') + 4) + ' SMOKE';
					smoke.broadcast.transfer('5JEScui6K9F9nx6yDTTfraYQYqd7CnRP3Ar5ya7tbHYLPuodB6n', 'tfw.club', result[0].account, toGet, 'Payment from SwapIT', function(err, result) {
					    console.log(err, result);
					});

									});
			}
		}
	});
	

});
}
}
});
  });


    res.send(invoice); //stop further callbacks
  } else {
	  console.log('waiting');
    res.send('waiting for confirmations');
  }
} else {
	console.log('error');
  res.send('error');
}
})
app.post('/form2', (req, res) => {

var input = req.body.input;
var output = req.body.output;
var account = req.body.account;
request('https://api.paybear.io/v2/' + input + '/payment/http%3A%2F%2Fburstytools.trade%2Fpaybear%2Fcallback?token=sec97452dbe86fd2176012d9e840c4c8857', function (err, data4){
data4 = JSON.parse(data4.body).data;
console.log(data4);
  var myobj = { account: account, address: data4.address, invoice: data4.invoice, input: input, output: output, paid: false};
  dbo.collection("invoices").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });

res.send('send an amount of ' + input + ' to: ' + data4.address);
});
});
var fees = 0.95;