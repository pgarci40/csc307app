
import express from "express";
const app = express();
const port = 8000;
app.use(express.json());

const findUserByName = (name) => {
    return users["user_list"].filter(
        (user) => user["name"] == name
    );
};


const users = {
    user_list: [
        {
            id: "xyz789",
            name: "Charlie", 
            job: "janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "professor"
        }
    ]
};
app.get("/users", (req, res) => {
    const name = req.query.name;
    if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/users`);
});