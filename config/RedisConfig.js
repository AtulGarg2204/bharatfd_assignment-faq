import redis from "redis"
const redisClient = redis.createClient({
    socket:{
        host:process.env.REDIS_HOST,
        port:process.env.REDIS_PORT
    }
})
redisClient.connect();
redisClient.on("connect",()=>{console.log("Redis Connection Established Successfully")});
redisClient.on("error",(error)=>{console.log("Redis Connection Error:", error.message)});
export default redisClient;