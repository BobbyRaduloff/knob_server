const { default: mongoose } = require("mongoose");
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function db_connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "knob",
      ignoreUndefined: true,
    };

    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export function db_handle_error(e, res) {
  if (process.env.IS_DEV === "TRUE") {
    console.log(e.name);
    console.log(e.message);
  }

  switch (e.name) {
    case "ValidationError": {
      let err = "";
      Object.keys(e.errors).forEach((key) => {
        err += e.errors[key].message + " ";
      });
      err = err.slice(0, -1);

      res.status(400).send({ error: err });
      return true;
    }
    case "MongoServerError": {
      if (e.code === 11000) {
        res.status(400).send({ error: "Тази стойност вече е заета!" });
        return true;
      }

      res.status(500).send({ error: "Internal server error!" });
      return true;
    }
    default: {
      res.status(500).send({ error: "Internal server error!" });
      return true;
    }
  }
}
