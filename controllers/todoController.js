var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the databse Enter username and password
mongoose.connect('mongodb://<dbusername>:<dbuserpassword>@ds117251.mlab.com:17251/todo');

// Create a schema -this is like a blueprint

var toolSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', toolSchema);


//var data = [{item: 'Pay bills'}, {item: 'Eat Breakfast'}, {item: 'Go for grocery'}, {item: 'Make dinner'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

app.get('/todo', function(req,res){
  //get data from mongodb and pass it to view
  Todo.find({}, function(err,data){
    if (err) throw err;
    res.render('todo',{todos: data});
  });

});

app.post('/todo', urlencodedParser, function(req,res){
  //get data from the view and add it to mongodb
  var nTodo = Todo(req.body).save(function(err,data){
    if (err) throw err
    res.json(data);
  });

});

app.delete('/todo/:item', function(req,res){
  //delete the requested item from mongodb
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
    if (err) throw err;
    res.json(data);
  });

});


};
