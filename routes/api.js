var express = require('express');
var router = express.Router();

const abbr = require('../data/countries/country-by-abbreviation.json')
const calling_data = require('../data/countries/country-by-calling-code.json')
const currency = require('../data/countries/country-by-currency-name.json')
const currency_code = require('../data/countries/country-by-currency-code.json')
const capital = require('../data/countries/country-by-capital-city.json')
const population = require('../data/countries/country-by-population.json')
const continent = require('../data/countries/country-by-continent.json')
const barcode = require('../data/countries/country-by-barcode-prefix.json')
const costline = require('../data/countries/country-by-costline.json')
const freedom = require('../data/countries/country-by-independence-date.json')
const domain = require('../data/countries/country-by-domain-tld.json')

const countryMapping = {}


/* GET users listing. */

 
  
  // const data =[
  //     {
  //         firstname:"aniket"
  //     },
  //     {
  //         lastname:"wagh"
  //     },
  //     {
  //         age:24
  //     }
  // ]

  // router.get('/data',function(req,res){
  //     res.json({
  //         messgae:"hello",
  //         res:data
  //     })
  // })


  const countries = [];
  abbr.forEach(function(item){
    const country = {
     country_code:item.abbreviation,
     country_name:item.country,
     domain:item.tld
    };
    calling_data.forEach(function(cc){
      if(cc.country === item.country){
        country.calling_code = cc.calling_code;
      }
    })
    capital.forEach(function(cc){
      if(cc.country === item.country){
        country.city = cc.city;
      }
    })
    currency.forEach(function(cc){
      if(cc.country === item.country){
        country.currency_name = cc.currency_name;
      }
    })
    currency_code.forEach(function(cc){
      if(cc.country === item.country){
        country.currency_code = cc.currency_code;
      }
    })
    population.forEach(function(cc){
      if(cc.country === item.country){
        country.population = cc.population;
      }
    })
    continent.forEach(function(cc){
      if(cc.country === item.country){
        country.continent = cc.continent;
      }
    })
    barcode.forEach(function(cc){
      if(cc.country === item.country){
        country.barcode = cc.barcode;
      }
    })
    costline.forEach(function(cc){
      if(cc.country === item.country){
        country.costline = cc.costline;
      }
    })
    freedom.forEach(function(cc){
      if(cc.country === item.country){
        country.independence = cc.independence;
      }
    })
    domain.forEach(function(cc){
      if(cc.country === item.country){
        country.domain = cc.tld;
      }
    })
    
    countries.push(country);
 


  if(country.country_code){
    countryMapping[country.country_code]=country;
  }
  if(country.domain){
    countryMapping[country.domain]=country;
  }
  if(country.currency_code){
    if(!countryMapping[country.currency_code]){
      countryMapping[country.currency_code] = [country];
    }else{
      countryMapping[country.currency_code].push(country);
    }
  }
  if(country.calling_code){
    if(!countryMapping[country.calling_code]){
      countryMapping[country.calling_code] = [country];
    }else{
      countryMapping[country.calling_code].push(country);
    }
  }

})

  router.get('/country/lookup',function(req,res){
    const lookupKey = req.query.lookupKey;
    console.log(lookupKey);
    const country = countryMapping[lookupKey];
    res.json({
      message: "Country Data",
      total: country && country.length,
      res: country && country || {}
    });
  });

router.get('/countries',function(req,res){
  res.json({
      messgae:"Countries Data!!",
      res:countries
  })
})


router.get('/countries/search',function(req,res){
  const query = req.query;
  console.log(query);
  const search =countries.filter(function(item){
    return item.country_code === query.country_code;
  })
  res.json({
      messgae:"Country List API!!",
      res:search
  })
})


router.get('/countries/search2',function(req,res){
  const query = req.query;
  const name = query.name;
  console.log(query);
  

 
  if(typeof +query.value === 'number' && !!(+query.value)){
    console.log("AAAAAAA"+(+query.value))
    query.value = +query.value;
  }
  let search = [];
    search = countries.filter(function(item){
      return item[name] === query.value;
    })
  

  res.json({
      messgae:"Country List API!!",
      res:search
  })
})

router.get('/countries/:name/:value',function(req,res){
  const params = req.params;
  console.log(params);
  let search = [];

  if(params.name === 'currency_code'){
    search = countries.filter(function(item){
      return item.currency_code === params.value;
    })
  }
  res.json({
      messgae:"Country List API!!",
      res:search
  })
})


  module.exports = router;