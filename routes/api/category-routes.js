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
    const categoryItem = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    
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
  try { //using the create method to post a new category
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    //because update methods return an array, our if statement check if there was no
    //categoryData at index 0. If so, it means nothing updated and will throw an error
    if(!categoryData[0]) {
      res.status(404).json({ message: 'No such category with this ID'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destory({
      where: {
        id: req.params.id,
      },
    });
    //using an if statement to throw an error if no category id was found to be deleted
    if(!deletedCategory) {
      res.status(404).json({ message: 'No category with this id'});
      return;
    }
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
