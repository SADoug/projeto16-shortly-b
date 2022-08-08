import joi from "joi";

export async function novoClienteValidação(req, res, next) {
    const newClient = req.body;

    const clientSchema = joi.object({
        name: joi.string().min(1).required(),
        email: joi.string().min(1).required(),
        password: joi.string().min(1).required(),
        confirmPassword: joi.ref("password")
    });
    const validation = clientSchema.validate(newClient);
    if (validation.error) {
        res.status(422).send(validation.error.details);
        return;
    }
    
    next();
}
