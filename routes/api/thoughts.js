const router = require('express').Router();

const { getAllThoughts, addThought, updateThought, removeThought, deleteAllThoughts } = require('../../controllers/Thought');
const { addReaction, removeReaction } = require('../../controllers/Reaction');

router.route('/').get(getAllThoughts).post(addThought).delete(deleteAllThoughts);
router.route('/:id').put(updateThought).delete(removeThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;