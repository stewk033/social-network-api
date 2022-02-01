const Thought = require('../models/Thought');

module.exports = {
  addReaction: async (req, res) => {
    let thought = await Thought.findById(req.params.thoughtId);
    if (!thought) res.status(400).json({ msg: 'no thought associated with that id!' });
    else {
      await thought.reactions.push(req.body);
      await thought.save();
      res.json(thought);
    }
  },
  removeReaction: async (req, res) => {
    let thought = await Thought.findById(req.params.thoughtId);
    if (!thought) res.status(400).json({ msg: 'no thought associated with that id!' });
    else {
      thought.reactions.pull(req.params.reactionId);
      await thought.save();
      res.json(thought);
    }
  },
};