//  let  mainModel=require("../models/main");

//     mainModel.Cat.mapReduce({
//         query: {
//             age:15
//         },
//         map: function () {
//             return emit(this.class, { age2:this.age, });
//         },
//         reduce: function (key, v) {
//             var sum = 0;
//             v.forEach(function (item) {
//                 sum += item.age2;
//             });
    
//             return { key: key, count: v.length, sum: sum, avg: sum / v.length };
//         }, 
       
    
//     }).then(function (data) {
//         console.log(data.results);
//     });
