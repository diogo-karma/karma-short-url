import express from "express";
import dotenv from "dotenv";
import { createClient } from "redis";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 7 });

const app = express();

dotenv.config();

const PORT = process.env?.PORT || 3000;
const REDIS_KEY = process.env.REDIS_KEY || "anon";

const redis = await createClient()
  .on("error", (error) => console.error("Redis Client Error", error))
  .connect();

const handleErr = (res, error) => {
  console.error(error);
  return res.send({ status: "error", error });
};

app.get("/", (req, res) => {
  res.send("karma.yt");
});

app.get("/new", async (req, res) => {
  let { url, prompt, result, meta, k } = req.query;
  let n = {
    id: uid.rnd(),
    url,
    prompt,
    result,
    meta,
    date: new Date(),
  };

  try {
    await redis.set(`karma:${k || REDIS_KEY}:${n.id}`, JSON.stringify(n));
    return res.send({ status: "ok", id: n.id });
  } catch (error) {
    console.error(error);
    handleErr(res, { error });
  }
});

app.get("/:q", async (req, res) => {
  const { q, k } = req.params;
  let data = await redis.get(`karma:${k || REDIS_KEY}:${q}`);
  try {
    data = JSON.parse(data);
    if (!data) return handleErr(res, "not found");
    res.send(data);
  } catch (error) {
    handleErr(res, { error });
  }
});

app.listen(PORT);

console.info(`Karma-short-url @ Listening on port ${PORT}`);
