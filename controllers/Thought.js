const { User, Thought } = require('../models');

module.exports = {
  getAllThoughts: async (req, res) => {
    let thoughts = await Thought.find();
    res.json(thoughts);
  },
  addThought: async (req, res) => {
    //? Guarding for request without a user associated with Id
    let user = await User.findByIdAndUpdate(req.body.userId);
    if (!user) {
      res.status(400).json({ msg: 'no user by that id' });
    } else {
      let thought = await Thought.create(req.body);
      user = await User.findByIdAndUpdate({ _id: req.body.userId }, { $push: { thoughts: thought._id } }, { new: true });
      user = await User.findById({ _id: req.body.userId })
        .populate({
          path: 'thoughts',
          select: '-__v',
        })
        .select('-__v');
      res.json(user);
    }
  },
  updateThought: async (req, res) => {
    let thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!thought) res.status(400).json({ msg: 'There was not a thought associated with that id.' });
    res.json(thought);
  },
  removeThought: async (req, res) => {
    let thought = await Thought.findById(req.params.id);
    let user = await User.findOneAndUpdate({ username: thought.username }, { $pull: { thoughts: thought._id } });
    thought.delete();
    res.json({ msg: 'Thought has been deleted' });
  },
  deleteAllThoughts: async (req, res) => {
    await Thought.deleteMany();
    res.json({ msg: 'Thought collection has been cleared' });
  },
};