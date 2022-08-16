const pool = require("./db");

const getAllReviewsSQL = `
  SELECT 
    reviews.id, 
    reviews.stars, 
    reviews.variety, 
    countries.country, 
    packaging_styles.packaging_style, 
    brands.brand
  FROM
    reviews
  JOIN
    countries
  ON
    reviews.country_id = countries.id
  JOIN
    packaging_styles
  ON
    reviews.packaging_style_id = packaging_styles.id
  JOIN
    brands
  ON
    reviews.brand_id = brands.id;
`;

const getPagedReviewsSQL = `
  SELECT
    reviews.id,
    reviews.stars,
    reviews.variety,
    reviews.url,
    countries.country,
    packaging_styles.packaging_style,
    brands.brand
  FROM
    reviews
  JOIN
    countries
  ON
    reviews.country_id = countries.id
  JOIN
    packaging_styles
  ON
    reviews.packaging_style_id = packaging_styles.id
  JOIN
    brands
  ON
    reviews.brand_id = brands.id
  LIMIT $1
  OFFSET $2
`;

const ramenReviews = {
  getAllReviews: async () => {
    try {
      const { rows } = await pool.query(getAllReviewsSQL);
      return rows;
    } catch (e) {
      console.error(`Database query failed: ${e.message}`);
      throw Error(`Database query failed: ${e.message}`);
    }
  },
  getPagedReviews: async (limit, page) => {
    try {
      if (page <= 0 || !page) {
        throw new Error("page number must greater than 0");
      }

      const offset = limit * (page - 1);

      const { rows } = await pool.query(getPagedReviewsSQL, [limit, offset]);
      return rows;
    } catch (e) {
      console.error(`Database query failed: ${e.message}`);
      throw Error(`Database query failed: ${e.message}`);
    }
  },
};

module.exports = ramenReviews;
