import express, { Request, Response } from "express";
// @ts-ignore

import { Authenticate } from "../middleware/auth";
import { db } from "../database/database";
export const router = express.Router();

router.get("/search/", async (req: Request, res: Response) => {
  let { tags, nsfw } = req.query;
  //@ts-ignore
  const limit = parseFloat(req.query.limit.toString()) || 5;
  //@ts-ignore
  const page = parseFloat(req.query.page.toString()) + 1 || 1;

  if (nsfw === "true") {
    //@ts-ignore

    nsfw = true;
  } else if ((nsfw = "false")) {
    //@ts-ignore

    nsfw = false;
  }

  tags = tags?.toString().split("+");

  const tagExists = await db("tags")
    .select("*")
    //@ts-ignore
    .whereIn("tag", [...tags])
    .then((rows) => {
      if (rows.length === 0) {
        return false;
      }

      tags = rows;

      //@ts-ignore
      if (nsfw === false) {
        //@ts-ignore
        tags = tags.filter((tag: any) => {
          return tag.nsfw === false;
        });
      }
      return true;
    })
    .catch((e) => res.status(400).json(e.detail));

  //@ts-ignore
  const queryTags = tags.map(({ tag }: any) => tag);

  if (tagExists) {
    await db("tags")
      .select(["id", "tag"])
      .whereIn("tag", [...queryTags])
      .then(async (data) => {
        const ids = data.map(({ id }) => id);
        const tags = data.map(({ tag }) => tag);

        const imgs = await db
          .select(["imageId as id", "secureUrl", "height", "width", "views"])
          .from("images")
          .innerJoin("images_tags", "images.id", "images_tags.imageId")
          .whereIn("images_tags.tagId", [...ids])
          // @ts-ignore
          .paginate(limit, page, true)
          .catch((e: any) => res.status(404).json(e.datail));
        const result = {
          imgs,
          tags,
        };
        res.json(result);
      })
      .catch((e) => res.status(400).json(e));
  }
});

export default router;
