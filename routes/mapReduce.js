var model = require("../models/models");

model.Cat.mapReduce({
    map: function () {
        return emit(this.sex, { age: this.age, count: 1, avg: this.age, sum: this.age });
    },
    reduce: function (key, v) {
        var sum = 0;
        v.forEach(function (item) {
            sum += item.age;
        });

        return { key: key, count: v.length, name: key, sum: sum, avg: sum / v.length };

    }, query: {
        sex: {$regex:"man"},
        age: {$gt:22}
    }

}).then(function (data) {
    console.log(data.results);
});


