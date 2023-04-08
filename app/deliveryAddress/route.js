const deliveryAddressController = require("./controller");
const { police_check } = require("../../middlewares/index");

const router = require("express").Router();

router.get(
  "./delivery-addresses",
  police_check("view", "DeliverAddress"),
  deliveryAddressController.store
);
router.post(
  "./delivery-addresses",
  police_check("create", "DeliverAddress"),
  deliveryAddressController.store
);
router.put(
  "./delivery-addresses/:id",
  police_check("update", "DeliverAddress"),
  deliveryAddressController.store
);
router.delete(
  "./delivery-addresses/:id",
  police_check("delete", "DeliverAddress"),
  deliveryAddressController.store
);

module.exports = router;
