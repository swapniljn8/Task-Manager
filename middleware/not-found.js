const notFound = (req,res) =>{
    res.status(404).send("Not so much found")
}
module.exports = notFound