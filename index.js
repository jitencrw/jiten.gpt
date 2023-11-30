import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";

const openai = new OpenAI({apiKey: "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"});
const port = 3000;
const app = express();
var input = "";
var result = "";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/" , (req , res)=> {
  res.render("index.ejs");
});

app.post("/result" , (req , res)=> {
input = req.body.name ;
main();

function wait() {
  if (result) {
  res.render("index.ejs" , {result: result , input: input}) ;
  result = ""; 
  clearInterval(myIntervel)}
 }
 const myIntervel = setInterval(wait, 1000);

});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: input }],
    model: "gpt-3.5-turbo",
  });
  result = completion.choices[0].message.content;
  console.log(result);
  
}




app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
