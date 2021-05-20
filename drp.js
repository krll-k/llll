const fetch = require('node-fetch');

var start = Date.now();


function dmp(phone,city){
    fetch("https://api-profile.domru.ru/v1/unauth/contract?contact="+phone+"&isActive=0", {
      "headers": {"domain": city}
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        var finish = Date.now();
        console.log(city);
        console.log(finish-start);
        return data;
    });
};

var cities =["angarsk","barnaul","ber","bryansk","volgograd","vlz","voronezh","votkinsk","dzr","dimgrad","ekat","izhevsk","irkutsk","yola","kazan","kirov","krd","krsk","kungur","kurgan","kursk","lipetsk","mgn","mich","msk","chelny","nk","nn","nsk","nizhneudinsk","omsk","oren","penza","perm","rostov","ryazan","samara","interzet","saratov","seversk","slk","sbor","syzran","tver","tomsk","tula","tmn","taishet","ulsk","usol","ufa","ulu","cheb","chel","chus","engels","yar"];

cities.forEach(function(city){
    dmp(79991637975,city);
});