import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

const deleteUserById = (userId) => {
  const userToDelete = findUserById(userId);
  if (!userToDelete) {
    return null;
  }
  const index = users["users_list"].indexOf(userToDelete);
  users["users_list"].splice(index, 1);
  return true;
};

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const deletedUser = deleteUserById(userId);
  if (!deletedUser) {
    res.status(404).send("User not found");
  } else {
    res.send("User deleted successfully");
  }
});

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  
  if (name && job) {
    const matchedUsers = findUsersByNameAndJob(name, job);
    if (matchedUsers.length === 0) {
      return res.status(404).send("User not found");
    }
    res.send({ users_list: matchedUsers });
    } else if (name) {
    	const matchedUsers = findUserByName(name);
    	if (matchedUsers.length === 0) {
      	return res.status(404).send("User not found");
    }
    res.send({ users_list: matchedUsers });
  } else {
    res.send(users);
  }
});


const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const findUsersByNameAndJob = (name, job) =>
  users["users_list"].filter((user) => {
    return user["name"].toLowerCase() === name.toLowerCase() && user["job"].toLowerCase() === job.toLowerCase();
  });

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("User not found");
  } else {
    res.send(result);
  }
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
