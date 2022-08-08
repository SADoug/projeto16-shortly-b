import joi from "joi";

export async function URLValidação(req, res, next) {
    console.log(req.body.url)
    const novaURL = req.body;
    const clientSchema = joi.object({
        url: joi.string().min(1).required()
    });
    const validation = clientSchema.validate(novaURL);

    if (validation.error) {
        res.status(400).send(validation.error.details);
        return;
    }
    next();
}
