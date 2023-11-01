const {rateLimit} =require("express-rate-limit");

module.exports = rateLimit({
    windowMs:15*60*1000,//15 min
    limit:150,//limit request ip,
    message:{message:"too many request from this ip"}
});
