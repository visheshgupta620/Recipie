const express = require('express');
const router = express.Router();
const Dish = require('../models/dishes');
const Review = require('../models/review');
const { checkValid, isloggedin, iscreator } = require('../middlewares');

router.get('/', (req, res) => {
    res.render('./dishes/home')
})

router.get('/dishes', async (req, res) => {
    const dishes = await Dish.find({});
    res.render('./dishes/index', { dishes });
})

router.get('/dish/new',isloggedin, (req, res) => {
    res.render('./dishes/new')
})

router.post('/dishes', checkValid, async (req, res) => {
    try {
        const { name, image, type, time, diet, steps } = req.body;
        await Dish.create({ name, image, type, time, diet, steps, author:req.user._id });

        req.flash('info','Dish Added Successfully')

        res.redirect('/dishes');
    }
    catch (e) {
        res.render('error',{err:e.message})
    }
})

router.get('/dish/:id', async (req, res) => {
    const { id } = req.params;
    const item = await Dish.findById(id).populate('reviews');
    const newarray = item.steps.split('\n');                 //jaise hi new line me jaye uss hisaab se seperate kr diya
    // console.log(newarray);
    res.render('./dishes/dishinfo', { item , stepsinvolved:newarray});
})

router.delete('/dishes/:id',isloggedin,iscreator, async (req, res) => {
    const { id } = req.params;
    await Dish.findByIdAndDelete(id);

    req.flash('info','Dish deleted Successfully')

    res.redirect('/dishes');
})

router.get('/dishes/:id/edit',isloggedin,iscreator, async (req, res) => {
    const { id } = req.params;
    const item = await Dish.findById(id);
    res.render('./dishes/editpage', { item })
})

router.patch('/dishes/:id',checkValid, async (req, res) => {
    try{
    const { id } = req.params;
    const { name, image, type, time, diet, steps } = req.body;
    await Dish.findByIdAndUpdate(id, { name, image, type, time, diet, steps });

    req.flash('info','Info edited Successfully')

    res.redirect(`/dish/${id}`)
    }
    catch(e){
        res.render('error',{err:e.message})
    }
})

module.exports = router;