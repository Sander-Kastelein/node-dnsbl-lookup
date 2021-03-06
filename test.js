"use strict";

var lookup = require('./index.js');
var assert = require('assert');

describe('DNSBL IPv4', function(){
  it('should work', function(done){
    var dnsbl = new lookup.dnsbl('58.97.142.25',['cbl.abuseat.org','sbl.spamhaus.org']);
    var result = {};
    dnsbl.on('error',function(err,bl){     	  
    	console.log(err,bl);
    });
    dnsbl.on('data',function(response,bl){
    	result[bl] = response;	
    });
    dnsbl.on('done', function(){                  
      done(assert.deepEqual(result,{"sbl.spamhaus.org":{status:"not_listed",address:"58.97.142.25"},"cbl.abuseat.org":{status:"not_listed",address:"58.97.142.25"}}));
    });    
  });
});

describe('DNSBL IPv6', function(){
  it('should work', function(done){
    var dnsbl = new lookup.dnsbl('2a01:4f8:140:4222::2',["dnsbl6.anticaptcha.net","v6.fullbogons.cymru.com","dnsbl.dronebl.org"]);
    var result = {};
    dnsbl.on('error',function(err,bl){        
      console.log(err,bl);
    });
    dnsbl.on('data',function(response,bl){
      result[bl] = response;
    });
    dnsbl.on('done', function(){           
      done(assert.deepEqual(result,{"v6.fullbogons.cymru.com":{status:"not_listed",address:"2a01:4f8:140:4222::2"},"dnsbl.dronebl.org":{status:"not_listed",address:"2a01:4f8:140:4222::2"},"dnsbl6.anticaptcha.net":{status:"listed",A:"127.0.0.3",TXT:"Please see http://dnsbl6.anticaptcha.net",address:"2a01:4f8:140:4222::2"}}));
    });    
  });
});

describe('URIBL', function(){
  it('should pass', function(done){
    var uribl = new lookup.uribl(['gmail.com'],['uribl.zeustracker.abuse.ch','uribl.abuse.ro','rhsbl.sorbs.net']);
    var result = {};
    uribl.on('error',function(err,bl){        
      console.log(err);
    });
    uribl.on('data',function(response,bl){
      result[bl] = response;   
    });
    uribl.on('done', function(){        
      done(assert.deepEqual(result,{"uribl.abuse.ro":{status:"not_listed",address:"gmail.com"},"rhsbl.sorbs.net":{status:"not_listed",address:"gmail.com"},"uribl.zeustracker.abuse.ch":{status:"not_listed",address:"gmail.com"}}));
    });    
  });
});