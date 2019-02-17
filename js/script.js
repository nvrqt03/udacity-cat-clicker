/* ======= Model ======= */

var model = {
    currentCat: null,
    catAdminView: false,
    cats: [
      {
        clickCount: 0,
        name: 'Sammy',
        imgSrc: 'images/cute kitty.jpg',
        //imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
      },
      {
        clickCount: 0,
        name: 'Fuzzy',
        imgSrc: 'images/cute kitty 2.jpg',
        //imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
      },
      {
        clickCount: 0,
        name: 'Kitty',
        imgSrc: 'images/cute kitty 3.jpg',
        //imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
      },
      {
        clickCount: 0,
        name: 'Sox',
        imgSrc: 'images/cute kitty 4.jpg',
        //imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
      },
      {
        clickCount: 0,
        name: 'Munchy',
        imgSrc: 'images/cute kitty 5.jpg',
        //imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
      }
    ]
  };
  
  
  /* ======= Octopus ======= */
  
  var octopus = {
  
    init: function () {
      // set our current cat to the first one in the list
      model.currentCat = model.cats[0];
  
      // tell our views to initialize
      catListView.init();
      catView.init();
      adminView.init();
      adminView.hide();
    },
  
    getCurrentCat: function () {
      return model.currentCat;
    },
  
    getCats: function () {
      return model.cats;
    },
  
    // set the currently-selected cat to the object passed in
    setCurrentCat: function (cat) {
      model.currentCat = cat;
    },
  
    // increments the counter for the currently-selected cat
    incrementCounter: function () {
      model.currentCat.clickCount++;
      catView.render();
    },
  
    adminToggle: function () {
      if (model.catAdminView === false) {
        model.catAdminView = true;
        adminView.show();
        
      } 
      else if (model.catAdminView === true) {
        model.catAdminView = false;
        adminView.hide();
      }
  
    },
  
    adminSave: function() {
      var currentCat = octopus.getCurrentCat();
      currentCat.name = adminView.adminCatName.value;
      currentCat.clickCount = adminView.adminCatCount.value;
      currentCat.imgSrc = adminView.adminCatImg.value;
      //catListView.init();
      catView.init();
      adminView.hide();
    },
  
    adminCancel: function() {
      model.catAdminView = false;
      adminView.hide();
    }
  };
  
  
  /* ======= View ======= */
  
  var catView = {
  
    init: function () {
      // store pointers to our DOM elements for easy access later
      this.catElem = document.getElementById('cat');
      this.catNameElem = document.getElementById('cat-name');
      this.catImageElem = document.getElementById('cat-img');
      this.countElem = document.getElementById('cat-count');
      this.catImageElem.style.borderRadius = '8%';
      this.catImageElem.style.width = '450px';
      this.catImageElem.style.height = '400px';
      this.catImageElem.style.cursor = 'pointer';
      this.catImageElem.style.boxShadow = '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)';
  
  
  
      // on click, increment the current cat's counter
      this.catImageElem.addEventListener('click', function () {
        octopus.incrementCounter();
      });
  
      // render this view (update the DOM elements with the right values)
      this.render();
    },
  
    render: function () {
      // update the DOM elements with values from the current cat
      var currentCat = octopus.getCurrentCat();
      this.countElem.textContent = currentCat.clickCount;
      this.catNameElem.textContent = currentCat.name;
      this.catImageElem.src = currentCat.imgSrc;
    }
  };
  
  var catListView = {
  
    init: function () {
      // store the DOM element for easy access later
      this.catListElem = document.getElementById('cat-list');
  
      this.render();
    },
  
    render: function () {
      var cat, elem, i;
      // get the cats we'll be rendering from the octopus
      var cats = octopus.getCats();
  
      // empty the cat list
      this.catListElem.innerHTML = '';
  
      // loop over the cats
      for (i = 0; i < cats.length; i++) {
        // this is the cat we're currently looping over
        cat = cats[i];
  
        // make a new cat list item and set its text. also playing with styling dom elements with js
        elem = document.createElement('button');
        elem.textContent = cat.name;
        elem.style.margin = '3px';
        elem.style.border = '1px solid green';
        elem.style.borderRadius = '10%';
        elem.style.backgroundColor = 'green';
        elem.style.color = 'white';
        elem.style.fontSize = '16px';
        elem.style.padding = '10px';
        elem.style.cursor = 'pointer';
        elem.style.boxShadow = '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)';
  
        // on click, setCurrentCat and render the catView
        // (this uses our closure-in-a-loop trick to connect the value
        //  of the cat variable to the click event function)
        elem.addEventListener('click', (function (catCopy) {
          return function () {
            octopus.setCurrentCat(catCopy);
            catView.render();
            adminView.render();
          };
        })(cat));
  
        // finally, add the element to the list
        this.catListElem.appendChild(elem);
      }
    }
  };
  
  /*-----admin view-----*/
  var adminView = {
    init: function () {
      this.adminItems = document.getElementById('admin-items');
      this.adminButton = document.getElementById('admin-button');
      this.adminSave = document.getElementById('admin-save');
      this.cancel = document.getElementById('cancel');
  
      this.adminCatName = document.getElementById('admincat-name');
      this.adminCatImg = document.getElementById('admincat-img');
      this.adminCatCount = document.getElementById('admincat-count');
         
      this.adminButton.addEventListener('click', function () {
        octopus.adminToggle();
      });
  
      this.adminSave.addEventListener('click', function() {
        octopus.adminSave();
      });
  
      this.cancel.addEventListener('click', function() {
        octopus.adminCancel();
      });
  
  
      this.render();
    },
  
    render: function () {
      var currentCat = octopus.getCurrentCat();
      this.adminCatCount.value = currentCat.clickCount;
      this.adminCatName.value = currentCat.name;
      this.adminCatImg.value = currentCat.imgSrc;
    },
  
    show: function () {
      this.adminItems.style.display = 'block'; //show admin box
    },
  
    hide: function () {
      this.adminItems.style.display = 'none'; //hide admin box
    }
  }
  
  // make it go!
  octopus.init();