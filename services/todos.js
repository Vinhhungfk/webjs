const Sequelize = require('Sequelize');
const db =  require('./db');
const User = require('./user');
const Model = Sequelize.Model;



class Todo extends Model{
    async markAsDone(){
        this.done = true;
        return this.save();
    }
    
    static async findAllNotDone(){
        return Todo.findAll({
            where: {
                done: false,
            }
        });
    }


    static async findById(id){
        return Todo.findByPk(id);
    }



    static add(name){
        return Todo.create({name,done:false});;
    }
}







Todo.init({
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    done: {
      type: Sequelize.BOOLEAN,
       allowNull: false,
       defaultValue : false,
    },
  
  }, {
    sequelize: db,
    modelName: 'todo',
  });



 //User.hasMany(Todo);
 //Todo.belongsTo(User);

module.exports = Todo;