const Validators = require('./validation/index')

module.exports = (validator) => {
  if (!Validators.hasOwnProperty(validator)) {
    throw new Error(`${validator} validator Is Not Exist`)
  }

  return async (req, res, next) => {
    try {
      const validate = await Validators[validator].validateAsync(req.body)
      req.body = validate
      next()
    } catch (error) {
      return res.status(422).json({
        message: error.message
      })
    }
  }
}
