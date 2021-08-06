import Joi from 'joi'

const userBodyScheme = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(1).required(),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required(),
})

export { userBodyScheme }