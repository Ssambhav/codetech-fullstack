import cron from "node-cron";
import Right from "../models/rightsModel.js";
import StateLaw from "../models/stateLawModel.js";
import { refreshRightByCategory } from "../controllers/rightsController.js";
import { refreshStateLaw } from "../controllers/stateLawController.js";

const dummyRes = {
  status: () => ({ json: () => {} }),
};

cron.schedule("0 0 * * 0", async () => {
  console.log("🔁 Weekly auto-refresh started...");

  try {
    const rights = await Right.find({});
    for (const right of rights) {
      await refreshRightByCategory(
        { params: { category: right.category } },
        dummyRes
      );
    }

    const states = await StateLaw.find({});
    for (const state of states) {
      await refreshStateLaw({ params: { state: state.state } }, dummyRes);
    }

    console.log("✅ Weekly auto-refresh completed.");
  } catch (err) {
    console.error("❌ Auto-refresh failed:", err.message);
  }
});
