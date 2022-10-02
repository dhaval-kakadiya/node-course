
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  role: {
    type: String,
    default: 'user'
  },
  verified: {
    type: Boolean,
    default: false
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  image: {
    type: String
  },
  resume: {
    type: String
  },
  audio: {
    type: String
  },
  is_delete: {
    type: Boolean,
    default:false
  }
})

userSchema.pre('save', async function (next)  {
  // do stuff
  try {
    const user = await mongoose.models.user.findOne({email: this.email})

    if(user){
      if(user._id.toString() !== this._id.toString()){
        const error = new Error('email already in use')
        error.statusCode = 422
        return next(error)
      }else{
        return next()
      }
    }
    next()

  } catch (error) {
    next(error)
  }
});


userSchema.pre(/^find/, async function (next)  {
  // do stuff
  this.where({is_delete: false})
  // this.set({ updatedAt: new Date() });
});

userSchema.post('find', function (result)  {
// console.log(JSON.parse(JSON.stringify(result)))
  // const lastName = result.last_name.toUpperCase();
  // result.last_name = lastName;
});

const user = mongoose.model('user', userSchema)
module.exports = user
