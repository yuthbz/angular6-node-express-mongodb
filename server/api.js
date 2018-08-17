const express = require('express');
const router = express.Router();

const User = require('./models/users');

router.get('/gets', (req, res) => {

  User.find(function (err, users) {
    if (err) return console.error(err);

    res.json({
      result: 'ok',
      message: users
    });

  });

});

router.get('/edits/:id', (req, res) => {

  User.findById(req.params.id, (err, users) => {
    if (err) return console.error(err);

    res.json({
      result: 'ok',
      message: users
    });

  });

});

router.post('/adds', (req, res) => {

  const data = req.body;

  const newUser = new User({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
    address: {
      street: data.address.street,
      city: data.address.city,
      province: data.address.province,
      postcode: data.address.postcode,
      country: data.address.country
    }
  });
  console.log(newUser);
  newUser.save(function (err, result) {
    if (err) console.log('Error on save!')

    res.json({
      result: 'ok',
      message: 'Inserted.'
    });

  });

})



router.delete('/deletes/:id', (req, res) => {

  const data = req.params;
  User.deleteOne({
    _id: data.id
  }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document

    res.json({
      result: 'ok',
      message: 'Deleted.'
    });


  });


});


module.exports = router;
