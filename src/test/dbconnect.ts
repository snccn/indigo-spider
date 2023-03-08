import { Knex } from "knex";
import database from "../utils/database";
import env from "../utils/env";
var $ = env;


async function check(db: Knex) {
  const res = await db.raw("select @@version");
  $.log.debug(res[0]);
  $.log.info("数据库链接成功");
  db.client.destroy();
}

(async () => {
  var d = new database(
    "mysql://192.168.199.222:3306/irp?user=pi&password=4dmin029"
  );
  check(d.KnexInstence);
})()

