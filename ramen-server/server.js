const express = require("express");
const cors = require("cors");
const reviewsRepo = require("./repos/ramenReviews");

const PORT = 5001;

const server = express();

server.use(cors());
server.use(express.json());

server.get("/api/reviews", async (req, res) => {
  try {
    const { limit, page } = req.query;

    const safeLimit = Boolean(limit) ? parseInt(limit) : 10;
    const safePage = Boolean(parseInt(page)) ? parseInt(page) : 1;

    const allReviews = await reviewsRepo.getAllReviews();
    const reviews = await reviewsRepo.getPagedReviews(safeLimit, safePage);

    const pageResult = {
      reviews,
      currentPage: safePage,
      itemsPerPage: safeLimit,
      totalItems: allReviews.length,
      totalPages: Math.ceil(allReviews.length / safeLimit),
    };

    return res.json(pageResult);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message || e });
  }
});

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

module.exports = server;

