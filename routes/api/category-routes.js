const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
//turning this into an async function
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  //enclosing the get in a try catch since the findAll might throw an error
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryItem = await Category.findByPk(req.params.id);
    if(!categoryItem){
      res.status(404).json({ message: 'No such category exists..'});
      return;
    }
    res.status(200).json(categoryItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
