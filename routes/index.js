const { Router } = require("express");
const router = Router();
const controllers = require("../controllers/index.js");

router.post("/createbucketlist", controllers.createBucketList);
router.get("/getallbuckets", controllers.getAllBuckets);
router.get("/getbucket/:id", controllers.getBucketById);
router.put("/updatebucket/:id", controllers.updateBucket);
router.delete("/deletebucket/:id", controllers.deleteBucket);

router.post("/createdestination", controllers.createDestination);
router.get("/getalldestinations", controllers.getAllDestinations);
router.get(
  "/getalldestinations/:bucketid",
  controllers.getAllDestinationsByBucketId
);
router.get("/getdestination/:id", controllers.updateBucket);
router.delete("/deletedestination/:id", controllers.deleteDestinationById);

router.post("/createuser", controllers.createUser);

router.get("/getuser/:id", controllers.getUserById);
router.get("/updateuser/:id", controllers.updateUserById);
router.delete("/deleteuser/:id", controllers.deleteUserById);

module.exports = router;
