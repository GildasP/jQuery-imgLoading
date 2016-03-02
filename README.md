# jQuery-imgLoading

A simple lighweight plugin to get image loading events (start, progress, end).

## Simple use

Simply trigger action when all images in container are loaded :

```javascript
$('#container img').imgLoading(function(){
	// action !
    alert('loaded !'');
});
```

## Advanced use

You can easily bind the loading start, progress and end events if you need to :

```javascript
$('#container').imgLoading({ 
	start: function(e, data){
		// start action        
	},
	progress: function(e, data){
		// progress
	},
	end: function(e, data){
		// end
	}
});
```

## Events details

Every event comes with :

* data.loaded - the currently loaded images count
* data.total - total images count

Now you can do whatever you want during loading, say displaying the loadign status 
:
```javascript
$('#container').imgLoading({ 
	progress: function(e, data){
		// display progress
        $('#container .loader').html('Now loading : '+data.loaded+'/'+data.total);
	},
	end: function(e, data){
		// ended ! hide the progress display
        $('#container .loader').remove();
	}
});
```

You may display a progress bar using the percentage of loaded images, etc.
