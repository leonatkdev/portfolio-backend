

const express = require("express")
const router  = express.Router()


/**
 * @swagger
 * /sections:
 *   get:
 *     summary: Get details for all sections
 *     responses:
 *       '200':
 *         description: Successful response
 */

router.get('/sections', (req, res) => {
    res.send(`Details for sections`);
  }
)

/**
 * @swagger
 * /sections/{userId}:
 *   get:
 *     summary: Get details for a specific section
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 */

router.get('/sections/:userId', (req, res) => {
    const userId = req.params.userId;
    res.send(`Details for sections ${userId}`);
  }
)


module.exports = router;