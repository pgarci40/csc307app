//defines API endpoints to 
//create user, read user, update user, and delete user
// routes/users.js
import { Router } from "express";
import userService from "../user-services.js"; // your DB logic

const router = Router();

// CREATE a new user
router.post("/", (req, res) => {
  userService
    .addUser(req.body)
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// READ all users or filter by name/job
router.get("/", (req, res) => {
  const { name, job } = req.query;
  userService
    .getUsers(name, job)
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// READ one user by ID
router.get("/:id", (req, res) => {
  userService
    .findUserById(req.params.id)
    .then((user) =>
      user ? res.json(user) : res.status(404).json({ error: "User not found" })
    )
    .catch((err) => res.status(400).json({ error: err.message }));
});

// UPDATE a user by ID
router.put("/:id", (req, res) => {
  const { name, job } = req.body;
  userService
    .findUserById(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });
      if (name) user.name = name;
      if (job) user.job = job;
      return user.save();
    })
    .then((updated) => res.json(updated))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// DELETE a user by ID
router.delete("/:id", (req, res) => {
  userService
    .deleteUserById(req.params.id)
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });
      return user.deleteOne();
    })
    .then(() => res.json({ deleted: true }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

export default router;
