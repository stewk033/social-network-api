const router = require('express').Router();

const { getUsers, getUserByID, createUser, updateUser, deleteUser, deleteAllUsers } = require('../../controllers/User');
const { createFriendship, cancelFriendship } = require('../../controllers/Friend');

router.route('/').get(getUsers).post(createUser).delete(deleteAllUsers);
router.route('/:id').get(getUserByID).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(createFriendship).delete(cancelFriendship);

module.exports = router;