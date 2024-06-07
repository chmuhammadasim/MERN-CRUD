const itemController ={};
const Users = require('../models/user.model.js');
const Item = require('../models/item.model.js');


itemController.getItems = async (req, res) => {
  console.log("Started getting items...");
  try {
    const items = await Item.find({ userId: req.userData.data._id });
    if (items.length === 0) { 
      console.log("No items found");
      return res.status(200).send({
        code: 200,
        message: 'No items found',
        data: []
      });
    }
    console.log("Items retrieved successfully");
    return res.status(200).send({
      code: 200,
      message: 'Successful',
      data: items
    });
  } catch (error) {
    console.log("Error while getting items");
    console.log('error', error);
    return res.status(500).send({
      code: 500,
      message: 'Error while getting items',
      error: error.message
    });
  }
};
  itemController.saveItems = async(req,res)=>{
    console.log("Started saving items...");
      try {
        const newItem = new Item({ ...req.body, userId: req.userData.data._id});
        await newItem.save();
        console.log("Done saving items...");
        return res.status(200).send({
          code: 200,
          message: 'Successful',
          data: newItem
        });
        
      } catch (error) {
        console.log("Error while saving items");
        console.log('error', error);
        return res.status(500).send(error);
      }
    }

    itemController.updateItems = async(req,res)=>{
      console.log("Started Updating items...");
        try {
          const updatedItem = await Item.findByIdAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true }
          );
          return res.status(200).send({
            code: 200,
            message: 'Successful',
            data: updatedItem
          });
        } catch (error) {
          console.log("Error while updating items");
          console.log('error', error);
          return res.status(500).send(error);
        }
      }
      itemController.deleteItems = async(req,res)=>{
        console.log("Started Deleting items...");
          try {
            await Item.findByIdAndDelete({ _id: req.params.id, userId: req.userId });
            return res.status(200).send({
              code: 200,
              message: 'Successful',
            });
          } catch (error) {
            console.log("Error while deleting items");
            console.log('error', error);
            return res.status(500).send(error);
          }
        }

  module.exports = itemController;