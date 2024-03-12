const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const DetailsModel = require("./models/details");

const app = express();
app.use(express.json()); // converts data from front end to json format.
app.use(cors());

const mongoconnection = async () => {
  try {
    const mong = await mongoose.connect(
      "mongodb+srv://saisriram:srivishnu@cluster0.x0z8xal.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("mongodb connection successful!");
  } catch (error) {
    console.log("error while mongodb connect:0" + error);
  }
};
mongoconnection();

app.post("/add-details", (req, res) => {
  const { name, email, mobileNo, designation, gender, courses } = req.body;
  const data = {
    name: name,
    email: email,
    mobileNo: mobileNo,
    designation: designation,
    gender: gender,
    courses: courses[0],
  };
  console.log(data);

  DetailsModel.create(data)
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: "Details added successfully" });
    })
    .catch((error) => {
      console.error("Error in add-details route:", error);
      res.status(500).json({ error: "An error occurred while adding details" });
    });
});

app.get("/get-details", async (req, res) => {
  try {
    const details = await DetailsModel.find({});
    res.status(200).json(details);
  } catch (error) {
    console.error("Error in get-details route:", error);
    res.status(500).json({ error: "An error occurred while fetching details" });
  }
});

app.get("/get-details/:id", async (req, res) => {
  const _id = req.params.id;
  var data = undefined;
  try {
    data = await DetailsModel.findById(_id);
    //     console.log(data);
  } catch (err) {
    console.log("error in get-datails/id route:" + err);
  }
  res.send(data);
});






app.put("/update-detail/:id", async (req, res) => {
     const id = req.params.id;
     const updatedData = req.body;
     console.log(req.body)
     try {
       const updatedDetail = await DetailsModel.findByIdAndUpdate(id, updatedData, { new: true });
       res.status(200).json({ message: "Detail updated successfully", updatedDetail });
     } catch (error) {
       console.error("Error updating detail:", error);
       res.status(500).json({ error: "An error occurred while updating detail" });
     }
   });



   app.delete("/delete-details/:id", async (req, res) => {
     const id = req.params.id;
     try {
       await DetailsModel.findByIdAndDelete(id);
       res.status(200).json({ message: "Detail deleted successfully" });
     } catch (error) {
       console.error("Error deleting detail:", error);
       res.status(500).json({ error: "An error occurred while deleting detail" });
     }
   });



app.listen(3001, () => {
  console.log("running");
});
