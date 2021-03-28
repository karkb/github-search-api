import { redisClient } from '../services/redis'

// check results in cache
const checkCacheOnRedis = async (req:any, res:any, next:any) => {
    const searchTerm = req.query.search;
    try {
        redisClient.get(searchTerm, async (err, results) => {
            if (results) {
                return res.status(200).json({
                    code: 200,
                    items: JSON.parse(results),
                });
            }
            next()
        })
    } catch (err) {
        res.status(500).send({ code: 500, message: err.message });
    }
}

// clear redis cache
const clearCacheOnRedis = async (req:any, res:any, next:any) => {
    try {
        redisClient.flushdb( function (err, succeeded) {
            if (err) {
                return res.status(500).send({ message: err });
            }
            res.status(200).send({ message: "redis cleared successfully" }); 
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

export {
    checkCacheOnRedis,
    clearCacheOnRedis
}
