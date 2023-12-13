const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/recipies')
    .then(() => {
        console.log('DB connected !');
    })
    .catch((err)=>{
        console.log(err);
    })

const Dish = require('./models/dishes');
const Review = require('./models/review');

const dummy_data = [
    {
        name:'Pizza',
        image:'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        type:'Italian',
        time:10,
        diet:'veg',
        steps:'Step 1: Prepare. I used to buy raw dough in bags that my supermarket sold in the deli section.\n Step 2: Make the Dough.\n Step 3: Prep.\n Step 4: Let the Dough Sit for a Bit.\n Step 5: Stretch - Dont Toss.\n Step 6: Top It Off.\n Step 7: Bake It.Step 8: Eat It.'
    },
    {
        name:'Pasta',
        image:'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhc3RhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        type:'Italian',
        time:8,
        diet:'veg',
        steps:'Step 1: Ingredients. Fresh Pasta Dough.\n Step 2: Weigh the Flour. Set your scale to grams.\n Step 3: Beat the Eggs. Crack two eggs into a medium bowl.\n Step 4: Form a Well.\n Step 5: Add Eggs and Fold.\n Step 6: Break Up Large Clumps.\n Step 7: Make a Ball of Dough.\n Step 8: Knead and Rest the Dough'
    },
    {
        name:'Grilled Sandwich',
        image:'https://images.unsplash.com/photo-1475090169767-40ed8d18f67d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JpbGxlZCUyMHNhbmR3aWNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        type:'French',
        time:5,
        diet:'veg',
        steps:'Step 1: Turn on Stove. Turn the stove on underneath the pan.\n Step 2: Add Butter. Add butter to the stove.\n Step 3: Add One Slice of Bread.\n Step 4: Press the Bread.\n Step 5: Flip the Bread.\n Step 6: Take the Bread Off the Pan.\n Step 7: Repeat All Prior Steps.\n Step 8: Add Cheese.'
    },
    {
        name:'Malai Chaap',
        image:'https://media.istockphoto.com/id/1488396003/photo/vegetarian-soya-malai-chaap.webp?b=1&s=170667a&w=0&k=20&c=Mhi7iWgjGy8mYwBYtXHMg9MoCd5e-BGNyqhUJ2yJMso=',
        type:'Indian',
        time:15,
        diet:'veg',
        steps:'Step 1: Prepare the marinade.\n Step 2: Place the marinated chaaps in refrigerator.\n Step 3: Pan fry the chaap.\n Step 4: Saute the Chaaps.\n Step 5: Serve'
    },
    {
        name:'Paneer Tikka',
        image:'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFuZWVyJTIwdGlra2F8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        type:'North Indian',
        time:15,
        diet:'veg',
        steps:'Step 1: Cut thick paneer slices.\n Step 2: Prepare the marinade.\n Step 3: Marinate the veggies along with paneer.\n Step 4: Garnish and serve with chutneys'
    },
    {
        name:'Chicken Wings',
        image:'https://images.unsplash.com/photo-1585703900468-13c7a978ad86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hpY2tlbiUyMHdpbmdzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        type:'American',
        time:30,
        diet:'nonveg',
        steps:'Adjust your oven rack to the upper-middle position.\n Preheat oven to 425 degrees F.\n The total cook time will depend on the size of the wings but may take up to 1 hour.\n Remove from oven and let stand for 5 minutes.\n Transfer wings to bowl and toss with sauce.'
    }
]

async function addData(data){
    await Dish.deleteMany({});
    await Review.deleteMany({});
    await Dish.create(data);
    console.log('Data seeded');
}

addData(dummy_data);