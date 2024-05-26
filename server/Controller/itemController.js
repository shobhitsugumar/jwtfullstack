const Item = require("../model/Itemmodel");

exports.getItem = async (req, res) => {
  const items = await Item.find().sort({ data: -1 });

  if (!items) {
    return res.status(400).json({ message: "there is no items" });
  }
  res.status(200).json(items);
};

exports.addItems = async (req, res) => {
  try {
    const newitems = await Item.create(req.body);

    res.status(201).json(newitems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error in adding items" });
  }
};

exports.updateItems = async (req, res) => {
  try {
    const updateitems = await Item.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updateitems) {
      return res.status(400).json({ message: "Item is not found" });
    }

    res.json(updateitems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error " });
  }
};

exports.deleteitmes = async (req, res) => {
  try {
    const deletitems = await Item.findByIdAndDelete({ _id: req.params.id });
    if (!deletitems) {
      return res.status(400).json({
        message: "No Items to Delete",
      });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal error" });
  }
};
