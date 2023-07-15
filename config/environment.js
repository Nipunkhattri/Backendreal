const config = {
    production: {
        JSON_SECRET: process.env.JSON_SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    development: {
        JSON_SECRET: process.env.JSON_SECRET,
        DATABASE: process.env.MONGODB_URI
    }
}


exports.get = function get(env) {
    return config[env] || config.development
}