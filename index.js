// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


// 2. Create an express app and set the port number.

const port = 3000;
const app = express();

// 3. Use the public folder for static files.
app.use(express.static('public'));

const yourBearerToken = "7359c93c-1f4b-4d6f-a404-d1fb7afa1fd9";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};
app.use(bodyParser.urlencoded({extended: true}));

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://secrets-api.appbrewery.com/random", config) 
        res.render("index.ejs", {secret: JSON.stringify(result.data.secret), user: JSON.stringify(result.data.username)})
    } catch (error) {
        console.error(error.message);
        
    }
})
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`server running on port ${port}...`);
    
})