
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
},{
  timestamps: true
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

userSchema.post('find', function (docs) {
  if(Array.isArray(docs)){
    docs.forEach(doc => {
      doc.first_name = doc.first_name.toUpperCase();
      console.log("mongoose post method",doc);
    });
  }
});

const user = mongoose.model('user', userSchema)
module.exports = user
