// ============================================================
//  Reviews router — action: review, review-stats, reviews,
//  reviews-list, review-moderate
//  Row shape: Timestamp, Name, Rating, Review, Status
// ============================================================

function routeReviews(action, p, body) {
  switch (action) {
    case "review":
      getSheet("Reviews").appendRow([new Date(), body.name, body.rating, body.review, "pending"]);
      return { success: true };

    case "review-stats": {
      const rows     = getSheet("Reviews").getDataRange().getValues().slice(1);
      const approved = rows.filter(r => r[4] === "approved");
      const count    = approved.length;
      const average  = count === 0 ? 0
        : Math.round(approved.reduce((sum, r) => sum + Number(r[2]), 0) / count * 10) / 10;
      return { count, average };
    }

    case "reviews": {
      const rows    = getSheet("Reviews").getDataRange().getValues().slice(1);
      const reviews = rows
        .filter(r => r[4] === "approved" && r[1] && r[3])
        .map(r => ({
          name:   r[1],
          rating: Number(r[2]),
          review: r[3],
          date:   r[0] ? Utilities.formatDate(new Date(r[0]), "Asia/Kuala_Lumpur", "dd MMM yyyy") : "",
        }));
      return { reviews };
    }

    // Moderation: full list including the sheet row number, so review-moderate can target it.
    case "reviews-list": {
      const rows    = getSheet("Reviews").getDataRange().getValues().slice(1);
      const reviews = rows.map((r, i) => ({
        row:    i + 2, // +2: 1-indexed rows, +1 to skip header
        date:   r[0] ? Utilities.formatDate(new Date(r[0]), "Asia/Kuala_Lumpur", "dd MMM yyyy") : "",
        name:   r[1],
        rating: Number(r[2]),
        review: r[3],
        status: r[4],
      })).reverse();
      return { reviews };
    }

    case "review-moderate": {
      const row    = Number(body.row);
      const status = body.status;
      if (!row || (status !== "approved" && status !== "rejected" && status !== "pending")) {
        return { error: "Invalid row or status." };
      }
      getSheet("Reviews").getRange(row, 5).setValue(status);
      return { success: true };
    }

    default:
      return null;
  }
}
