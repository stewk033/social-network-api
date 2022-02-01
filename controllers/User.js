const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  getUsers: async (req, res) => {
    let users = await User.find()
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v');
    res.json(users);
  },
  getUserByID: async (req, res) => {
    let user = await User.findById({ _id: req.params.id });
    user ? res.json(user) : res.json({ msg: 'no user with that id' });
  },
  createUser: async (req, res) => {
    let user = await User.create(req.body);
    res.json(user);
  },
  updateUser: async (req, res) => {
    let user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
    user ? res.json(user) : res.json({ msg: 'no user with that id' });
  },
  //? Add ability to delete associated thoughts
  deleteUser: async (req, res) => {
    let user = await User.findById(req.params.id);
    let thoughtArray = user.thoughts;
    thoughtArray.forEach(async thoughtId => await Thought.findByIdAndDelete(thoughtId));
    await user.delete();
    res.json({ msg: `The user with username ${user.username} and associated thoughts have been deleted...` });
  },
  deleteAllUsers: async (req, res) => {
    let users = await User.deleteMany({});
    res.json({ msg: 'Users collection has been cleared' });
  },
};