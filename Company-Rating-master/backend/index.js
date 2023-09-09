const express = require("express");
const app = express();
require("./dbconn/connection");
const Register = require('./model/registerSchema');
const Company = require('./model/companySchema');
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello")
})

app.post("/login", (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(422).json({ error: "Can Not Save Empty Fields" })
    }else {
        Register.findOne({email : email})
            .then(registration => {
                if (registration.password === password) {
                    return res.status(200).json({ registration })

                } else {
                    return res.status(422).json({ error: "Incorrect Password!" })
                }
            })
            .catch(err => {
                return res.status(500).json({error: "Email not Exists !"})
            })
    }
})

app.post("/register", (req, res) => {
    const { name, email, password, cpassword, phone, city, state, role } = req.body;
    console.log(req.body)
    if (!name || !email || !password || !cpassword || !phone || !city || !state || !role) {
        return res.status(422).json({ error: "Can Not Save Empty Fields" })
    } else if (password !== cpassword) {
        return res.status(422).json({ error: "Password & COnfirm Password are not matched !" });
    } else {

        Register.findOne({ email: email })
            .then((userExist) => {
                // checking user exists of not in DB
                if (userExist) {
                    return res.status(422).json({ error: "Email Already Exists" });
                }
                // save user in the collection
                const register = new Register({
                    name,
                    email,
                    phone,
                    password,
                    city,
                    state,
                    role
                })

                register.save().then(() => {
                    res.status(200).json({ message: "Register Successfull !" });
                })
                    .catch((err) => {
                        console.log(err)
                        res.status(422).json({ error: "Failed to Register" })
                    }
                    );
            })
            .catch((err) => {
                console.log(err);
            });
    }
})


// ---------------------------------------------------------------------------------------------
// ------------------------------------ Company Add --------------------------------------------

app.post("/addCompany", (req, res) => {
    const { companyName, companyLocation, city, foundedOn } = req.body;
    // console.log(req.body)
    if (!companyName || !companyLocation || !foundedOn || !city) {
        return res.status(422).json({ error: "Can Not Save Empty Fields" })
    } else {
        // save company in the collection
        const company = new Company({
            companyName,
            companyLocation,
            foundedOn,
            city
        })

        company.save().then(() => {
            res.status(200).json({ message: "Company Added !" });
        })
            .catch((err) => {
                console.log(err)
                res.status(500).json({ error: "Failed to Add Company" })
            }
            );

    }
})


// ---------------------------------------------------------------------------------------------
// ------------------------------------ List All Companies -------------------------------------

app.get("/companyList", (req, res)=>{
    
})

app.listen(3400);