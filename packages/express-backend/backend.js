
import express from "express";
const app = express();
const port = 8000;
app.use(express.json());

const findUserByName = (name) => {
    return users["user_list"].filter(
        (user) => user["name"] == name
    );
};

const findUserById = (id) =>
    users["user_list"].find((user) =>
    user["id"] === id);

const addUser = (user) => {
    users["user_list"].push(user);
    return user;
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
        },
         {
            id: "yat999",
            name: "Dee",
            job: "Aspiring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        },
        {
            "id": "qwe123",
            "job": "Zookeeper",
            "name": "Cindy"
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

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    const result = findUserById(id);
    if(result===undefined){
        res.status(404).send("Resource not found.");
    }
    else{
        res.json(result);
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/users`);
});