import express from "express";
import dotenv from "dotenv";
import { createClient } from "redis";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 7 });

const app = express();

dotenv.config();

const PORT = process.env?.PORT ?? 3000;
const REDIS_PORT = process.env?.REDIS_PORT ?? 6380;
const REDIS_HOST = process.env?.REDIS_HOST;
const REDIS_KEY = process.env.REDIS_KEY ?? "anon";
const REDIS_USER = process.env.REDIS_USER;

const redis = await createClient(
  REDIS_HOST ?? {
    url: `redis://${
      (REDIS_USER ? REDIS_USER + "@" : "") + REDIS_HOST + ":" + REDIS_PORT
    }`,
  }
)
  .on("error", (error) => console.error("Redis Client Error", error))
  .connect();

const handleErr = (res, error) => {
  console.error("error", error);
  return res.json({ status: "error", error });
};

app.get("/", (req, res) => {
  res.json({hello: "world", url: "karma.yt"});
});

app.get("/new", async (req, res) => {
  let { url, prompt, result, meta, key } = req.query;
  let n = {
    id: uid.rnd(),
    url,
    prompt,
    result,
    meta,
    key,
    date: new Date(),
  };

  try {
    await redis.set(`karma:${(key ?? REDIS_KEY)}:${n.id}`, JSON.stringify(n));
    return res.json({ status: "ok", id: n.id, key });
  } catch (error) {
    console.error(error);
    handleErr(res, { error });
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`karma:${REDIS_KEY}:${id}`);
  let data = await redis.get(`karma:${REDIS_KEY}:${id}`);
  try {
    data = JSON.parse(data);
    if (!data) return handleErr(res, "not found");
    res.json(data);
  } catch (error) {
    handleErr(res, { error });
  }
});

app.get("/:key/:id", async (req, res) => {
  const { id, key } = req.params;
  let data = await redis.get(`karma:${key}:${id}`);
  try {
    data = JSON.parse(data);
    if (!data) return handleErr(res, "not found");
    res.send(data);
  } catch (error) {
    handleErr(res, error);
  }
});

app.listen(PORT);

console.info(`Karma-short-url @ Listening on port ${PORT}`);
