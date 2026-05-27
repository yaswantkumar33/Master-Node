const express = require('express');
const app = express();
const morgan = require('morgan');
const { z } = require('zod');


// env config  
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


// config morgan middleware 
app.use(morgan('dev'));
// body json parser 
app.use(express.json());


// build schema for the zod validation 
const Reqschema = z.object({
    username: z.string(),
    email: z.string().email(),
    age: z.number().int().positive()
})


app.post('/api/test', (req, res) => {

    const result = Reqschema.safeParse(req.body);
    console.log(result);
    if (!result.success) {
        return res.status(400).json({
            messge: fail,
            errors: result.error.issues.map(issue => ({
                field: issue.path[0],
                message: issue.message
            }))
        })
    }

    res.status(200).json({
        message: "Req received",
    })

})

module.exports = app;
