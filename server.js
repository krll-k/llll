'use strict';

const express = require('express');
const app = express();
const port = 8080;

var numcap = require('numcap');
var finder = new numcap();

const fetch = require('node-fetch');


//    setTimeout(() => resolve("done"), 1000);

//var start = Date.now();
//  let promise = new Promise(function(resolve, reject) {
//
//
//  });


function dmp(phone,city){
    fetch("https://api-profile.domru.ru/v1/unauth/contract?contact="+phone+"&isActive=0", {
      "headers": {"domain": city}
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data.address);
        return data.address;
    });
};

var cities =["angarsk","barnaul","ber","bryansk","volgograd","vlz","voronezh","votkinsk","dzr","dimgrad","ekat","izhevsk","irkutsk","yola","kazan","kirov","krd","krsk","kungur","kurgan","kursk","lipetsk","mgn","mich","msk","chelny","nk","nn","nsk","nizhneudinsk","omsk","oren","penza","perm","rostov","ryazan","samara","interzet","saratov","seversk","slk","sbor","syzran","tver","tomsk","tula","tmn","taishet","ulsk","usol","ufa","ulu","cheb","chel","chus","engels","yar"];

app.get('/:phone', (req, res) => {
  
  //определим регион и предположим город/города
  let checkRegionAndCity = new Promise(function(resolve, reject) {
    finder.getData(req.params.phone, function (err, data) {
      data.phone = req.params.phone
      if(data.region=="Республика Татарстан"){
        data.cityName = `Казань или Набережные Челны`
        data.cityVariable = `Казань или Набережные Челны или Нижнекамск`
        data.city = "kazan"
      }
      if(data.region=="Свердловская обл."){
        data.cityName = `Екатеринбург`
        data.cityVariable = `Екатеринбург или Берёзовский`
        data.city = "ekat"
      }
      if(data.region=="Самарская обл."){
        data.cityName = `Самара`
        data.cityVariable = `Самара или Сызрань или Кинель`
        data.city = "samara"
      }
      if(data.region=="Чувашская Республика - Чувашия"){
        data.cityName = `Чебоксары`
        data.cityVariable = `Чебоксары или Новочебоксарск`
        data.city = "cheb"
      }
      if(data.region=="Волгоградская обл."){
        data.cityName = `Волгоград`
        data.cityVariable = `Волгоград или Волжский`
        data.city = "volgograd"
      }
      if(data.region=="Пензенская обл."){
        data.cityName = `Пенза`
        data.cityVariable = `Пенза или Заречный`
        data.city = "penza"
      }
      if(data.region=="Красноярский край"){
        data.cityName = `Красноярск`
        data.cityVariable = `Красноярск или Сосновоборск`
        data.city = "krsk"
      }
      if(data.region=="Рязанская обл."){
        data.cityName = "Рязань"
        data.city = "ryazan"
      }
      if(data.region=="Брянская обл."){
        data.cityName = "Брянск"
        data.city = "bryansk"
      }
      if(data.region=="Омская обл."){
        data.cityName = "Омск"
        data.city = "omsk"
      }
      if(data.region=="Республика Башкортостан"){
        data.cityName = "Уфа"
        data.city = "ufa"
      }
      if(data.region=="Республика Удмуртская"){
        data.cityName = "Ижевск"
        data.city = "izhevsk"
      }
      if(data.region=="Тульская обл."){
        data.cityName = "Тула"
        data.city = "tula"
      }
      if(data.region=="Тюменская обл."){
        data.cityName = "Тюмень"
        data.city = "tmn"
      }
      if(data.region=="Томская обл."){
        data.cityName = "Томск"
        data.city = "tomsk"
      }
      if(data.region=="Челябинская обл."){
        data.cityName = "Челябинск"
        data.city = "chel"
      }
      if(data.region=="Республика Марий Эл"){
        data.cityName = "Йошкар-Ола"
        data.city = "yola"
      }
      if(data.region=="Курская обл."){
        data.cityName = "Курск"
        data.city = "kursk"
      }
      if(data.region=="Ульяновская обл."){
        data.cityName = "Ульяновск"
        data.city = "ulsk"
      }
//      if(data.region==""){
//        data.cityName = ""
//        data.city = ""
//      }
//      
      resolve(data)
    });
  });
  

  
  async function getDataAsync() {
//    console.log(123)
    let regAndCity = await checkRegionAndCity
    .catch(err => console.log(err))
    
      
    let currentClientOrNot = await fetch("https://api-profile.domru.ru/v1/unauth/contract?contact="+regAndCity.phone+"&isActive=0", {
      "headers": {"domain": regAndCity.city}
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data.address);
        return data.address;
    });
      
    if(regAndCity.city == "kazan"){
        let currentClientOrNotChelny = await fetch("https://api-profile.domru.ru/v1/unauth/contract?contact="+regAndCity.phone+"&isActive=0", {
          "headers": {"domain": "chelny"}
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data.address);
            return data.address;
        });   
    
        if(currentClientOrNotChelny != null){
           regAndCity.currentClientOrNotChelny = "вероятно действующий клиент в Челнах"
           regAndCity.currentClientAddressNotChelny = currentClientOrNotChelny
        }
    }
    
    if(currentClientOrNot != null){
       regAndCity.currentClientOrNot = "вероятно действующий клиент"
       regAndCity.currentClientAddress = currentClientOrNot
    }
    
    res.json(regAndCity)
  }

  getDataAsync();
  
  
});





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});




