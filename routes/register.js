const { body, validationResult } = require('express-validator');
const User = require('../services/user');
const {Router} = require('express');
const asyncHandler =require('express-async-handler');
const crypto = require('crypto');
const Email = require('../services/email');
const router =new Router();

router.get('/',function (req,res)
{
    res.render('register');
});

router.post('/',[
    body('email')
        .isEmail()
        .normalizeEmail()
        .custom(async function (email){
            const found = await User.findByEmail(email);
            if(found){
                throw Error('User exists');
            }
            return true;
        }),
    body('displayName')
        .trim()
        .notEmpty(),
    body('password')
        .isLength({min: 6 }),
], asyncHandler(async function (req,res){
    // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  //console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(422).render('register',{errors: errors.array()});
  }
  const user = await User.create({
    email: req.body.email,
    displayName: req.body.displayName,
    password: User.hashPassword(req.body.password),
    token: crypto.randomBytes(3).toString('hex').toUpperCase(),
  });
  await Email.send(user.email, 'Mã kích hoạt tài khoản', `${process.env.BASE_URL}/login/${user.id}/${user.token}`);
  res.redirect('/');
}));

module.exports = router;