
require('dotenv').config();
const express = require("express");
const app = express();
require("./dbconn/connection");
const Register = require('./model/registerSchema');
const Company = require('./model/companySchema');
const Rating = require('./model/ratingSchema');
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello")
})

// ---------------------------------------------------------------------------------------------
// ------------------------------------ Login Code  --------------------------------------------
app.post("/login", (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(422).json({ error: "Can Not Save Empty Fields" })
    } else {
        Register.findOne({ email: email })
            .then(registration => {
                if (registration.password === password) {
                    return res.status(200).json({ registration })
                } else {
                    return res.status(422).json({ error: "Incorrect Password!" })
                }
            })
            .catch(err => {
                return res.status(500).json({ error: "Email not Exists !" })
            })
    }
})


// ---------------------------------------------------------------------------------------------
// ------------------------------------ Registration Code --------------------------------------

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
    const { companyName, companyLocation, city, foundedon } = req.body;
    console.log(req.body)
    if (!companyName || !companyLocation || !foundedon || !city) {
        return res.status(422).json({ error: "Can Not Save Empty Fields" })
    } else {
        // save company in the collection
        const company = new Company({
            companyName,
            companyLocation,
            foundedon,
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

app.get("/companyList", async (req, res) => {
    const company = await Company.find();
    if (company.length < 1) {
        res.status(500).json({ data: "No Company Found" });
    } else {
        res.status(200).json(company);
    }
})


// ---------------------------------------------------------------------------------------------
// ------------------------------------ Company Rating post ------------------------------------

app.post("/rating", (req, res) => {
    const { companyId, userId, rating } = req.body;
    // console.log(req.body)
    if (!companyId || !userId || !rating) {
        return res.status(422).json({ error: "Can Not Save Empty Fields" })
    } else {
        Rating.findOne({ companyId: companyId, userId: userId })
            .then((ratingExist) => {
                
                // checking user exists of not in DB
                if (ratingExist) {
                    // console.log(companyId, userId, rating)
                    ratingExist.rating = rating;
                    ratingExist.save().then(() => {
                        res.status(200).json({ message: "Rating Submitted !" });
                    })
                        .catch((err) => {
                            console.log(err)
                            res.status(422).json({ error: "Failed to Rete" })
                        });;
                   
                } else {
                    // save user in the collection
                    const companyRating = new Rating({
                        companyId,
                        userId,
                        rating
                    })

                    companyRating.save().then(() => {
                        res.status(200).json({ message: "Rating Submitted !" });
                    })
                        .catch((err) => {
                            console.log(err)
                            res.status(422).json({ error: "Failed to Rete" })
                        });
                }
            })

            .catch((err) => {
                console.log(err);
            });

    }
})


// ---------------------------------------------------------------------------------------------
// ------------------------------------ rating count -------------------------------------------

app.get("/ratings", async (req, res) => {
    Rating.aggregate([
        {
            $group: {
                _id: '$companyId', // Group by companyId
                averageRating: { $avg: '$rating' } // Calculate the average rating for each group
            }
        }
    ]).exec()
        .then(result => {
            res.status(200).json({result});
        })
        .catch(error => {
            res.status(500).json({ data: "No Rating Found" });
        });
    // const rating = await Rating.find({companyId: req.params.id});
    // if (rating.length < 1) {
    //     res.status(500).json({ data: "No Rating Found" });
    // } else {
    //     res.status(200).json(rating);
    // }
})

app.listen(3400);