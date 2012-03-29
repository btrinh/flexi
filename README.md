Flexi - A fluid slider carousel with jQuery
===========================================

Example Usage
-------------
To use Flexi, you will need to include the jQuery library and the Flexi source file on your page:

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
<script src="/path/to/jquery.flexi.js"></script>
```html

The following is the expected HTML structure:

```html
<parent> <----------------------| Parent Element
  <child> <--- Child Element ---|
  <child>
  <child>
</parent>
```html

An example of this could be:

```html
<div id="mycarousel">
  <img src="/path/to/image" />
  <img src="/path/to/image" />
  <img src="/path/to/image" />
  <img src="/path/to/image" />
</div>
```html

After the required HTML markup has been setup, you must also setup Flexi. Example of a default Flexi setup:

```html
<script type="text/javascript">
  $(function(){
    $('#mycarousel').flexi();
  });
</script>
```html

Flexi does not require any CSS to work. You may include your own CSS styles to customize the Flexi carousel.

The following is the CSS used in the demo:

```css
.flexi-wrapper {
  padding: 10px;
  background: #EEEEEE;
  border-radius: 5px;
  box-shadow: 0 0 7px #A0A0A0;
}
```css