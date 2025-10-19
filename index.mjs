import express, { request, response } from "express";

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 3000;

const mockusers = [
    { id: 1, username: "viswaa", displayname: "Viswaa.E" },
    { id: 2, username: "sathish", displayname: "Sathish.S" },
    { id: 3, username: "abi", displayname: "Abi.M" },
];


app.get("/", (request, response) => {
    response.status(201).send({ msg: "hello" });

});

app.post("/api/users", (request, response) => {
    console.log(request.body)
    const {body}=request;
    const newUser = { id : mockusers[mockusers.length -1].id+1, ...body}
    mockusers.push(newUser)
    return response.status(200).send(newUser)
})

app.get("/api/users", (request, response) => {
    console.log(request.query)
    const {
        query: { filter, value }
    } = request;
    //all user data vara 
    if (!filter && !value) return response.send(mockusers);

    // specific user filter panna 
    if (filter && value) return response.send(
        mockusers.filter((user) => user[filter].includes(value)
        )
    )
})

app.get("/api/users/:id", (request, response) => {
    console.log(request.params)

    const parsedId = parseInt(request.params.id)
    if (isNaN(parsedId))
        return response.status(400).send({ msg: "bad request" });

    const finduser = mockusers.find((user) => user.id === parsedId);
    if (!finduser) return response.sendStatus(404);
    return response.send(finduser);

})

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});




//practice question
