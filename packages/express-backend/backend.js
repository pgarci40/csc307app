import express from "express";

const app = express();

const port = 8000;

app.use(express.json());

const users = {
    user_list: [
        {
            id: "xyz789",
            name: "Charlie", 
            job: "janitor"
        }
    ]
};
app.get("/", (req, res) => {
    res.send(users);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});