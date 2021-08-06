import Joi from 'joi'

const userBodyScheme = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required(),
})

const signInBodyScheme = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
})

export { userBodyScheme, signInBodyScheme}