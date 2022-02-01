const User = require('../models/User');

module.exports = {
  createFriendship: async (req, res) => {
    let person1 = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $push: { friends: req.params.friendId },
      },
      { new: true }
    );
    let person2 = await User.findByIdAndUpdate(
      req.params.friendId,
      {
        $push: { friends: req.params.userId },
      },
      { new: true }
    );
    res.json([person1, person2]);
  },
  cancelFriendship: async (req, res) => {
    let person1 = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $pull: { friends: req.params.friendId },
      },
      { new: true }
    );
    let person2 = await User.findByIdAndUpdate(
      req.params.friendId,
      {
        $pull: { friends: req.params.userId },
      },
      { new: true }
    );
    res.json([person1, person2]);
  },
};