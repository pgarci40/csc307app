import cors from "cors"
import express from "express";
const app = express();
const port = 8000;

app.use(cors());
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
const findUserById = (id) =>
    users["user_list"].find((user) =>
    user["id"] === id);

const addUser = (user) => {
    const id = generateUserId();
    user.id = id;
    users["user_list"].push(user);
    return user;
};
const generateUserId = () => {
    if(!users.user_list || users.user_list.length === 0){
        return 1;
    }
    const id = users.user_list.map(user => user.id).filter(id => typeof id === "number" && !isNaN(id));
    return Math.floor(Math.random() * 1000);

}
const deleteByUserId = (id) => {
    const idx = users["user_list"].findIndex(u => u.id === id);
    if(idx === -1) return false;
    users.user_list.splice(idx, 1);
    return true;
};

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    const newUser = addUser(userToAdd);

    if(newUser){
        res.status(201).send();
    }
    else{
        res.status(400).send("User could not be created");
    }

});

app.delete("/users/:id", (req, res) => {
    const{id} = req.params;
    if(deleteByUserId(id)){
        return res.sendStatus(204);
    }
    return res.status(404).send("Resource not found.");
});

app.get("/users", (req, res) => {
    const {name, job} = req.query;
    let result = users.user_list;
    if(name !== undefined){
        result = result.filter(u => u.name === name);
    }

    res.json({user_list:result});
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