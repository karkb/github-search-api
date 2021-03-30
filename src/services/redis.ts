import redis from "redis";

let redisClient: redis.RedisClient;
// begain init Redis //
const initRedis = () => {
  const redisPort = 6379;
  redisClient = redis.createClient(redisPort);

  redisClient.on("error", (err) => {
    console.log(err);
  });
};
// end init Redis //

export { initRedis, redisClient };
